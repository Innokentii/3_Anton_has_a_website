'use strict' // Установка JS на строгий режим написания кода;

//===================================================================================================//
//                                  Импортированные файлы и модули                                   //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

//===================================================================================================//
//                                       Глобальные переменные                                       //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

let table_gen = document.getElementById('_4_table_id'); // (блок для генерации списка заказов);
let template = document.getElementById('_4_template_id'); // (шаблон для генерации таблицы заказов);
let temp_num = template.content.getElementById('table_num_id'); // (порядковое число генерируемого товара);
let tr_block = template.content.getElementById('tr_block_id'); // (строка генерируемого товара);
let temp_name = template.content.getElementById('table_name_id'); // (наименования генерируемого товара);
let temp_price = template.content.getElementById('table_price_id'); // (цена генерируемого товара);
let temp_quantity = template.content.getElementById('table_quantity_id'); // (количество генерируемого товара);
let temp_amount = template.content.getElementById('table_amount_id'); // (сумма цены генерируемого товара);
let temp_x = template.content.getElementById('table_x_id'); // (кнопка удаления генерируемого товара);
let amount = document.getElementById('amount_id'); // (блок общей суммы товаров);
let num_data = 0; // (число строк товаров товаров);
let del_all = document.getElementById('_4_del_all_id'); // (кнопка удаления всех товаров);
let order = document.getElementById('_4_order_id'); // (кнопка заказа);
let order_accepted = document.getElementById('order_accepted_id'); // (туман модального окна заказа);
let order_modal = document.getElementById('order_modal_id');  // (табличка модального окна заказа);
let X_close = document.getElementById('X_close_id'); // (кнопка закрытия модального окна заказа);
let address = ''; // (запись адреса);
let contact_number = ''; // (запись контактного номера);
let Email = ''; // (запись почты);
let wishes = ''; // (пожелания);
let orders = []; // (список товаров на регистрацию);
let amount_count = 0; // (общая стоимость);
let stiker = document.getElementById('_4_stiker_id'); // (стикер предупреждения);

//===================================================================================================//
//                                 Одноразовые функции и события                                     //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//


height_changes(); // Корректировка высоты;

order_accepted.style.display = 'none'; // Cкрытие тумана модального окна;

order_modal.style.display = 'none'; // Cкрытие таблички модального окна;

stiker.style.display = 'none'; // Cкрытие стикера предупреждения;

//===================================================================================================//
//                      Многоразовые функции и события вызовов функций                               //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

// Корректировка высоты;
document.addEventListener('resize', _=>{height_changes()});

// Генерирование списка товаров;
document.addEventListener('DOMContentLoaded', _=>{
    // Вызов списка заказов;
    let xhr = new XMLHttpRequest(); // XMLHttp метод для ajax "GET" запроса;
    xhr.open('GET', '/request_list_of_orders', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText); // (список заказов);
            num_data = Object.keys(data).length;
            for (let n=0; n<num_data; n++) {
                tr_block.id = `tr_x_${n}`;
                temp_num.innerText = n+1;
                temp_name.innerText = data[n][0];
                temp_name.id = `name_${n}`;
                temp_price.innerText = data[n][1] + ' ₽';
                temp_price.id = `price_${n}`;
                temp_quantity.innerText = data[n][2];
                temp_quantity.id = `quantity_${n}`;
                temp_amount.innerText = (Number(data[n][1])*Number(data[n][2])) + ' ₽';
                temp_x.id = `but_x_${n}`
                let template_clone = template.content.cloneNode(true);
                table_gen.append(template_clone);
                amount_count += (Number(data[n][1])*Number(data[n][2]));
            }
            amount.innerText = amount_count + ' ₽';
        }
    };
    xhr.send();
});

// Удаление строк из списка товаров;
document.addEventListener('click', (e)=>{
    for (let n=0; n<num_data; n++) {
        if (e.target.id == `but_x_${n}` || e.target.parentElement.id == `but_x_${n}`) {
            amount_count = 0;
            document.getElementById(`tr_x_${n}`).parentNode.removeChild(document.getElementById(`tr_x_${n}`));
            for (let i=0; i<num_data; i++) {
                try {
                    let price = Number((document.getElementById(`price_${i}`).innerText).split('').slice(0, -2).join(''));
                    let quantity = Number(document.getElementById(`quantity_${i}`).innerText)
                    amount_count += price*quantity;
                }
                catch {
                    console.log('список удален');
                }

            }
            amount.innerText = amount_count + ' ₽';
        }
    }
});

// Удаление всех товаров;
del_all.addEventListener('click', _=>{
    for (let n=0; n<num_data; n++) {
        document.getElementById(`tr_x_${n}`).parentNode.removeChild(document.getElementById(`tr_x_${n}`));
        amount.innerText = '0 ₽';
    }
});

// Заказ товаров;
order.addEventListener('click', _=>{
    let contact_number = document.getElementById('contact_number_id').value; // (запись контактного номера);
    if (contact_number != '' && stiker.style.display == 'none') {
        order_accepted.style.display = ''; // Показ тумана модального окна;
        order_modal.style.display = ''; // Показ таблички модального окна;
    
        let address = document.getElementById('address_id').value; // (запись адреса);

        let Email = document.getElementById('Email_id').value; // (запись почты);
        let wishes = document.getElementById('wishes_id').value; // (список заказов);
        for (let n=0; n<num_data; n++) {
            try {
                let name_products = document.getElementById(`name_${n}`).innerText;
                let price_products = (document.getElementById(`price_${n}`).innerText).split('').slice(0,-2).join('');
                let quantity_products = document.getElementById(`quantity_${n}`).innerText;
                orders.push([name_products, price_products, quantity_products]);
            }
            catch {
                console.log('список удален');
            }
        }
        
        // POST запрос на регистрации заказа;
        let xhr = new XMLHttpRequest(); // XMLHttp метод для ajax "POST" запроса;
        xhr.open('POST', '/request_order_registration', true); 
        xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded"); 
        xhr.send(JSON.stringify({ 'address': address, 'contact_number': contact_number, 'Email': Email, 'wishes': wishes, 'orders': orders }));
    
        // Удаление всех товаров;
        for (let n = 0; n < num_data; n++) {
            document.getElementById(`tr_x_${n}`).parentNode.removeChild(document.getElementById(`tr_x_${n}`));
            amount.innerText = '0 ₽';
        }
    }
    else {
        stiker.style.display = ''; // Cкрытие стикера предупреждения;
        setTimeout(_=>{
            stiker.style.filter = 'opacity(0%)';
        }, 600);
        // Скрытие стикера;
        setTimeout(_=>{
            stiker.style.display = 'none';
            stiker.style.filter = 'opacity(100%)';
        }, 1200);
    }
});

// Закрытие модального окна заказа;
X_close.addEventListener('click', _=>{
    order_accepted.style.display = 'none';
    order_modal.style.display = 'none';
});

//===================================================================================================//
//                             Функции вызываемые другими функциями                                  //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

function height_changes() {
    let win_height = window.innerHeight; // (высота рабочего окна сайта);
    let head_height = document.querySelector('._0_head_cl').clientHeight; // (высота головы сайта);
    let heigh_work = win_height - head_height - 175; // (рабочая высота);
    let select = document.querySelector('._4_basket_cl'); 
    select.style.height = `${heigh_work}px`; // (изменение высоты информационных блоков);
};

