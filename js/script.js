const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.querySelector(".tasks__list");

const tasks = loadTasks();

function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
    };

    tasks.push(task);

    saveTasks();
    renderTasks();
}

function toggleTask(task, completed) {
    task.completed = completed;

    saveTasks();
    renderTasks();
}

function deleteTask(task) {
    const taskIndex = tasks.findIndex((item) => item.id === task.id);

    if (taskIndex === -1) {
        return;
    }

    tasks.splice(taskIndex, 1);

    saveTasks();
    renderTasks();
}

function saveTask(task, editInput) {
    const newText = editInput.value.trim();

    if (!newText) {
        editInput.focus();
        return;
    }

    task.text = newText;

    saveTasks();
    renderTasks();
}

function editTask(taskTextElement, editInput, editButton) {
    taskTextElement.hidden = true;
    editInput.hidden = false;

    editButton.innerHTML = `
        <img
            src="./assets/img/check-icon.svg"
            alt=""
        >
    `;

    editButton.classList.remove("task__button--edit");
    editButton.classList.add("task__button--save");

    editButton.setAttribute("aria-label", "Salvar tarefa");

    editInput.focus();
    editInput.select();
}

function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="tasks__empty">
                <p class="tasks__empty-title">
                    Nenhuma tarefa cadastrada
                </p>

                <p class="tasks__empty-text">
                    Adicione uma tarefa acima para começar.
                </p>
            </div>
        `;

        return;
    }

    tasks.forEach((task) => {
        const taskElement = document.createElement("div");

        taskElement.classList.add("task");

        taskElement.innerHTML = `
            <label class="task__check">
                <input
                    type="checkbox"
                    class="task__checkbox"
                    ${task.completed ? "checked" : ""}
                >

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
                <button
                    type="button"
                    class="task__button task__button--edit"
                    aria-label="Editar tarefa"
                >
                    <img
                        class="task__edit-icon"
                        src="./assets/img/pencil-icon.svg"
                        alt=""
                    >
                </button>

                <button
                    type="button"
                    class="task__button task__button--delete"
                    aria-label="Excluir tarefa"
                >
                    <img
                        class="task__delete-icon"
                        src="./assets/img/delete-icon.svg"
                        alt=""
                    >
                </button>
            </div>
        `;

        const checkbox = taskElement.querySelector(".task__checkbox");
        const deleteButton = taskElement.querySelector(
            ".task__button--delete"
        );
        const editButton = taskElement.querySelector(
            ".task__button--edit"
        );
        const editInput = taskElement.querySelector(
            ".task__edit-input"
        );
        const taskTextElement = taskElement.querySelector(
            ".task__text"
        );

        checkbox.addEventListener("change", function (event) {
            toggleTask(task, event.target.checked);
        });

        deleteButton.addEventListener("click", function () {
            deleteTask(task);
        });

        editButton.addEventListener("click", function () {
            if (editInput.hidden) {
                editTask(
                    taskTextElement,
                    editInput,
                    editButton
                );

                return;
            }

            saveTask(task, editInput);
        });

        editInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                saveTask(task, editInput);
            }

            if (event.key === "Escape") {
                renderTasks();
            }
        });

        taskList.appendChild(taskElement);
    });
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (!taskText) {
        taskInput.focus();
        return;
    }

    addTask(taskText);

    taskInput.value = "";
});

renderTasks();