// Fetching the DOM
const inputBx = document.getElementById("todo-content");
const addBtn = document.getElementById("add-todo");
const delBtn = document.getElementsByClassName(".del-btn");
const todoList = document.querySelector(".todoList");
const taskNumVal = document.querySelector(".footer span");
const clearAllBtn = document.querySelector(".footer button");

// When the user starts entering some content ->
inputBx.onkeyup = () => {
  let userData = inputBx.value; // Getting the user entered value
  if (userData.trim() != 0) {
    // If the user not entered anything rather than whitespaces
    addBtn.classList.add("active"); // Adding the active class to addBtn
  } else {
    addBtn.classList.remove("active"); // Else removing it
  }
};

showTasks();

// When the user clicks on addBtn
addBtn.onclick = () => {
  let userData = inputBx.value;
  let getLocalStorage = localStorage.getItem("New Todo"); // Getting the localstorage

  // if getLocalStorage returns null
  if (getLocalStorage === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }

  listArr.push(userData);
  localStorage.setItem("New Todo", JSON.stringify(listArr));

  showTasks();
};

clearAllBtn.onclick = () => {
  let getLocalStorage = localStorage.getItem("New Todo"); // Getting the localstorage

  // if getLocalStorage returns null
  if (getLocalStorage === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }

  listArr = [];
  showTasks();
};

function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo"); // Getting the localstorage

  // if getLocalStorage returns null
  if (getLocalStorage === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }

  if (listArr.length > 0) {
    clearAllBtn.classList.add("active");
  } else {
    clearAllBtn.classList.remove("active");
    addBtn.classList.remove("active");
  }

  let newliTag = "";
  listArr.forEach((element, index) => {
    newliTag += `<li>${element} <span onclick="delTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });

  todoList.innerHTML = newliTag;

  inputBx.value = "";

  const pendingTask = document.querySelector(".pending");
  pendingTask.textContent = listArr.length;
}

// function to delete a task
function delTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo"); // Getting the localstorage
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1);

  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

clearAllBtn.onclick = () => {
  localStorage.setItem("New Todo", JSON.stringify([]));
  showTasks();
};
