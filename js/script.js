const tasks = [];

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.querySelector('.tasks__list');

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        taskInput.value = '';
        renderTasks();
    }
});

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <label class="task__check">
                <input type="checkbox" class="task__checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task__checkmark"></span>
            </label>
            <p class="task__text">${task.text}</p>
            <div class="task__actions">
                <button class="task__button task__button--edit"><img class="task__edit-icon" src="/assets/img/pencil-icon.svg" alt=""></button>
                <button class="task__button task__button--delete"><img class="task__delete-icon" src="/assets/img/delete-icon.svg" alt=""></button>
            </div>
        `;
        taskList.appendChild(taskElement);
    });
}
