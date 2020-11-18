let taskInputValue = document.getElementById('add-task-input');
let tasks = document.querySelector('.app__section2__taskcolumn');
const dropzones = document.querySelectorAll('.dropzone');
let id = 0;
let selectedTask;


const createTask = (newTask, taskId) => {
    console.log('inputValue', newTask);
    let task = document.createElement('li');
    task.id = taskId;
    task.className = 'app__section2__added-tasks__task fill';
    task.setAttribute("draggable", "true");

    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);

    let taskContent = document.createElement('div');
    taskContent.className = 'app__section2__added-tasks__task__content';
    taskContent.textContent = newTask;
    
    let trash = document.createElement('div');
    trash.className = 'app__section2__added-tasks__task__delete';
    trash.textContent = 'X';
    trash.addEventListener('click', (event) => removeTask(event.target.parentNode.id));

    task.appendChild(taskContent);
    task.appendChild(trash);

    tasks.insertBefore(task, tasks.childNodes[0]);
}

export const addTask = (event) => {
    event.preventDefault();
    if (taskInputValue != '') {
        console.log('test', taskInputValue);
        id++;
        createTask(taskInputValue, id);
        document.getElementById('add-task-input').value = '';
    }
}

const removeTask = (id) => {
    console.log('d');
    document.getElementById(`${id}`).remove();
}

const dragStart = (event) => {
    event.target.className += ' hold';
    selectedTask = event.target;
    setTimeout(() => (event.target.className = 'invisible'), 0);
}

const dragEnd = (event) => {
    event.target.className = 'app__section2__added-tasks__task fill';
}

const dragEnter = (event) => {
    event.preventDefault();
    event.target.className === 'app__section2__taskcolumn dropzone' && (event.target.className += 'hovered');   
}

const dragOver = (event) => {
    event.preventDefault();
}

const dragLeave = (event) => {
    event.target.className === 'app__section2__taskcolumn dropzone hovered' && (event.target.className = "app__section2__taskcolumn dropzone")
}

const dragDrop = (event) => {
    event.target.className === 'app__section2__taskcolumn dropzone hovered' && (event.target.className = "app__section2__taskcolumn dropzone");
    event.target.append(selectedTask);
}

// Adding event listeners to 'Add' button
document.getElementById('add-task').addEventListener('click', addTask);

//Listening add task input
taskInputValue.addEventListener('change', (event) => taskInputValue = event.target.value);

//Apply drag&drop events to all dropzones
for ( const dropzone of dropzones ) {
    dropzone.addEventListener('dragenter', dragEnter);
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('dragleave', dragLeave);
    dropzone.addEventListener('drop', dragDrop);
}