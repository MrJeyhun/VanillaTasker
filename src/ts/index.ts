import {newTask} from './types'; 
import {Status} from "./enums"; 

let modalOverlay: HTMLElement = document.querySelector('.app__modal-overlay');
let deleteModal: HTMLElement = document.querySelector('.delete');
let updateModal: HTMLElement = document.querySelector('.update');
let updateModalInput = (<HTMLInputElement>document.getElementById('update-task-input'));
const deleteBtn: HTMLElement = document.querySelector('.app__modal__footer__btns__deletebtn');
const cancelDeleteBtn: HTMLElement = document.getElementById('cancelDeleteBtn');
const cancelUpdateBtn: HTMLElement = document.getElementById('cancelUpdateBtn');
const saveBtn: HTMLElement = document.querySelector('.app__modal__footer__btns__savebtn');
let taskInput = (<HTMLInputElement>document.getElementById('add-task-input'));
const tasks: HTMLElement = document.querySelector('.app__section2__task-info');
const dropzones: HTMLElement[] = Array.prototype.slice.call(document.querySelectorAll('.dropzone'));
let id: number = 0;
let selectedTask: HTMLElement;  
 
const createTask = (newTask: newTask) => {
    let task = document.createElement('li');
    task.className = 'app__section2__added-tasks__task fill';
    let taskSec1 = document.createElement('div');
    let taskSec2 = document.createElement('div');
    taskSec1.className = 'app__section2__task-info__sec1';
    taskSec2.className = 'app__section2__task-info__sec2';
    task.id = `${newTask.id}`
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
    let trashBtn: HTMLElement= document.createElement('span');
    trashBtn.className = 'app__section2__added-tasks__task__delete fas fa-fw fa-trash';
    trashBtn.addEventListener('click', (event) => openDeleteModal(event));

    let editBtn: HTMLElement= document.createElement('span');
    editBtn.className = 'app__section2__added-tasks__task__edit fas fa-fw fa-pen-square';
    editBtn.addEventListener('click', (event) => {openUpdateModal(event)});

    let status: HTMLElement= document.createElement('div');
    status.textContent = 'Task',
    status.className = 'app__section2__task-info__status ready'

    task.appendChild(taskSec1);
    task.appendChild(taskSec2);
    taskSec1.appendChild(taskContent);
    taskSec2.appendChild(trashBtn);
    taskSec2.appendChild(editBtn);
    taskSec2.appendChild(status);

    tasks.insertBefore(task, tasks.childNodes[0]);
}

const addTask = (event: Event) => {
    event.preventDefault();
    if (taskInput.value != '') {
        let addTaskInputValue = (<HTMLInputElement>document.getElementById('add-task-input'))?.value;
        let newTask = {
            taskInputValue: taskInput.value,
            id
        }

        id++;
        createTask(newTask);
        taskInput.value = '';
    }
}

const openDeleteModal = (event: Event) => {
    //identify task id from top parent node
    let taskBelong = (<HTMLElement>event.target)?.parentNode?.parentNode; 
    modalOverlay.style.display = 'block';
    deleteModal.style.display = 'flex';

    deleteBtn.addEventListener('click', () => {
        document.getElementById(`${(<HTMLElement>taskBelong).id}`).remove();
        closeModal();
    });
}

const openUpdateModal = (event: Event) => {
    //identify task id from top parent node
    let taskBelong = (<HTMLElement>event.target)?.parentNode?.parentNode;
    let updatedInputValue: string;
    modalOverlay.style.display = 'block';
    updateModal.style.display = 'flex';

    updateModalInput.addEventListener('change', (event: Event) => {
        updatedInputValue = (<HTMLInputElement>event.target).value;
        (<HTMLInputElement>event.target).value = '';
    })

    saveBtn.addEventListener('click', () => {
        document.getElementById(`${(<HTMLElement>taskBelong).id}`).childNodes[0].childNodes[0].textContent = updatedInputValue;
        closeModal();
    })

}

const closeModal = () => {
    modalOverlay.style.display = 'none';
    deleteModal.style.display = 'none';
    updateModal.style.display = 'none';
} 

//Which dropzone task belongs to
const whichBelongsTo = (status: HTMLElement) => {
    let belongsTo = (<HTMLElement>status.parentNode.parentNode.parentNode);

    belongsTo.id == Status.Ready ? (
        status.textContent = 'Task',
        status.className = 'app__section2__task-info__status ready'
    ) : belongsTo.id == Status.InProgress ? (
        status.className = 'app__section2__task-info__status in-progress',
        status.textContent = 'In Progress'
    ) : belongsTo.id == Status.Done ? (
        status.className = 'app__section2__task-info__status done',
        status.textContent = 'Done'
    ) : null
}

const dragStart = (event: DragEvent) => {
    let targetElement: HTMLElement = (<HTMLElement>event.target);
    targetElement.className += ' hold';
    selectedTask = targetElement;
    setTimeout(() => (targetElement.className = 'invisible'), 0);
}

const dragEnd = (event: DragEvent) => {
    (<HTMLElement>event.target).className = 'app__section2__added-tasks__task fill';
}

const dragEnter = (event: DragEvent) => {
    event.preventDefault();
    (<HTMLElement>event.target).className === 'app__section2__taskcolumn dropzone' && ((<HTMLElement>event.target).className += 'hovered');   
}

const dragOver = (event: DragEvent) => {
    event.preventDefault();
}

const dragLeave = (event: DragEvent) => {
    (<HTMLElement>event.target).className === 'app__section2__taskcolumn dropzone hovered' && ((<HTMLElement>event.target).className = "app__section2__taskcolumn dropzone")
}

const dragDrop = (event: DragEvent) => {
    (<HTMLElement>event.target).className === 'app__section2__taskcolumn dropzone hovered' && ((<HTMLElement>event.target).className = "app__section2__taskcolumn dropzone");
    (<HTMLElement>event.target).append(selectedTask);
}

//Close modal by clicking 'Cancel'
cancelDeleteBtn.addEventListener('click', closeModal);
cancelUpdateBtn.addEventListener('click', closeModal);

// Adding event listeners to 'Add' button
document.getElementById('add-task').addEventListener('click', addTask);

//Listening add task input
taskInput.addEventListener('change', (event: Event) => taskInput.value = (<HTMLInputElement>event.target).value);

//Apply drag&drop events to all dropzones
for ( const dropzone of dropzones ) {
    dropzone.addEventListener('dragenter', dragEnter);
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('dragleave', dragLeave); 
    dropzone.addEventListener('drop', dragDrop);
}