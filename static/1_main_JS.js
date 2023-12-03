'use strict'

 // Установка JS на строгий режим написания кода;

//===================================================================================================//
//                                  Импортированные файлы и модули                                   //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

//===================================================================================================//
//                                       Глобальные переменные                                       //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

//_________________________ПАРАМЕТРЫ_ДЛЯ_АДАПТИВНОЙ_ВЕРСТКИ___________________________//

//_________________________СТАНДАРТНЫЕ ПЕРЕМЕННЫЕ___________________________//
let background_food_1 = document.querySelector('._1_background_food_1_cl'); // (изображение с еды №1);
let background_food_2 = document.querySelector('._1_background_food_2_cl'); // (изображение с еды №2);
let background_food_3 = document.querySelector('._1_background_food_3_cl'); // (изображение с еды №3);
let blocks_main = document.querySelectorAll('._1_select_cl'); // (перечень информационных блоков);
let service_block = document.getElementById('_1_service_block_id'); // (блок генерации услуг);
const template = document.getElementById('_1_template_id'); // (блок template);
const temp_0 = template.content.querySelector('._1_temp_0_cl'); // (div иконка услуги);
const temp_1 = template.content.querySelector('._1_temp_1_cl'); // (div наименование услуги);
const temp_2 = template.content.querySelector('._1_temp_2_cl'); // (div описание услуги);
const temp_3 = template.content.querySelector('._1_service_cl'); // (весь блок копирования);
let about_us_0 = document.querySelector('._1_about_us_0_cl'); // (фон блока "О НАС");
let about_us_1 = document.querySelector('._1_about_us_1_cl'); // (блок "О НАС");
let about_us_2 = document.querySelector('._1_about_us_2_cl'); // (изображение повара);
let about_us_3 = document.querySelector('._1_about_us_3_cl'); // (изображение официантов);
let num_services = 0; // (количество услуг);

//===================================================================================================//
//                                 Одноразовые функции и события                                     //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

// Адаптация по высоте информационных блоков на начало работы;
blocks_main.forEach((element) => {
    operating_parameters_f(element);
});

// Генерация блоков услуг;
document.addEventListener('DOMContentLoaded', _=>{
    // (запрос списка услуг);
    let xhr = new XMLHttpRequest(); // XMLHttp метод для ajax "GET" запроса; 
    xhr.open('GET', '/request_for_services', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText); // (список услуг);
            num_services = JSON.stringify(data).length - 1; // (установка количества услуг);
            for (let n=0; n<JSON.stringify(data).length; n++) {
                temp_0.style.backgroundImage = `url(${data[n][0]})`; // (клонирование иконки "ПРЕДЛОЖЕНИЯ");
                temp_1.innerText = data[n][1]; // (клонирование наименования "ПРЕДЛОЖЕНИЯ");
                temp_1.id = `name_${n}_id`; 
                temp_2.innerText = data[n][2]; // (клонирование описания "ПРЕДЛОЖЕНИЯ");
                temp_3.id = `temp_clone_id_${n}`;
                let template_clone = template.content.cloneNode(true); // (клонирование template "ПРЕДЛОЖЕНИЯ");
                service_block.append(template_clone);
            };
        }
    };
    xhr.send();
})

// Анимация блока "Встречающая страница";
background_food_1.style.right = '450px';
background_food_2.style.right = '350px';
background_food_3.style.right = '50px';

//===================================================================================================//
//                      Многоразовые функции и события вызовов функций                               //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

// Адаптация по высоте информационных блоков на по меер изменения экрана;
window.addEventListener('resize', _ => {
    blocks_main.forEach((element) => {
        operating_parameters_f(element);
    });
});

// Открытие подстраниц;
document.addEventListener('click', (e)=>{
    for (let n=0; n<num_services; n++) {
        let elem_0 = e.target.id;
        let elem_1 = e.target.parentElement.id;
        let elem_2 = e.target.parentElement.parentElement.id;
        let elem_3 = e.target.parentElement.parentElement.parentElement.id;
        let elem_4 = e.target.parentElement.parentElement.parentElement.parentElement.id;
        if (elem_0 == `temp_clone_id_${n}` || elem_1 == `temp_clone_id_${n}` || elem_2 == `temp_clone_id_${n}` || elem_3 == `temp_clone_id_${n}` || elem_4 == `temp_clone_id_${n}`) {
            // Запрос "POST" на "УСЛУГИ";
            let xhr = new XMLHttpRequest(); // XMLHttp метод для ajax "POST" запроса;
            xhr.open('POST', '/request_for_name_service', true);
            xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
            xhr.send(JSON.stringify({ 'name_service': String(document.getElementById(`name_${n}_id`).innerText)}));
            console.log(String(document.getElementById(`name_${n}_id`).innerText));
            document.location.href = '/stations';
        }
    }
});


//===================================================================================================//
//                             Функции вызываемые другими функциями                                  //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

// Функция изменения параметров информационных блоков;
function operating_parameters_f(element) {
    let win_height = window.innerHeight; // (высота рабочего окна сайта);
    let head_height = document.querySelector('._0_head_cl').clientHeight; // (высота головы сайта);
    let border_head_thickness = document.querySelector('._1_main_cl > div:nth-child(1)').clientTop * 2; // (толщина рамки головы сайта);
    let heigh_work = win_height - head_height - border_head_thickness; // (рабочая высота);
    let width_work = window.innerWidth; // (рабочая ширина);
    let width_cok = about_us_2.clientHeight; // (высота блока "ПОВАР");
    let width_cok_1 = about_us_1.clientHeight; // (высота блока "О НАС");
    let width_cok_2 = about_us_3.clientHeight; // (высота блока "ОФИЦИАНТ");
    element.style.height = `${heigh_work}px`; // (изменение высоты информационных блоков);
    about_us_0.style.height = `${heigh_work}px`; // (изменение высоты фона блока "О НАС");
    about_us_2.style.top = `${heigh_work - width_cok - width_cok_1 - 32}px`; // (изменение координат изображения "ПОАВАРА");
    about_us_2.style.right = `${-(width_work / 2) + 200}px`; // (изменение координат изображения "ПОАВАРА");
    about_us_3.style.top = `${heigh_work - width_cok_2 - width_cok - width_cok_1 - 32}px`; // (изменение координат изображения "ПОАВАРА");
    about_us_3.style.right = `${-(width_work / 2) - 150}px`; // (изменение координат изображения "ОФИЦИАНТОВ");
};
