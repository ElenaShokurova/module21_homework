// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводится ниже текст «Номер страницы вне диапазона от 1 до 10».
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводится ниже текст «Лимит вне диапазона от 1 до 10».
// Если и первый, и второй input не в диапазонах или не являются числами — выводится ниже текст «Номер страницы и лимит вне диапазона от 1 до 10».
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
// Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
// После получения данных вывести список картинок на экран.

// Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).
const btnNode = document.querySelector('.request');
const pageNode = document.querySelector('.page');
const limitNode = document.querySelector('.limit');
const resultNode = document.querySelector('.result');

function check(number) {
    var data = false;

    if (number > 0 && number < 11) {
        data = true;
    }

    return data;
}

function createQueue(data) {
    var list = '';

    for (var key in data) {
        const imgUrl = data[key]['download_url'];
        const imgAuthor = data[key]['author'];
        const imgHTML = `<div class="card"><img src="${imgUrl}" class="card-image"/><p>${imgAuthor}</p></div>`;
        list += imgHTML;
    }

    resultNode.innerHTML = list;
}

btnNode.addEventListener('click', () => {
    var userPage = pageNode.value;
    var userLimit = limitNode.value;

    if (!check(userPage) && !check(userLimit)) {
        alert('Номер страницы и лимит вне диапазона от 1 до 10');
    }
    else if (!check(userPage)) {
        alert('Номер страницы вне диапазона от 1 до 10');
    }
    else if (!check(userLimit)) {
        alert('Лимит вне диапазона от 1 до 10');
    }
    else {
        const reqUrl = `https://picsum.photos/v2/list?page=${userPage}&limit=${userLimit}`;
        // Делаем запрос за данными
        fetch(reqUrl)
            .then((response) => {
                // Объект ответа на запрос
                console.log('response', response);
                // Превращаем объект в JSON. Мы не можем его сразу прочитать,
                // надо отдать в следующий then
                const result = response.json();
                console.log('result', result);
                return result;
            })
            .then((data) => {
                // Объект результата в формате JSON
                console.log(data);
                createQueue(data);
            })
            .catch(() => { console.log('error') });
    }
});