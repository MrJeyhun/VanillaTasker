let taskInputValue;
let id = 0;

const createTask = (newTask, taskId) => {
    console.log('inputValue', newTask);
    let task = document.createElement('li');
    task.id = taskId;
    task.className = 'app__section2__added-tasks__task fill';
    task.setAttribute("draggable", "true");

    // task.addEventListener('dragstart', dragStart);
    // task.addEventListener('dragend', dragEnd);

    let taskContent = document.createElement('div');
    taskContent.className = 'app__section2__added-tasks__task__content';
    taskContent.textContent = newTask;
    
    let trash = document.createElement('div');
    trash.className = 'app__section2__added-tasks__task__delete';
    trash.textContent = 'X';
    //FIXME:
    // trash.addEventListener('click', removeTask(event.target.parentNode.id));

    task.appendChild(taskContent);
    task.appendChild(trash);

    let tasks = document.querySelector('.app__section2__added-tasks');
    tasks.insertBefore(task, tasks.childNodes[0]);
}

export const addTask = (event) => {
    event.preventDefault();
    if (taskInputValue != '') {
        console.log('test', taskInputValue);
        id++;
        createTask(taskInputValue, id);
        taskInputValue = '';
    }
}

//FIXME:
// const removeTask = (id) => {
//     document.getElementById(`${id}`).remove();
// }


// Adding event listeners to 'Add' button
document.getElementById('add-task').addEventListener('click', addTask);

//Listening add task input
document.getElementById('add-task-input').addEventListener('change', (event) => taskInputValue = event.target.value);