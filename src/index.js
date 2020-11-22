var modalOverlay = document.querySelector('.app__modal-overlay');
var deleteModal = document.querySelector('.delete');
var updateModal = document.querySelector('.update');
var updateModalInput = document.getElementById('update-task-input');
var deleteBtn = document.querySelector('.app__modal__footer__btns__deletebtn');
var cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
var cancelUpdateBtn = document.getElementById('cancelUpdateBtn');
var saveBtn = document.querySelector('.app__modal__footer__btns__savebtn');
var taskInput = document.getElementById('add-task-input');
var tasks = document.querySelector('.app__section2__task-info');
var dropzones = Array.prototype.slice.call(document.querySelectorAll('.dropzone'));
var id = 0;
var selectedTask;
var createTask = function (newTask, taskId) {
    var task = document.createElement('li');
    task.className = 'app__section2__added-tasks__task fill';
    var taskSec1 = document.createElement('div');
    var taskSec2 = document.createElement('div');
    taskSec1.className = 'app__section2__task-info__sec1';
    taskSec2.className = 'app__section2__task-info__sec2';
    task.id = "" + taskId;
    task.setAttribute("draggable", "true");
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', function (event) {
        dragEnd(event);
        //Which dropzone task belongs to
        whichBelongsTo(status);
    });
    var taskContent = document.createElement('div');
    taskContent.className = 'app__section2__added-tasks__task__content';
    taskContent.textContent = newTask;
    //initialize delete button
    var trashBtn = document.createElement('span');
    trashBtn.className = 'app__section2__added-tasks__task__delete fas fa-fw fa-trash';
    trashBtn.addEventListener('click', function (event) { return openDeleteModal(event); });
    var editBtn = document.createElement('span');
    editBtn.className = 'app__section2__added-tasks__task__edit fas fa-fw fa-pen-square';
    editBtn.addEventListener('click', function (event) { openUpdateModal(event); });
    var status = document.createElement('div');
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
var addTask = function (event) {
    var _a;
    event.preventDefault();
    if (taskInput.value != '') {
        var addTaskInputValue = (_a = document.getElementById('add-task-input')) === null || _a === void 0 ? void 0 : _a.value;
        id++;
        createTask(taskInput.value, id);
        taskInput.value = '';
    }
};
var openDeleteModal = function (event) {
    var _a, _b;
    //identify task id from top parent node
    var taskBelong = (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode;
    modalOverlay.style.display = 'block';
    deleteModal.style.display = 'flex';
    deleteBtn.addEventListener('click', function () {
        document.getElementById("" + taskBelong.id).remove();
        closeModal();
    });
};
var openUpdateModal = function (event) {
    var _a, _b;
    //identify task id from top parent node
    var taskBelong = (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode;
    var updatedInputValue;
    modalOverlay.style.display = 'block';
    updateModal.style.display = 'flex';
    updateModalInput.addEventListener('change', function (event) {
        updatedInputValue = event.target.value;
        event.target.value = '';
    });
    saveBtn.addEventListener('click', function () {
        document.getElementById("" + taskBelong.id).childNodes[0].childNodes[0].textContent = updatedInputValue;
        closeModal();
    });
};
var closeModal = function () {
    modalOverlay.style.display = 'none';
    deleteModal.style.display = 'none';
    updateModal.style.display = 'none';
};
var whichBelongsTo = function (status) {
    var belongsTo = status.parentNode.parentNode.parentNode;
    belongsTo.id == 'ready-tasks' ? (status.textContent = 'Task',
        status.className = 'app__section2__task-info__status ready') : belongsTo.id == 'in-progress-tasks' ? (status.className = 'app__section2__task-info__status in-progress',
        status.textContent = 'In Progress') : belongsTo.id == 'done-tasks' ? (status.className = 'app__section2__task-info__status done',
        status.textContent = 'Done') : null;
};
var dragStart = function (event) {
    var targetElement = event.target;
    targetElement.className += ' hold';
    selectedTask = targetElement;
    setTimeout(function () { return (targetElement.className = 'invisible'); }, 0);
};
var dragEnd = function (event) {
    event.target.className = 'app__section2__added-tasks__task fill';
};
var dragEnter = function (event) {
    event.preventDefault();
    event.target.className === 'app__section2__taskcolumn dropzone' && (event.target.className += 'hovered');
};
var dragOver = function (event) {
    event.preventDefault();
};
var dragLeave = function (event) {
    event.target.className === 'app__section2__taskcolumn dropzone hovered' && (event.target.className = "app__section2__taskcolumn dropzone");
};
var dragDrop = function (event) {
    event.target.className === 'app__section2__taskcolumn dropzone hovered' && (event.target.className = "app__section2__taskcolumn dropzone");
    event.target.append(selectedTask);
};
//Close modal by clicking 'Cancel'
cancelDeleteBtn.addEventListener('click', closeModal);
cancelUpdateBtn.addEventListener('click', closeModal);
// Adding event listeners to 'Add' button
document.getElementById('add-task').addEventListener('click', addTask);
//Listening add task input
taskInput.addEventListener('change', function (event) { return taskInput.value = event.target.value; });
//Apply drag&drop events to all dropzones
for (var _i = 0, dropzones_1 = dropzones; _i < dropzones_1.length; _i++) {
    var dropzone = dropzones_1[_i];
    dropzone.addEventListener('dragenter', dragEnter);
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('dragleave', dragLeave);
    dropzone.addEventListener('drop', dragDrop);
}
