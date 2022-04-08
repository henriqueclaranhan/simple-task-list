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
            removeTask(checkButton.parentNode);
        }, false);
    });
}

const createNewTask = (taskText) => {
    if (taskText === "") return;

    tasksSection.innerHTML += createTaskCard(taskText);
    addCheckListeners();
    newTaskInput.value = "";
}

const removeTask = (taskCard) => {
    taskCard.remove();
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
