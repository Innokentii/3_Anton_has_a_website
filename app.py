from flask import Flask, render_template, request, jsonify, Response
import sqlite3 as SQL
import openpyxl
import datetime
import os.path

# Функция запуска сайта
app = Flask(__name__)
def create_app():
    return app

#===============================================================#
#                    Глобальные переменные                      #
#VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV#

DB_PATH = "database/SQLite3_base.db" # (путь до бызы данных) => [УЧИТОВАТЬ ПУТЬ В ХОСТИНГЕ ПРИ ЗАГРУЗКЕ];
PATH_PR = 'static/services/products.xlsx' # (путь к файлу EXCELL "products.xlsx");
PATH_SER = 'static/services/services.xlsx' # (путь к файлу EXCELL "services.xlsx");
PATH_ORD = 'orders'
connect = SQL.connect(DB_PATH) # (подключение бызы данных);
cursor = connect.cursor() # (подключение навигации по бызе данных);
array_products = dict() # (список продуктов);
array_basket = list() # (список продуктов в корзине);

#===============================================================#
#                Работа_с_базой_данных_SQLite3                  #
#VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV#

# создание БД для 4_registration
cursor.execute("""CREATE TABLE IF NOT EXISTS users(
                password text,
                login text,
                name text,
                phone text,
                mail text
                );""")
connect.commit()
connect.close

#===============================================================#
#                 Работа со страницами сайта                    #
#VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV#

# Рендер тела сайта (запуск сайта);
@app.route('/')
@app.route('/body')
def body():
    render_template('0_body.html')
    return render_template('1_main.html')

# Рендер страницы "ГЛАВНАЯ_СТРАНИЦА";
@app.route('/main') 
def main():
    return render_template('1_main.html')

# Рендер страницы "СТРАНИЦА_УСЛУГИ";
@app.route('/services') 
def services():
    return render_template('2_services.html')

# Рендер подстраница "СТРАНИЦА_УСЛУГИ";
@app.route('/stations') 
def stations():
    return render_template('2_1_services.html')

# Рендер страницы "ТЕХНИЧЕСКАЯ_ИНФОРМАЦИЯ";
@app.route('/tech_info') 
def tech_info():
    return render_template('3_tech_info.html')

# Рендер страницы "КОРЗИНА";
@app.route('/basket') 
def basket():
    return render_template('4_basket.html')

# Рендер страницы "КОНТАКТЫ";
@app.route('/contacts') 
def contacts():
    return render_template('5_contacts.html')

#===============================================================#
#                     Работа с запросами                        #
#VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV#

# Запрос "GET" на "УСЛУГИ";
@app.route('/request_for_services', methods=['GET'])
def request_for_services():
    req = dict() # (список услуг);
    if request.method == 'GET':
        wb = openpyxl.load_workbook(PATH_SER) # (чтение файла EXCELL "services.xlsx");
        sheet = wb.active # (работа с файлом EXCELL "services.xlsx");
        num_i = 2 
        while True:
            num_i += 1
            if sheet[f'A{num_i}'].value == None:
                break
        for n in range(0, num_i-3):
            req[n] = [sheet[f'B{n+3}'].value, sheet[f'C{n+3}'].value, sheet[f'D{n+3}'].value]

    return jsonify(req)

# Запрос "POST" на "УСЛУГИ";
@app.route('/request_for_name_service', methods=['POST'])
def request_for_name_service():
    name_service = request.get_json(force=True)
    name_service = name_service['name_service']
    wb = openpyxl.load_workbook(PATH_PR) # (чтение файла EXCELL "products.xlsx");
    sheet = wb.active # (работа с файлом EXCELL "products.xlsx");
    global array_products
    array_products = dict()
    num_i = 3
    N = 0
    while True:
        num_i += 1
        n = num_i - 3
        if sheet[f'A{num_i}'].value == None:
            break
        elif sheet[f'B{num_i}'].value == name_service:
            array_products[N] = [sheet[f'C{n+3}'].value, sheet[f'D{n+3}'].value, sheet[f'E{n+3}'].value, sheet[f'F{n+3}'].value, sheet[f'G{n+3}'].value, sheet[f'H{n+3}'].value, sheet[f'I{n+3}'].value, sheet[f'J{n+3}'].value, sheet[f'K{n+3}'].value, sheet[f'L{n+3}'].value, sheet[f'B{n+3}'].value]
            N += 1
    
    return array_products

# Запрос "GET" на "Продукты";
@app.route('/request_for_products', methods=['GET'])
def request_for_products():
    global array_products
    return jsonify(array_products)

# Запрос "POST" запись товаров "КОРЗИНА";
@app.route('/request_basket', methods=['POST'])
def basket_f():
    global array_basket
    name_basket = request.get_json(force=True)
    name_basket = [name_basket['name_basket'], name_basket['price_basket'], name_basket['quantity_basket']]
    array_basket.append(name_basket) 
    return array_basket

# Запрос "GET" на список заказанных товаров;
@app.route('/request_list_of_orders', methods=['GET'])
def request_list_of_orders():
    global array_basket
    return jsonify(array_basket)

# POST запрос на регистрации заказа;
@app.route('/request_order_registration', methods=['POST'])
def order_registration_f():
    customer_order = request.get_json(force=True)
    customer_order = [customer_order['address'],
                      customer_order['contact_number'],
                      customer_order['Email'],
                      customer_order['wishes'],
                      customer_order['orders']
                      ]
    orders = list()
    for i in range(len(customer_order[4])):
        work_text = customer_order[4][i]
        orders.append(str(i) + ') ' + work_text[0] + '; ' + work_text[1] + '₽; ' + work_text[2] + '-штук;' + '\n')
    orders = ''.join(orders)
    
    day = datetime.date.today()
    time = datetime.datetime.now().time()
    num_count = 0
    while True:
        num_count += 1
        if os.path.isfile( f'{PATH_ORD}/order_({num_count}).txt') != True:
            with open(f'{PATH_ORD}/order_({num_count}).txt', 'w', encoding='utf-8') as filein:
                filein.write(f'ЗАКАЗ\n дата заказа: {day};\n время заказа: {time};\n адрес заказчика: {customer_order[0]};\n контактный номер заказчика: {customer_order[1]}\n электронная почта заказчика: {customer_order[2]};\n пожелания заказчика: {customer_order[3]};\n \n СПИСОК ЗАКАЗОВ:\n{orders}')
            break

    return customer_order