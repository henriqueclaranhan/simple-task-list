const getTasks = () => {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
}

const getLastTaskIndex = (tasks) => {
    return Object.keys(tasks).length - 1;
}

const addTask = (taskText) => {
    let tasks = getTasks();

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

const removeTask = (taskId) => {
    let tasks = getTasks();
    
    delete tasks[taskId];
    tasks = getReorderedTasks(tasks);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const clearStorage = () => {
    localStorage.setItem("tasks", "[]");
}

export { getTasks, addTask, removeTask }