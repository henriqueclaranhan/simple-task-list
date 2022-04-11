const newTaskInput = document.querySelector("#new-task input");
const newTaskButton = document.querySelector("#new-task button");
const tasksSection = document.querySelector("#tasks-section");

const createTaskCard = (taskText, taskId) => {
    let divCard = document.createElement("div");
    let buttonCheck = document.createElement("button");
    let pTaskText = document.createElement("p");

    divCard.classList.add("horizontal-card", "task-card");
    buttonCheck.classList.add("check-button");

    buttonCheck.innerHTML = `<div class="check-circle"></div>`;
    pTaskText.innerText = taskText;

    divCard.appendChild(buttonCheck);
    divCard.appendChild(pTaskText);

    buttonCheck.addEventListener("click", () => {
        removeTask(divCard, taskId);
    });

    tasksSection.appendChild(divCard);
}

const createNewTask = (taskText) => {
    if (taskText === "") return;

    let newTaskId = getLastTaskIndex() + 1;

    addTaskToStorage(taskText);
    createTaskCard(taskText, newTaskId);

    newTaskInput.value = "";
}

const removeTask = (taskCard, taskId) => {
    tasksSection.removeChild(taskCard);
    deleteTaskFromStorage(taskId);
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
    getTasksFromStorage().forEach(task => {
        if(task === null) return;
        
        createTaskCard(task.text, task.id);
    });
}
