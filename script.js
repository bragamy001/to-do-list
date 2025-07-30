// Adicione ao seu script.js
const localStorageKey = 'to-do-list-gn';

function validateIfExistsNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let inputValue = document.getElementById('input-new-task').value;
    let exists = values.find(x => x.name == inputValue);
    return !exists ? false : true;
}

function newTask() {
    let input = document.getElementById('input-new-task');
    input.style.border = '';

    // validation
    if (!input.value) {
        input.style.border = '1px solid red';
        alert('Digite algo para inserir em sua lista');
    } else if (validateIfExistsNewTask()) {
        alert('Já existe uma task com essa descrição');
    } else {
        // increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        values.push({
            name: input.value,
            completed: false
        });
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }
    input.value = '';
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `
            <li class="${values[i]['completed'] ? 'completed' : ''}">
                <span>${values[i]['name']}</span>
                <button class='edit-btn' onclick='editTask("${values[i]['name']}")'><i class="bi bi-pencil-square"></i></button>
                
               
                <button class='complete-btn' onclick='completeTask("${values[i]['name']}")'>
                    ${values[i]['completed'] ? '<i class="bi bi-toggle-on"></i>' : '<i class="bi bi-toggle-off"></i>'}
                </button>

                
                <button class='delete-btn' onclick='removeItem("${values[i]['name']}")'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M1.5 2.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5zM15.5 2h-2.18l-.5-.5H4.68l-.5.5H1.5a.5.5 0 0 0 0 1h1.36l1.07 10.83a1.5 1.5 0 0 0 1.47 1.17h6.3a1.5 1.5 0 0 0 1.47-1.17L13.14 3H14.5a.5.5 0 0 0 0-1zm-8.74 10H5.24a.5.5 0 0 1-.48-.4L4.23 4h7.54l-.53 7.6a.5.5 0 0 1-.48.4H6.76z"/>
                    </svg>
                </button>
            </li>`;
    }
}

function editTask(taskName) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name == taskName);
    let updatedTaskName = prompt("Editar tarefa:", taskName);

    if (updatedTaskName !== null) {
        values[index].name = updatedTaskName;
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }
}

function completeTask(taskName) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name == taskName);
    
    // Toggle completed status
    values[index].completed = !values[index].completed;

    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name == data);
    values.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}

showValues();
