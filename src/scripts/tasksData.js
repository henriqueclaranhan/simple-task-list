const getTasksFromStorage = () => {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
}

const getLastTaskIndex = () => {
    return Object.keys(getTasksFromStorage()).length - 1;
}

const addTaskToStorage = (taskText) => {
    let tasks = getTasksFromStorage();

    tasks.push({
        "id": getLastTaskIndex() + 1,
        "text": taskText
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const deleteTaskFromStorage = (taskId) => {
    let tasks = getTasksFromStorage();
    
    delete tasks[taskId];
    localStorage.setItem("tasks", JSON.stringify(tasks));

    if(allTasksAreNull()) {
        clearStorage();
    }
}

const allTasksAreNull = () => {
    return getTasksFromStorage().every(element => element === null);
}

const clearStorage = () => {
    localStorage.setItem("tasks", "[]");
}
