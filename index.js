"use strict";

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let a = true || false; // (true)
// a = true;
let b = "" || "hello"; // "" => falsy , "hello" => truthy
// b = "hello"
let c = 1 < 0 || 8;
//c = 8
let d = 7 || 8;
// d = 7
let user = "Bob"; //input
// let user = ""
// let user = undefined;
let userName = user || "Guest";
// console.log(userName, "userName");

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// Not first time + we have something in local stoage with key "tasks"
// our key => "tasks"
// let tasks = [
//   {
//     "id": 1673251272192,
//     "text": "Drink",
//     "completed": true
//   },
//   {
//     "id": 1673251276762,
//     "text": "Eat",
//     "completed": false
//   }
// ]
// if we don't have a match:
// let tasks = []

// Render tasks to the html page
function renderTasks() {
  console.log("renderTasks()");
  taskList.innerHTML = "";
  // if tasks = [] => nothing to render
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    // i = 1
    //const task = {
    //   "id": 1673253281028,
    //   "text": "Do homework",
    //   "completed": false
    // }
    // after one toggle:
    //const task = {
    //   "id": 1673253281028,
    //   "text": "Do homework",
    //   "completed": false
    // }
    const li = document.createElement("li");
    // {task.completed ? "checked" : ""}
    // or {task.completed && "checked"}
    li.innerHTML = `
        <label>
          <input type="checkbox" onchange="toggleCompletion(${task.id})" 
          ${task.completed && "checked"} id="task-${task.id}">
          ${task.text}
        </label>
        <button type="button" id="delete-${task.id}" onclick="deleteTask(${
      task.id
    })">Delete</button>
      `;

    li.className = task.completed ? "completed" : "";
    taskList.appendChild(li);
  }
}

// Add a new task to the local storage list
function addTask(event) {
  event.preventDefault();
  console.log(Date.now(), "Date.now()");
  const task = {
    id: Date.now(),
    text: taskInput.value,
    completed: false,
  };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
}

// Toggle a task's completion status
function toggleCompletion(id) {
  for (let i = 0; i < tasks.length; i++) {
    tasks[id]; // tasks[123432423] => id is not the index
    if (tasks[i].id === id) {
      tasks[i].completed = !tasks[i].completed; // toggle to the checkbox
      //tasks[i].completed = true; // for onr toggle
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
// Delete a task from the list
function deleteTask(id) {
  const taskIndex = tasks.findIndex(function (task) {
    return task.id === id;
  });
  if (taskIndex !== -1 && tasks[taskIndex].completed) {
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  } else {
    alert("Not Completed, please complete the task!");
  }
}

// Event listeners
taskForm.addEventListener("submit", addTask);
