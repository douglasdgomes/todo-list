const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.querySelector(".tasks__list");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        tasks.push(task);

        saveTasks();

        taskInput.value = "";

        renderTasks();
    }
});

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
            <label class="task__check">
                <input type="checkbox" class="task__checkbox" ${task.completed ? "checked" : ""}>
                <span class="task__checkmark"></span>
            </label>
            <p class="task__text">
                ${task.text}
            </p>

            <input
                type="text"
                class="tasks__input task__edit-input"
                value="${task.text}"
                hidden
            >
            <div class="task__actions">
                <button class="task__button task__button--edit"><img class="task__edit-icon" src="/assets/img/pencil-icon.svg" alt=""></button>
                <button class="task__button task__button--delete"><img class="task__delete-icon" src="/assets/img/delete-icon.svg" alt=""></button>
            </div>
        `;
        const checkboxes = taskElement.querySelector(".task__checkbox");
        const deleteButton = taskElement.querySelector(".task__button--delete");
        const editButton = taskElement.querySelector(".task__button--edit");
        const editInput = taskElement.querySelector(".task__edit-input");
        const taskTextElement = taskElement.querySelector(".task__text");

        checkboxes.addEventListener("change", function (event) {
            task.completed = event.target.checked;
            saveTasks();
            renderTasks();
        });

        deleteButton.addEventListener("click", function () {
            const taskIndex = tasks.findIndex((t) => t.id === task.id);
            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1);
                saveTasks();
                renderTasks();
            }
        });

        editButton.addEventListener("click", () => {
            editTask(
                task,
                taskTextElement,
                editInput,
                editButton
            );
        });

        taskList.appendChild(taskElement);
    });
}

function saveTask(task, editInput) {
    const newTitle = editInput.value.trim();

    if (!newTitle) {
        return;
    }

    task.text = newTitle;
    saveTasks();

    renderTasks();
}

function editTask(task, taskTextElement, editInput, editButton) {
    taskTextElement.hidden = true;
    editInput.hidden = false;

    editInput.focus();
    editInput.select();

    editButton.innerHTML = `
        <img
            src="./assets/img/check-icon.svg"
            alt=""
        >
    `;

    editButton.classList.remove("task__button--edit");
    editButton.classList.add("task__button--save");

    editButton.onclick = () => {
        saveTask(task, editInput);
    };
}

renderTasks();