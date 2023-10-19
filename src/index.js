// Этот код отвечает за создание и отображение карточки с таблицей внутри.
// Он импортирует необходимые стили и библиотеку Bootstrap. Также импортируются изображения для иконок карточки.

// Импортирование CSS стилей
import "./check.css"

// Импортирование CSS и JavaScript файлов Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.js"

// Импортирование функции table_init из файла "./components/table1.js"
// import table_init from "./components/table1.js"

// Этот код создает и настраивает таблицу с данными о состоянии подсистем.
const info_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#006400" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>`

const warning_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff8c00" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>`

const danger_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" class="bi bi-x-square-fill" viewBox="0 0 16 16">
<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
</svg>`

// Функция для создания тела таблицы
const create_table_body = (el) =>{
    let tr = document.createElement("tr");

    tr.innerHTML = 
    `
        <td class="col-auto" style="vertical-align: middle;">
            <div class="container m-0">
                <div class="row">
                    <div class = "col-auto" style="height : 43px; width : 43px"}> 

                    </div>
                    <div class = "col d-flex align-items-center" style="word-break: break-all;">
                        <span>${el.Subsystem}</span>
                    </div>
                </div>
            </div>
        </td>
        <td class="col" style="vertical-align: middle; padding-left: 15px; padding-right : 40px;">
            <div class="container m-0">
                <div class="row">
                    <div class = "col-auto d-flex align-items-center" style="height : 43px; width : 43px"}> 
                        ${el.imgSrc}          
                    </div>
                    <div class = "col d-flex align-items-center" style="word-break: break-all; padding-left: 16px">
                        <span>${el.Status}</span>
                    </div>
                </div>
            </div>
        </td>      
    `
    return tr;
}

// Функция для создания заголовка таблицы
const create_thead = () =>{
    let tr = document.createElement("tr");

    tr.innerHTML = 
    `
                <th>
                    <div class="container m-0">
                            <div class="row">
                                <div class="col-auto" id="event_click_system" style="cursor: pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                    </svg>
                                </div>
                                <div class="col p-0 d-flex align-items-center" style="white-space: nowrap;">
                                    <span>Система Устройств</span>
                                </div>
                            </div>
                    </div>
                </th>
                <th>
                    <div class="container m-0">
                            <div class="row">
                                <div class="col  d-flex align-items-center" style="white-space: nowrap;">
                                    <span>Статус</span>
                                </div>
                            </div>
                    </div>
                </th>
                
    `

    return tr;
}

// Функция для создания основной таблицы
const create_table_main = (props) =>{
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let tr_HEAD = create_thead();//для thead

    tr_HEAD.style = "border-bottom: 1px black solid; border-top: 1px black solid;"
    table.className = "table";
    thead.style = "width: 100%;";
    table.appendChild(thead);
    table.appendChild(tbody)
    thead.appendChild(tr_HEAD);

    props.DataState.map( (el) => {
        tbody.appendChild(create_table_body(el))
    })
    
    return [table,tbody];
}

// Функция для сортировки по названию системы
const sort_1 = (elem,obj_me) =>{
    elem.innerHTML = '';
    let array = obj_me.DataState.sort((a,b) =>{
        if(a.Subsystem.toUpperCase() < b.Subsystem.toUpperCase())
            return -1;
        else
            return 1;
    });
    array.map( (el) =>{
        elem.appendChild(create_table_body(el));
    })
}


// Функция для добавления событий
const addEventInit = (tbody,obj_me) =>{
    let click_system, click_status;
    click_system = document.getElementById("event_click_system");
    click_status = document.getElementById("event_click_status");

    click_system.addEventListener('click', () =>{sort_1(tbody, obj_me)} );
    // click_status.addEventListener('click', () =>{sort_2(tbody,obj_me)});
}

// Функция для инициализации таблицы
const table_init = (obj_me, parent) =>{
    let [table,tbody] = create_table_main(obj_me);
    parent.appendChild(table);

    let flag = false;

    let observer = new MutationObserver( (mutations) =>{
        if(!flag){    
            addEventInit(tbody, obj_me);
            flag = true;
        }
    })

    observer.observe(document.body, {childList: true, once: true});
}

// Создание объекта с данными о подсистемах и их состояниях
let obj = {
    DataState:  [
        {
            Subsystem : "Сеть",
            Status : "Деградирована",
            imgInfo : "предупреждение",
            imgSrc : warning_icon,
        },
        {
            Subsystem : "BIOS/Состояние аппаратного обеспечения",
            Status : "OK",
            imgInfo: "галочка",
            imgSrc : info_icon,
        },
        {
            Subsystem : "Резервирование вентиляторов",
            Status : "Резервирование",
            imgInfo: "галочка",
            imgSrc : info_icon,
        },
        {
            Subsystem : "Служба управления без агента",
            Status : "Недоступна",
            imgInfo: "не доступно",
            imgSrc : danger_icon,
        },
        {
            Subsystem : "1C Ответы",
            Status : "Недоступны",
            imgInfo: "не доступно",
            imgSrc : danger_icon,
        },
        {
            Subsystem : "Вентиляция",
            Status : "Резервирование",
            imgInfo: "галочка",
            imgSrc : warning_icon,
        },
    ],
}

// Получение элемента body документа
let body = document.body;

// Функция для создания карточки с таблицей внутри
const create_card_table = (obj, elem) => {
    // Создание элемента div для карточки
    let div = document.createElement("div");
    div.style = "width: 100%; max-height: 300px; overflow-y: auto;"
    div.className = "card me";

    // Создание элемента div для содержимого карточки
    let div_card_body = document.createElement("div");
    div_card_body.className = "card-body";

    // Добавление содержимого карточки внутрь карточки
    div.appendChild(div_card_body);

    // Вызов функции table_init для заполнения содержимого карточки таблицей
    table_init(obj, div_card_body);

    // Добавление карточки к указанному элементу
    elem.appendChild(div);
}

// Создание элемента div для основного контента с некоторыми стилями
let div = document.createElement("div");
div.style = "display: flex; margin-right: 10px; margin-left: 10px; margin-top: 10px; justify-content: center;";
div.id = "div_main";

// Вызов функции create_card_table для создания карточки с таблицей
create_card_table(obj, div)

// Добавление основного элемента div к body документа
document.body.appendChild(div);
