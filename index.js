const todoInput = document.querySelector("#todoInput");
const todoAdd = document.querySelector("#todoAdd");
const todoContainer = document.querySelector("#todoContainer");
const clearBtn = document.querySelector("#clear");
const error = document.querySelector("#error")
const todoListContainer = document.querySelector("#list")
const todoSearch = document.querySelector("#todoSearch")
const nothing = document.querySelector("#nothing")
let todoList = [];

if (localStorage.length >= 1) {
  let saved = JSON.parse(localStorage.getItem("list"));
  saved.forEach((e) => {
    todoList.push(e);
    addList();
  });
  console.log(todoList);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
   addInitial()
  }
})

todoAdd.addEventListener("click", () => {
  addInitial()
})

function addInitial() {
  if (todoInput.value === "") {
    error.classList.remove("hidden")
    error.classList.add("show")
    return
  }
  else if (error.classList.contains("show")) {
    error.classList.remove("show")
    error.classList.add("hidden")
  } else if (todoInput.value.toUpperCase() === "DOC" || todoInput.value.toUpperCase() === "DOCTOR DISRESPECT" || todoInput.value.toUpperCase() === "THE TWO TIME") {
    todoListContainer.remove()
    nothing.classList.remove("hidden")
    nothing.classList.add("show")
  }
  
  let itemId = Date.now()
  todoList.push({ text: todoInput.value, id: itemId });
  addList();
};

function addList() {
  const todoElement = document.createElement("li");
  const todoDate = document.createElement("span")
  todoList.forEach((e) => {
    let d = new Date(e.id)
    todoListContainer.append(todoElement);
    todoDate.textContent = ` ${d.toDateString()}`
    todoElement.textContent = `${e.text}`;
    todoElement.appendChild(todoDate)
    todoElement.id = `${e.id}`
    localStorage.setItem("list", JSON.stringify(todoList));
    todoInput.value = ""
  });
  todoElement.addEventListener("click", function() {
    let index = (todoList) => todoList.id == todoElement.id
    let removeIndex = todoList.findIndex(index)
    todoList.splice(removeIndex, 1)
    console.log(todoList)
    todoElement.remove();
    todoDate.remove()
    localStorage.setItem("list", JSON.stringify(todoList));
  });
  
  clearBtn.addEventListener("click", function () {
    localStorage.clear();
    todoList = [];
    todoListContainer.removeChild(todoElement);
  });
}

todoSearch.addEventListener("keyup", () => {
let searchInput = todoSearch.value.toUpperCase()
let li = todoContainer.getElementsByTagName("li")
let liArr = Array.from(li)
  
liArr.forEach((e) => {
  if (e.textContent.toUpperCase().indexOf(searchInput) > -1) {
    e.style.display = ""
  } else {
    e.style.display = "none"
  }
})
})



