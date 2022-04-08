const getTasksFromStorage = () => {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
}

const getLastTaskIndex = (tasks) => {
    return Object.keys(tasks).length - 1;
}

const addTaskToStorage = (taskText) => {
    let tasks = getTasksFromStorage();

    tasks.push({
        "id": getLastTaskIndex(tasks) + 1,
        "text": taskText
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const getReorderedTasks = (tasks) => {
    let reorderedTasks = [];

    for (let i = 0; i <= Object.keys(tasks).length; i++) {
        if(tasks[i] !== undefined) {
            reorderedTasks.push({
                "id": getLastTaskIndex(reorderedTasks) + 1,
                "text": tasks[i].text
            });
        }
    }

    return reorderedTasks;
}

const deleteTaskFromStorage = (taskId) => {
    let tasks = getTasksFromStorage();
    
    delete tasks[taskId];
    tasks = getReorderedTasks(tasks);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const clearStorage = () => {
    localStorage.setItem("tasks", "[]");
}
