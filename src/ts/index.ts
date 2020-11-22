let modalOverlay: HTMLElement = document.querySelector('.app__modal-overlay');
let deleteModal: HTMLElement = document.querySelector('.delete');
let updateModal: HTMLElement = document.querySelector('.update');
let updateModalInput: HTMLElement = document.getElementById('update-task-input');
const deleteBtn: HTMLElement = document.querySelector('.app__modal__footer__btns__deletebtn');
const cancelDeleteBtn: HTMLElement = document.getElementById('cancelDeleteBtn');
const cancelUpdateBtn: HTMLElement = document.getElementById('cancelUpdateBtn');
const saveBtn: HTMLElement = document.querySelector('.app__modal__footer__btns__savebtn');
//FIXME:
let taskInputValue: any = document.getElementById('add-task-input');
const tasks: HTMLElement = document.querySelector('.app__section2__task-info');
const dropzones = document.querySelectorAll('.dropzone');
let id: number = 0;
let selectedTask: HTMLElement;

const createTask = (newTask: string, taskId: string) => {
    let task = document.createElement('li');
    task.className = 'app__section2__added-tasks__task fill';
    let taskSec1 = document.createElement('div');
    let taskSec2 = document.createElement('div');
    taskSec1.className = 'app__section2__task-info__sec1';
    taskSec2.className = 'app__section2__task-info__sec2';
    task.id = taskId;
    task.setAttribute("draggable", "true");

    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', (event) => {
        dragEnd(event);
        //Which dropzone task belongs to
        
    });

    let taskContent = document.createElement('div');
    taskContent.className = 'app__section2__added-tasks__task__content';
    taskContent.textContent = newTask;
    
    //initialize delete button
    let trashBtn = document.createElement('span');
    trashBtn.className = 'app__section2__added-tasks__task__delete fas fa-fw fa-trash';
    trashBtn.addEventListener('click', (event) => openDeleteModal(event));

    let editBtn = document.createElement('span');
    editBtn.className = 'app__section2__added-tasks__task__edit fas fa-fw fa-pen-square';
    editBtn.addEventListener('click', (event) => {openUpdateModal(event)});

    let status = document.createElement('div');
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
    if (taskInputValue != '') {
        let addTaskInputValue = (<HTMLInputElement>document.getElementById('add-task-input'))?.value;
        id++;
        createTask(taskInputValue, id);
        addTaskInputValue = '';
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

const whichBelongsTo = (status: HTMLElement) => {
    //FIXME:
    let belongsTo: any = status.parentNode.parentNode.parentNode;

    belongsTo.id == 'ready-tasks' ? (
        status.textContent = 'Task',
        status.className = 'app__section2__task-info__status ready'
    ) : belongsTo.id == 'in-progress-tasks' ? (
        status.className = 'app__section2__task-info__status in-progress',
        status.textContent = 'In Progress'
    ) : belongsTo.id == 'done-tasks' ? (
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
    (<HTMLElement>event.target).className === 'app__section2__taskcolumn dropzone' && (event.target.className += 'hovered');   
}

const dragOver = (event: DragEvent) => {
    event.preventDefault();
}

const dragLeave = (event: DragEvent) => {
    (<HTMLElement>event.target).className === 'app__section2__taskcolumn dropzone hovered' && (event.target.className = "app__section2__taskcolumn dropzone")
}

const dragDrop = (event: DragEvent) => {
    (<HTMLElement>event.target).className === 'app__section2__taskcolumn dropzone hovered' && (event.target.className = "app__section2__taskcolumn dropzone");
    (<HTMLElement>event.target).append(selectedTask);
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