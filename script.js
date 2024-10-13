document.addEventListener('DOMContentLoaded', loadTasks);
//created connstant variable for list to perform tasks
const taskForm = document.getElementById('todo-form');
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const descriptionInput = document.getElementById('description-input');
const dueDateInput = document.getElementById('due-date');
const priorityInput = document.getElementById('priority');
// submit logic
taskForm.addEventListener('submit', addTask);
//created function to add a task
function addTask(event) {
    event.preventDefault();

    const task = {
        text: taskInput.value,

        dueDate: dueDateInput.value,
        priority: priorityInput.value,
        completed: false
    };

    saveTask(task);
    renderTask(task);
    taskForm.reset();
}
//created a function to render the task
function renderTask(task) {
    const li = document.createElement('li');
    li.className = task.priority;

    const taskText = document.createElement('span');
    taskText.textContent = `${task.text} - Due: ${task.dueDate}`;
    taskText.addEventListener('click', () => toggleComplete(task, li));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task, li));

    li.appendChild(taskText);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
}
//create function to show completed function
function toggleComplete(task, li) {
    task.completed = !task.completed;
    li.classList.toggle('completed');
    saveTasks();
}
// function for deleting the task
function deleteTask(task, li) {
    taskList.removeChild(li);
    removeTask(task);
}
// function to save task
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map(li => ({
        text: li.firstChild.textContent.split(' - ')[0],
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}
//function to store/save/load task inn local storage
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(renderTask);
}
// function to remove task
function removeTask(task) {
    const tasks = getTasks().filter(t => t.text !== task.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//function to filter task
function filterTasks(type) {
    const tasks = document.querySelectorAll('li');
    tasks.forEach(task => {
        task.style.display = 'block';
        if (type === 'active' && task.classList.contains('completed')) {
            task.style.display = 'none';
        } else if (type === 'completed' && !task.classList.contains('completed')) {
            task.style.display = 'none';
        }
    });
}
