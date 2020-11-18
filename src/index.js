let modalOverlay = document.querySelector('.app__modal-overlay');
let deleteModal = document.querySelector('.delete');
let updateModal = document.querySelector('.update');
let updateModalInput = document.getElementById('update-task-input');
const deleteBtn = document.querySelector('.app__modal__footer__btns__deletebtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const cancelUpdateBtn = document.getElementById('cancelUpdateBtn');
const saveBtn = document.querySelector('.app__modal__footer__btns__savebtn');
let taskInputValue = document.getElementById('add-task-input');
const tasks = document.querySelector('.app__section2__task-info');
const dropzones = document.querySelectorAll('.dropzone');
let id = 0;
let selectedTask;


const createTask = (newTask, taskId) => {
    let task = document.createElement('li');
    task.className = 'app__section2__added-tasks__task fill';
    let taskSec1 = document.createElement('div');
    let taskSec2 = document.createElement('div');
    taskSec1.className = 'app__section2__task-info__sec1';
    taskSec2.className = 'app__section2__task-info__sec2';
    task.id = taskId;
    task.setAttribute("draggable", "true");

    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);

    let taskContent = document.createElement('div');
    taskContent.className = 'app__section2__added-tasks__task__content';
    taskContent.textContent = newTask;
    
    //initialize delete button
    let trashBtn = document.createElement('span');
    trashBtn.className = 'app__section2__added-tasks__task__delete fas fa-fw fa-trash';
    //finding task by id, which it belongs to
    trashBtn.addEventListener('click', (event) => openDeleteModal(event));

    let editBtn = document.createElement('span');
    editBtn.className = 'app__section2__added-tasks__task__edit fas fa-fw fa-pen-square';
    editBtn.addEventListener('click', (event) => {openUpdateModal(event)});
    //TODO: add edit functionality

    task.appendChild(taskSec1);
    task.appendChild(taskSec2);
    taskSec1.appendChild(taskContent);
    taskSec2.appendChild(trashBtn);
    taskSec2.appendChild(editBtn);

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

const openDeleteModal = (event) => {
    //identify task id from top parent node
    let taskID = event.target.parentNode.parentNode.id; 
    modalOverlay.style.display = 'block';
    deleteModal.style.display = 'flex';

    deleteBtn.addEventListener('click', () => {
        document.getElementById(`${taskID}`).remove();
        closeModal();
    });
}

const openUpdateModal = (event) => {
    //identify task id from top parent node
    let taskID = event.target.parentNode.parentNode.id;
    let updatedInputValue;
    modalOverlay.style.display = 'block';
    updateModal.style.display = 'flex';

    updateModalInput.addEventListener('change', (event) => {
        updatedInputValue = event.target.value;
        event.target.value = '';
    })

    saveBtn.addEventListener('click', () => {
        document.getElementById(`${taskID}`).childNodes[0].childNodes[0].textContent = updatedInputValue;
        closeModal();
    })

}

const closeModal = () => {
    modalOverlay.style.display = 'none';
    deleteModal.style.display = 'none';
    updateModal.style.display = 'none';
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

//Close modal by clicking 'Cancel'
cancelDeleteBtn.addEventListener('click', closeModal);
cancelUpdateBtn.addEventListener('click', closeModal);

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