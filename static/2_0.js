'use strict' // Установка JS на строгий режим написания кода;

//===================================================================================================//
//                                  Импортированные файлы и модули                                   //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

//===================================================================================================//
//                                       Глобальные переменные                                       //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

let _2_0_head_cl = document.querySelector('._2_0_head_cl');

let body = document.querySelector('._2_0_body_cl'); // (блок генерации продуктов);
let temp_product = document.getElementById('_2_1_temp_product_id'); // (блок template);
let img = temp_product.content.querySelector('._2_1_img_cl'); // (div иконка товаров);
let name_ = temp_product.content.querySelector('._2_1_name_cl'); // (div наименование товаров);
let price = temp_product.content.getElementById('_2_1_price_id'); // (div цена товаров);
let price_amount = temp_product.content.getElementById('_2_1_price_amount_id'); // (div сумма цены товаров);
let description = temp_product.content.getElementById('_2_1_description_id'); // (div описание товаров);
let quantity = temp_product.content.getElementById('_2_1_quantity_id'); // (div количество товаров);
let basket = temp_product.content.querySelector('._2_1_basket_cl'); // (div корзина товаров);
let minus_1 = temp_product.content.getElementById('minus_1_id'); // (div минус 1);
let plus_1 = temp_product.content.getElementById('plus_1_id'); // (div плюс 1);
let minus_10 = temp_product.content.getElementById('minus_10_id'); // (div минус 10);
let plus_10 = temp_product.content.getElementById('plus_10_id'); // (div плюс 10);
let objectLength = 0; // (количество продуктов);
let sticker_not_pr = document.querySelector('._2_1_sticker_not_pr_cl'); // (предупреждение об необходимости указания количества товара);
let product_description_fog = document.getElementById('product_description_fog_id'); // (туман модального окна описания товара);
let product_description_modal_window = document.getElementById('product_description_modal_window_id'); // (карта модального окна описания товара);
let close_x = document.getElementById('close_x_id'); // (кнопка закрытия модального окна описания товара);
let name_module = document.getElementById('name_module_id'); // (наименование товара в модальной карте);
let price_module = document.getElementById('price_module_id'); // (наименование товара в модальной карте);
let description_module = document.getElementById('description_module_id'); // (наименование товара в модальной карте);
let img_main = document.getElementById('img_main_id'); // (главная изображение модального окна);
let img_1 = document.getElementById('img_1_id'); // (главная изображение модального окна);
let img_2 = document.getElementById('img_2_id'); // (главная изображение модального окна);
let img_3 = document.getElementById('img_3_id'); // (главная изображение модального окна);
let src_1_list = []; // (список ссылок на изображение №1);
let src_2_list = []; // (список ссылок на изображение №2);
let src_3_list = []; // (список ссылок на изображение №3);
let description_cost_text = document.getElementById('description_cost_id');
let additionally_paid_text = document.getElementById('additionally_paid_id');
let detailed_description_text = document.getElementById('detailed_description_id');
let description_cost = []; // (список описания входящих в стоимость продукта);
let additionally_paid = []; // (список описания дополнительной оплаты);
let detailed_description = []; // (список описания входящих в стоимость продукта);

//===================================================================================================//
//                                 Одноразовые функции и события                                     //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

// Генерация продуктов;
document.addEventListener('DOMContentLoaded', _ => {
    // (запрос списка продуктов);
    let xhr = new XMLHttpRequest(); // XMLHttp метод для ajax "GET" запроса;
    xhr.open('GET', '/request_for_products', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText); // (список услуг);
            objectLength = Object.keys(data).length; // Получим количество ключей в объекте;
            for (let n=0; n<objectLength; n++) {
                img.style.backgroundImage = `url(${data[n][0]})`;
                img.id = `img_${n}`; // (div иконка товара);
                name_.innerText = data[n][1];
                price.innerText = data[n][2];
                description.innerText = data[n][3];
                description.id = `description_${n}`; // (div описание товара);
                name_.id = `name_${n}`; // (div наименование товара);
                price.id = `price_${n}`; // (div количество товара);
                quantity.id = `quantity_${n}`; // (div количество товара);
                basket.id = `basket_${n}`; // (div корзина товара);
                minus_1.id = `minus_1_${n}`;
                plus_1.id = `plus_1_${n}`;
                minus_10.id = `minus_10_${n}`;
                plus_10.id = `plus_10_${n}`;
                price_amount.id = `price_amount_${n}`;

                src_1_list.push(data[n][4]);
                src_2_list.push(data[n][5]);
                src_3_list.push(data[n][6]);
                description_cost.push(data[n][7]);
                additionally_paid.push(data[n][8]);
                detailed_description.push(data[n][9]);

                _2_0_head_cl.innerText = 'услуги "' + `${data[n][10]}` + '"';

                let template_clone = temp_product.content.cloneNode(true);
                body.append(template_clone);
            };
        }
    };
    xhr.send();
});

// Скрытие стикера в начале работы страницы;
sticker_not_pr.style.display = 'none';

// Скрытие тумана модального окна описания товара;
product_description_fog.style.display = 'none';

// Скрытие карты модального окна описания товара;
product_description_modal_window.style.display = 'none';

