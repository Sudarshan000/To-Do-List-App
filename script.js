const taskInput = document.getElementById("task-input");
const deadlineInput = document.getElementById("deadline-input");
const listContainer = document.getElementById("list-container");
const message = document.getElementById("message");


function addTask() {
    if (taskInput.value === '') {
        alert("You must write something!");
    } else if (deadlineInput.value === '') {
        alert("Please select a deadline!");
    } else {
        let li = document.createElement("li");
        let formattedDate = formatDate(deadlineInput.value);

        let taskContent = document.createElement("div");
        taskContent.className = "task-content";

        let taskText = document.createElement("div");
        taskText.className = "task-text";
        taskText.textContent = taskInput.value;

        let taskDeadline = document.createElement("div");
        taskDeadline.className = "task-deadline";
        taskDeadline.textContent = `Deadline: ${formattedDate}`;

        taskContent.appendChild(taskText);
        taskContent.appendChild(taskDeadline);

        li.appendChild(taskContent);
        li.dataset.deadline = deadlineInput.value;

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
        sortTasks();
    }
    taskInput.value = '';
    deadlineInput.value = '';
    saveData();
    checkTaskCount();
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    let tasks = Array.from(listContainer.getElementsByTagName("li"));
    tasks.forEach(task => {
        let deadline = task.dataset.deadline;
        let formattedDate = formatDate(deadline);
        let taskDeadline = task.querySelector('.task-deadline');
        if (taskDeadline) {
            taskDeadline.textContent = `Deadline: ${formattedDate}`;
        }
    });
    sortTasks();
    checkTaskCount();
}



function formatDate(dateString) {
    let date = new Date(dateString);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function sortTasks() {
    let tasks = Array.from(listContainer.getElementsByTagName("li"));
    tasks.sort((a, b) => new Date(a.dataset.deadline) - new Date(b.dataset.deadline));
    tasks.forEach(task => listContainer.appendChild(task));
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
    checkTaskCount();
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}


function checkTaskCount() {
    const tasks = listContainer.getElementsByTagName("li").length;
    if (tasks > 5) {
        message.style.display = "block";
    } else {
        message.style.display = "none";
    }
}

showTask();

