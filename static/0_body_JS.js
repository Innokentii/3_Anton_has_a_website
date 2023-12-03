'use strict' // Установка JS на строгий режим написания кода;

//===================================================================================================//
//                                  Импортированные файлы и модули                                   //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

//===================================================================================================//
//                                       Глобальные переменные                                       //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

//_________________________ПАРАМЕТРЫ_ДЛЯ_АДАПТИВНОЙ_ВЕРСТКИ___________________________//
let laptop_media = 1280; // (ширина стандартного ноутбука);
let tablet_media = 800; // (ширина стандартного планшета);
let smartphone_media = 320; // (ширина стандартного смартфона);

let media = document.getElementById('_0_media_id'); // (главный адаптивный блок);

//_________________________СТАНДАРТНЫЕ ПЕРЕМЕННЫЕ___________________________//
let icon_main_buttom = document.getElementById('_0_main_buttom_id'); // (кнопка для открытия страницы "ГЛАВНАЯ_СТРАНИЦА");
let main_buttom = document.getElementById('_0_1_main_buttom_id'); // (кнопка для открытия страницы "ГЛАВНАЯ_СТРАНИЦА");
let services_buttom = document.getElementById('_0_services_buttom_id'); // (кнопка для открытия страницы "СТРАНИЦА УСЛУГИ");
let tech_info_buttom = document.getElementById('_0_tech_info_buttom_id'); // (кнопка для открытия страницы "ТЕХНИЧЕСКАЯ ИНФОРМАЦИЯ");
let basket_buttom = document.getElementById('_0_basket_buttom_id'); // (кнопка для открытия страницы "КОРЗИНА");
let contacts_buttom = document.getElementById('_0_contacts_buttom_id'); // (кнопка для открытия страницы "КОНТАКТЫ");

//===================================================================================================//
//                                 Одноразовые функции и события                                     //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

// Cтилизация кнопки "ГЛАВНАЯ_СТРАНИЦА" на начало работы на сайте;
if (document.location.pathname == '/main' ||document.location.pathname == '/' ) {
    main_buttom.style.boxShadow = '-10px 5px 10px black';
    document.querySelector('#_0_1_main_buttom_id > img').src = '/static/logo_menu_open.png';
};

// Cтилизация кнопки "СТРАНИЦА УСЛУГИ" на начало работы на сайте;
if (document.location.pathname == '/services') {
    services_buttom.style.boxShadow = '-10px 5px 10px black';
    document.querySelector('#_0_services_buttom_id > img').src = '/static/logo_services_open.png';
};

// Cтилизация кнопки "ТЕХНИЧЕСКАЯ ИНФОРМАЦИЯ" на начало работы на сайте;
if (document.location.pathname == '/tech_info') {
    tech_info_buttom.style.boxShadow = '-10px 5px 10px black';
    document.querySelector('#_0_tech_info_buttom_id > img').src = '/static/logo_tech_info_open.png';
};

// Cтилизация кнопки "КОРЗИНА" на начало работы на сайте;
if (document.location.pathname == '/basket') {
    basket_buttom.style.boxShadow = '-10px 5px 10px black';
    document.querySelector('#_0_basket_buttom_id > img').src = '/static/logo_basket_open.png';
};

// Cтилизация кнопки "КОНТАКТЫ" на начало работы на сайте;
if (document.location.pathname == '/contacts') {
    contacts_buttom.style.boxShadow = '-10px 5px 10px black';
    document.querySelector('#_0_contacts_buttom_id > img').src = '/static/logo_contacts_open.png';
};



//===================================================================================================//
//                      Многоразовые функции и события вызовов функций                               //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

// Открытия страницы "ГЛАВНАЯ_СТРАНИЦА";
icon_main_buttom.addEventListener('click', _ => {document.location.href = '/main'});
main_buttom.addEventListener('click', _ => {document.location.href = '/main'});

// Открытия страницы "СТРАНИЦА УСЛУГИ";
services_buttom.addEventListener('click', _ => {document.location.href = '/services'});

// Открытия страницы "ТЕХНИЧЕСКАЯ ИНФОРМАЦИЯ";
tech_info_buttom.addEventListener('click', _ => {document.location.href = '/tech_info'});

// Открытия страницы "КОРЗИНА";
basket_buttom.addEventListener('click', _ => {document.location.href = '/basket'});

// Открытия страницы "КОНТАКТЫ";
contacts_buttom.addEventListener('click', _ => {document.location.href = '/contacts'});

//===================================================================================================//
//                             Функции вызываемые другими функциями                                  //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

