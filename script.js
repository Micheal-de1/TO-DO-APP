const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks
loadTasks();

addBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();

    if (task === "") return;

    addTask(task);

    taskInput.value = "";

    saveTasks();
});

function addTask(taskText) {

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">❌</button>
    `;

    taskList.appendChild(li);

    const deleteBtn = li.querySelector(".delete-btn");
    const taskSpan = li.querySelector("span");

    taskSpan.addEventListener("click", () => {
        taskSpan.classList.toggle("completed");
        saveTasks();
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });
}

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem("tasks") || "";

    document.querySelectorAll("#taskList li").forEach(li => {

        const deleteBtn = li.querySelector(".delete-btn");
        const taskSpan = li.querySelector("span");

        taskSpan.addEventListener("click", () => {
            taskSpan.classList.toggle("completed");
            saveTasks();
        });

        deleteBtn.addEventListener("click", () => {
            li.remove();
            saveTasks();
        });
    });
}

taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addBtn.click();
    }
});
