// Написать код приложения, интерфейс которого состоит из поля ввода и кнопки «Получить список задач». 
// При нажатии на кнопку нужно отправить запрос с помощью fetch на URL https://jsonplaceholder.typicode.com/users/3/todos. 
// Число 3 представляет собой id пользователя, вместо него нужно подставить число, введенное в поле. 
// Если пользователь с таким id существует, вернется список задач для этого пользователя, каждая задача представлена объектом вида:

// {
//     "userId": 3,
//     "id": 43,
//     "title": "tempore ut sint quis recusandae",
//     "completed": true
// }
// Где title — описание задачи, а completed — флаг, отображающий, выполнена задача или нет. 
// Вывести данный список на страницу, оформив соответствующим образом: в виде списка (ul или ol), 
// выполненные задачи должны быть написаны зачеркнутым текстом. 
// Если пользователь с введенным id не существует, вывести сообщение: «Пользователь с указанным id не найден».
const btnGet = document.querySelector('.getListTask');
const userId = document.querySelector('.idEntry');
const todoList = document.querySelector('.list');

// Функция для возвращения fetch
const userRequest = () => {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId.value}/todos`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            return json;
        })
        .catch(() => {
            console.log('Ошибка')
        });
}

function CreateView(list) {
    let toShow = '';

    for (var key in list) {
        const listWrite = list[key]["title"];
        const status = list[key]["completed"];
        var toDoLi;
        if (status) {
            toDoLi = `<li style="text-decoration: line-through">${listWrite}</li>`;
        } else {
            toDoLi = `<li>${listWrite}</li>`;
        }
        toShow = toShow + toDoLi;
    }
    todoList.innerHTML = toShow;
}

btnGet.addEventListener('click', async () => {
    const requestResult = await userRequest();
    if (requestResult.length > 0) {
        CreateView(requestResult);
    } else {
        alert("Пользователь с указанным id не найден");
        CreateView(null);
    }
});