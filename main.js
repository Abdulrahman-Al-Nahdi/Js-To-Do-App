// get the elements from html document
let input = document.querySelector(".wrapper .form .task-input");
let submmit = document.querySelector(".wrapper .form .submmit");
let inboxUl = document.querySelector(".wrapper .lists .inbox ul");
let favUl = document.querySelector(".wrapper .lists .fav ul");
let doneUl = document.querySelector(".wrapper .lists .done ul");

// lists
let inboxList = [];
let favList = [];
let doneList = [];

// ==================== Local Storage ====================

// حفظ البيانات في localStorage
function saveToLocalStorage() {
  localStorage.setItem("inboxList", JSON.stringify(inboxList));
  localStorage.setItem("favList", JSON.stringify(favList));
  localStorage.setItem("doneList", JSON.stringify(doneList));
}

// تحميل البيانات من localStorage
function loadFromLocalStorage() {
  inboxList = JSON.parse(localStorage.getItem("inboxList")) || [];
  favList = JSON.parse(localStorage.getItem("favList")) || [];
  doneList = JSON.parse(localStorage.getItem("doneList")) || [];

  // عرضها في الواجهة
  inboxUl.innerHTML = "";
  favUl.innerHTML = "";
  doneUl.innerHTML = "";

  inboxList.forEach((task) => createTask(task, inboxUl));
  favList.forEach((task) => createTask(task, favUl));
  doneList.forEach((task) => createTask(task, doneUl));
}

// ==================== Functions ====================

// click the ok button
submmit.addEventListener("click", function () {
  if (input.value !== "") {
    addTaskToInboxArray(input.value);
    input.value = "";
  }
});

// function to add the task to the inboxarray
function addTaskToInboxArray(taskText) {
  let task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  inboxList.push(task);
  addElementsToInboxList();
  saveToLocalStorage();
}

// function to create elements and add it to inbox ul
function addElementsToInboxList() {
  inboxUl.innerHTML = "";
  inboxList.forEach((ele) => {
    createTask(ele, inboxUl);
  });
}

function createTask(task, list) {
  // create main li
  let li = document.createElement("li");
  li.setAttribute("data-id", task.id);

  // span of task text
  let textSpan = document.createElement("span");
  textSpan.className = "task";
  textSpan.textContent = task.title;
  li.appendChild(textSpan);

  // create span to put the icons in
  let span = document.createElement("span");
  span.classList = "icons";
  li.appendChild(span);

  // delete button
  let deleteBtn = document.createElement("i");
  deleteBtn.classList.add("fa-solid", "fa-trash", "delete");
  span.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", function () {
    // احذف من المصفوفة المناسبة
    if (list === inboxUl) {
      inboxList = inboxList.filter((t) => t.id !== task.id);
    } else if (list === favUl) {
      favList = favList.filter((t) => t.id !== task.id);
    } else if (list === doneUl) {
      doneList = doneList.filter((t) => t.id !== task.id);
    }
    li.remove();
    saveToLocalStorage();
  });

  // favorites button
  let favBtn = document.createElement("i");
  favBtn.classList.add("fa-solid", "fa-star", "favorites");
  span.appendChild(favBtn);
  favBtn.addEventListener("click", function () {
    favList.push(task);
    createTask(task, favUl);
    inboxList = inboxList.filter((t) => t.id !== task.id);
    li.remove();
    saveToLocalStorage();
  });

  // done button
  let completeBtn = document.createElement("i");
  completeBtn.classList.add("fa-solid", "fa-square-check", "complete");
  span.appendChild(completeBtn);
  completeBtn.addEventListener("click", function () {
    doneList.push(task);
    createTask(task, doneUl);
    inboxList = inboxList.filter((t) => t.id !== task.id);
    li.remove();
    saveToLocalStorage();
  });

  list.appendChild(li);
}

// ==================== Init ====================
loadFromLocalStorage();
