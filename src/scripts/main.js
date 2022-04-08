import * as tasksData from "./tasksData.js"

const newTaskInput = document.querySelector("#new-task input");
const newTaskButton = document.querySelector("#new-task button");
const tasksSection = document.querySelector("#tasks-section");

const createTaskCard = (taskText) => {
    return `
    <div class="horizontal-card task-card">
        <button class="check-button">
            <div class="check-circle"></div>
        </button>
        <p>${taskText}</p>
    </div>`
}

const addCheckListeners = () => {
    let checkButtons = document.querySelectorAll(".check-button");

    checkButtons.forEach(checkButton => {
        checkButton.addEventListener("click", () => {
            let taskCard = checkButton.parentElement;
            let taskId = Array.prototype.indexOf.call(tasksSection.children, taskCard);

            removeTask(taskCard, taskId);
        }, false);
    });
}

const renderTaskCard = (taskText) => {
    tasksSection.innerHTML += createTaskCard(taskText);
    addCheckListeners();
}

const createNewTask = (taskText) => {
    if (taskText === "") return;

    tasksData.addTask(taskText);
    renderTaskCard(taskText);

    newTaskInput.value = "";
}

const removeTask = (taskCard, taskId) => {
    taskCard.remove();
    tasksData.removeTask(taskId);
}

const getInputValue = () => {
    return newTaskInput.value;
}

newTaskInput.addEventListener("keydown", (keyboardEvent) => {
    if(keyboardEvent.key === "Enter") {
        createNewTask(getInputValue());
    }
})

newTaskButton.addEventListener("click", () => {
    createNewTask(getInputValue());
}, false);

window.onload = () => {
    tasksData.getTasks().forEach(task => {
        renderTask(task.text);
    });
}