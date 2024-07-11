const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const message = document.getElementById("message");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
    checkTaskCount();
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

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    checkTaskCount(); // Check task count when tasks are loaded from localStorage
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