//===================================================================================================//
//                      Многоразовые функции и события вызовов функций                               //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

document.addEventListener('click', (e)=>{
    for (let n=0; n<objectLength; n++) {
        let work_quantity = document.getElementById(`quantity_${n}`); // (количество товаров);
        // убавление на единицу товара;
        if (e.target == document.getElementById(`minus_1_${n}`)) {
            if (Number(work_quantity.innerText - 1)<0) {
            work_quantity.innerText = 0;
            }
        else {
            work_quantity.innerText = (Number(work_quantity.innerText) - 1);
            }
        };
        // убавление на десятку товара;
        if (e.target == document.getElementById(`minus_10_${n}`)) {
            if (Number(work_quantity.innerText - 10) < 0) {
                work_quantity.innerText = 0;
            }
            else {
                work_quantity.innerText = (Number(work_quantity.innerText) - 10);
            }
        };
        // добавление на единицу товара;
        if (e.target == document.getElementById(`plus_1_${n}`)) {
            work_quantity.innerText = (Number(work_quantity.innerText) + 1);
            // Ограничение количество товаров до 1000;
            if (Number(work_quantity.innerText) > 1000) {work_quantity.innerText = 1000}
            };
        // добавление на десятку товара;
        if (e.target == document.getElementById(`plus_10_${n}`)) {
            work_quantity.innerText = (Number(work_quantity.innerText) + 10);
            // Ограничение количество товаров до 1000;
            if (Number(work_quantity.innerText) > 1000) {work_quantity.innerText = 1000}
            };
        // Суммирование стоимости товаров;
        if (Number(work_quantity.innerText) * Number(document.getElementById(`price_${n}`).innerText) != 0) {
            document.getElementById(`price_amount_${n}`).innerText = '/ ' + String(Number(work_quantity.innerText) * Number(document.getElementById(`price_${n}`).innerText)) + ' ₽';
        }
        else {
            document.getElementById(`price_amount_${n}`).innerText = '';
        };
    };
});

// Отправка в корзину товаров;
document.addEventListener('click', (e)=>{
    for (let n = 0; n < objectLength; n++) {
        if (e.target.id == `basket_${n}` || e.target.parentElement.id == `basket_${n}`) {
            let quantity_basket = document.getElementById(`quantity_${n}`).innerText;
            if (sticker_not_pr.style.display == 'none') {
                sticker_not_pr.style.display = '';
                setTimeout(_=>{
                    sticker_not_pr.style.filter = 'opacity(0%)';
                }, 600);
                // Скрытие стикера;
                setTimeout(_=>{
                    sticker_not_pr.style.display = 'none';
                    sticker_not_pr.style.filter = 'opacity(100%)';
                }, 1200);
            if (quantity_basket != '0') {
                sticker_not_pr.style.color = 'rgb(227, 171, 17)';
                sticker_not_pr.innerText = 'Товар добавлен в "КОРЗИНУ"';
                let name_basket = document.getElementById(`name_${n}`).innerText;
                let price_basket = document.getElementById(`price_${n}`).innerText;
                // Запрос "POST" запись товаров "КОРЗИНА";
                let xhr = new XMLHttpRequest(); // XMLHttp метод для ajax "POST" запроса;
                xhr.open('POST', '/request_basket', true);
                xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded"); 
                xhr.send(JSON.stringify({ 'name_basket': name_basket, 'price_basket': price_basket, 'quantity_basket': quantity_basket }));
            }
            else {
                sticker_not_pr.style.color = 'red';
                sticker_not_pr.innerText = 'Укажите количество товаров!';
                }
            }
        };
    };
});


// Модальное окно описание товара;
document.addEventListener('click', (e)=>{
    for (let n=0; n<objectLength; n++) {
        if (e.target.id == `description_${n}` || e.target.id == `img_${n}`) {
            product_description_fog.style.display = ''; // (Показ тумана модального окна описания товара);
            product_description_modal_window.style.display = ''; // (Показ карты модального окна описания товара);

            name_module.innerText = document.getElementById(`name_${n}`).innerText;
            price_module.innerText = document.getElementById(`price_${n}`).innerText + ' ₽';
            description_module.innerText = document.getElementById(`description_${n}`).innerText;
            img_main.src = src_1_list[n];
            img_1.src = src_1_list[n];
            img_2.src = src_2_list[n];
            img_3.src = src_3_list[n];
            description_cost_text.innerText = description_cost[n];
            additionally_paid_text.innerText = additionally_paid[n];
            detailed_description_text.innerText = detailed_description[n];
            break
        }
    }
});

// Выбор изображения в модальном окне;
img_1.addEventListener('click', _=>{img_main.src = img_1.src});
img_2.addEventListener('click', _=>{img_main.src = img_2.src});
img_3.addEventListener('click', _=>{img_main.src = img_3.src});

// Закрытие модальное окна описание товара;
close_x.addEventListener('click', _=>{
    product_description_fog.style.display = 'none'; // (скрытие Туман модального окна описания товара);
    product_description_modal_window.style.display = 'none'; // (скрытие Туман модального окна описания товара); 
});

//===================================================================================================//
//                             Функции вызываемые другими функциями                                  //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

