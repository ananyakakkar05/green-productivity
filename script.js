// 1. Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 2. Render tasks on screen
function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        let span = document.createElement("span");
        span.innerText = " " + task.text;

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.style.marginLeft = "auto";
        deleteBtn.style.background = "transparent";
        deleteBtn.style.border = "none";
        deleteBtn.style.cursor = "pointer";

        if (task.completed) {
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        }

        checkbox.onclick = function () {
            tasks[index].completed = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        };

        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// 3. Add task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
}

// 4. Enter key support
function handleKey(event) {
    if (event.key === "Enter") {
        addTask();
    }
}
function showProgress() {
    let totalTasks = tasks.length;
    let completedTasks = tasks.filter(task => task.completed).length;
    let result = document.getElementById("result");

    if (totalTasks === 0) {
        result.innerText = "No tasks added today 🌱";
        result.style.color = "#2e7d32";
        return;
    }

    let productivity = Math.round((completedTasks / totalTasks) * 100);

    let message = "";

    if (productivity >= 70) {
        message = "Great job! Very productive 🌿";
        result.style.color = "green";
    } else if (productivity >= 40) {
        message = "Good effort! Keep improving 🍀";
        result.style.color = "orange";
    } else {
        message = "Don’t worry, tomorrow is a new chance 🌱";
        result.style.color = "red";
    }

    result.innerText =
        "You completed " + completedTasks + " out of " + totalTasks +
        " tasks. Productivity: " + productivity + "%.\n" + message;
}

function clearDay() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        tasks = [];
        localStorage.removeItem("tasks");
        document.getElementById("result").innerText = "";
        renderTasks();
    }
}

// Load tasks when page opens
renderTasks();
