//FIXME: .js extention was added manually because ts converter doesnt do that automaticalys
import { Status } from "./enums.js";
let modalOverlay = document.querySelector('.app__modal-overlay');
let deleteModal = document.querySelector('.delete');
let updateModal = document.querySelector('.update');
let updateModalInput = document.getElementById('update-task-input');
const deleteBtn = document.querySelector('.app__modal__footer__btns__deletebtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const cancelUpdateBtn = document.getElementById('cancelUpdateBtn');
const saveBtn = document.querySelector('.app__modal__footer__btns__savebtn');
let taskInput = document.getElementById('add-task-input');
const tasks = document.querySelector('.app__section2__task-info');
const dropzones = Array.prototype.slice.call(document.querySelectorAll('.dropzone'));
let id = 0;
let selectedTask;
const createTask = (newTask) => {
    let task = document.createElement('li');
    task.className = 'app__section2__added-tasks__task fill';
    let taskSec1 = document.createElement('div');
    let taskSec2 = document.createElement('div');
    taskSec1.className = 'app__section2__task-info__sec1';
    taskSec2.className = 'app__section2__task-info__sec2';
    task.id = `${newTask.id}`;
    task.setAttribute("draggable", "true");
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', (event) => {
        dragEnd(event);
        //Which dropzone task belongs to
        whichBelongsTo(status);
    });
    let taskContent = document.createElement('div');
    taskContent.className = 'app__section2__added-tasks__task__content';
    taskContent.textContent = newTask.taskInputValue;
    //initialize delete button
    let trashBtn = document.createElement('span');
    trashBtn.className = 'app__section2__added-tasks__task__delete fas fa-fw fa-trash';
    trashBtn.addEventListener('click', (event) => openDeleteModal(event));
    let editBtn = document.createElement('span');
    editBtn.className = 'app__section2__added-tasks__task__edit fas fa-fw fa-pen-square';
    editBtn.addEventListener('click', (event) => { openUpdateModal(event); });
    let status = document.createElement('div');
    status.textContent = 'Task',
        status.className = 'app__section2__task-info__status ready';
    task.appendChild(taskSec1);
    task.appendChild(taskSec2);
    taskSec1.appendChild(taskContent);
    taskSec2.appendChild(trashBtn);
    taskSec2.appendChild(editBtn);
    taskSec2.appendChild(status);
    tasks.insertBefore(task, tasks.childNodes[0]);
};
const addTask = (event) => {
    var _a;
    event.preventDefault();
    if (taskInput.value != '') {
        let addTaskInputValue = (_a = document.getElementById('add-task-input')) === null || _a === void 0 ? void 0 : _a.value;
        let newTask = {
            taskInputValue: taskInput.value,
            id
        };
        id++;
        createTask(newTask);
        taskInput.value = '';
    }
};
const openDeleteModal = (event) => {
    var _a, _b;
    //identify task id from top parent node
    let taskBelong = (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode;
    modalOverlay.style.display = 'block';
    deleteModal.style.display = 'flex';
    deleteBtn.addEventListener('click', () => {
        document.getElementById(`${taskBelong.id}`).remove();
        closeModal();
    });
};
const openUpdateModal = (event) => {
    var _a, _b;
    //identify task id from top parent node
    let taskBelong = (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode;
    let updatedInputValue;
    modalOverlay.style.display = 'block';
    updateModal.style.display = 'flex';
    updateModalInput.addEventListener('change', (event) => {
        updatedInputValue = event.target.value;
        event.target.value = '';
    });
    saveBtn.addEventListener('click', () => {
        document.getElementById(`${taskBelong.id}`).childNodes[0].childNodes[0].textContent = updatedInputValue;
        closeModal();
    });
};
const closeModal = () => {
    modalOverlay.style.display = 'none';
    deleteModal.style.display = 'none';
    updateModal.style.display = 'none';
};
//Which dropzone task belongs to
const whichBelongsTo = (status) => {
    let belongsTo = status.parentNode.parentNode.parentNode;
    belongsTo.id == Status.Ready ? (status.textContent = 'Task',
        status.className = 'app__section2__task-info__status ready') : belongsTo.id == Status.InProgress ? (status.className = 'app__section2__task-info__status in-progress',
        status.textContent = 'In Progress') : belongsTo.id == Status.Done ? (status.className = 'app__section2__task-info__status done',
        status.textContent = 'Done') : null;
};
const dragStart = (event) => {
    let targetElement = event.target;
    targetElement.className += ' hold';
    selectedTask = targetElement;
    setTimeout(() => (targetElement.className = 'invisible'), 0);
};
const dragEnd = (event) => {
    event.target.className = 'app__section2__added-tasks__task fill';
};
const dragEnter = (event) => {
    event.preventDefault();
    event.target.className === 'app__section2__taskcolumn dropzone' && (event.target.className += 'hovered');
};
const dragOver = (event) => {
    event.preventDefault();
};
const dragLeave = (event) => {
    event.target.className === 'app__section2__taskcolumn dropzone hovered' && (event.target.className = "app__section2__taskcolumn dropzone");
};
const dragDrop = (event) => {
    event.target.className === 'app__section2__taskcolumn dropzone hovered' && (event.target.className = "app__section2__taskcolumn dropzone");
    event.target.append(selectedTask);
};
//Close modal by clicking 'Cancel'
cancelDeleteBtn.addEventListener('click', closeModal);
cancelUpdateBtn.addEventListener('click', closeModal);
// Adding event listeners to 'Add' button
document.getElementById('add-task').addEventListener('click', addTask);
//Listening add task input
taskInput.addEventListener('change', (event) => taskInput.value = event.target.value);
//Apply drag&drop events to all dropzones
for (const dropzone of dropzones) {
    dropzone.addEventListener('dragenter', dragEnter);
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('dragleave', dragLeave);
    dropzone.addEventListener('drop', dragDrop);
}
