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

    tasksSection.prepend(divCard);
}

const createNewTask = (taskText) => {
    if (taskText === "") return;

    let newTaskId = getLastTaskIndex() + 1;

    addTaskToStorage(taskText);
    createTaskCard(taskText, newTaskId);

    newTaskInput.value = "";
}

const slideCardUp = (taskCard) => {
    taskCard.classList.add("removed-task-card");

    let marginTopSlideHeight = -taskCard.offsetHeight - 11;
    const keyFrameSlideTop = document.createElement("style");

    keyFrameSlideTop.innerHTML = `
        @keyframes slide-up {
            0% {
                opacity: 1;
                margin-top: 0;
            }

            40% {
                opacity: 0;
            }
        
            100% {
                opacity: 0;
                margin-top: ${marginTopSlideHeight}px;
            }
        }

        .removed-task-card {
            animation: slide-up .5s ease;
        }
    `;

    taskCard.appendChild(keyFrameSlideTop);
}

const removeTask = (taskCard, taskId) => {
    slideCardUp(taskCard);

    setTimeout(() => {
        tasksSection.removeChild(taskCard);
    }, 495);

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
