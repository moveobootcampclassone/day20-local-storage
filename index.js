"use strict";

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// let a = true || false; // (true)
// // a = true;
// let b = "" || "hello"; // "" => falsy , "hello" => truthy
// // b = "hello"
// let c = 1 < 0 || 8;
// //c = 8
// let d = 7 || 8;
// // d = 7
// let user = "Bob"; //input
// // let user = ""
// // let user = undefined;
// let userName = user || "Guest";
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

// what happens then tasks = []?
function renderTasks() {
  console.log("renderTasks()");
  taskList.innerHTML = "";
  // if tasks = [] => nothing to render
  // tasks.length => [].length = 0
  // after adding one task:
  // tasks = [{...}]
  // after another task added:
  // tasks = [{...},{...}]
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
    //   "id": 123,
    //   "text": "Do homework",
    //   "completed": false
    // }
    const li = document.createElement("li");
    // {task.completed ? "checked" : ""}
    // or {task.completed && "checked"}
    // when we click on the checkbox => toggleCompletion(123)
    // with the current task id (123)
    li.innerHTML = `
        <label>
          <input type="checkbox" onchange="toggleCompletion(${task.id})" 
          ${task.completed && "checked"} id="task-${task.id}">
          ${task.text}
        </label>
        <button type="button" id="delete-${task.id}" 
        onclick="deleteTask(${task.id})">Delete</button>
      `;

    li.className = task.completed ? "completed" : "not-completed";
    // li.className = task.completed && "completed";
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
  // tasks = [{id: 1223432432,
  // text: "Drink",
  // completed: false}]
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
}

// Toggle a task's completion status
function toggleCompletion(id) {
  for (let i = 0; i < tasks.length; i++) {
    tasks[id]; // tasks[123] => id is not the index
    const currentTask = tasks[i];
    if (currentTask.id === id) {
      currentTask.completed = !currentTask.completed; // toggle to the checkbox
      //tasks[i].completed = true; // for onr toggle
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
// Delete a task from the list
function deleteTask(id) {
  // findIndex is a method of arrays
  const taskIndex = tasks.findIndex(function (task) {
    return task.id === id;
  });
  // if the id don't exist => returns -1
  // we found the index for the task with the id
  // id = 1111 don't exist = > taskIndex = -1
  // for taskIndex = 1
  if (taskIndex !== -1 && tasks[taskIndex].completed) {
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  } else {
    alert("Not Completed, please complete the task!");
  }
}

// Event listeners
// when we click on the submit button => addTask()
taskForm.addEventListener("submit", addTask);

// הפעלה של הפונקציה כשהדף עולה
renderTasks();
