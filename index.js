const todoInput = document.querySelector("#todoInput");
const todoAdd = document.querySelector("#todoAdd");
const todoContainer = document.querySelector("#todoContainer");
const clearBtn = document.querySelector("#clear");
const error = document.querySelector("#error")
const todoListContainer = document.querySelector("#list")
const todoSearch = document.querySelector("#todoSearch")
const nothing = document.querySelector("#nothing")
let todoList = [];
//gets html elements

//gets stored data in localstorage
if (localStorage.length >= 1) {
  let saved = JSON.parse(localStorage.getItem("list"));
  saved.forEach((e) => {
    todoList.push(e);
    addList();
  });
  console.log(todoList);
}

//detects if user presses enter and starts addInitial()
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
   addInitial()
  }
})

//detects if use presses the todoAdd button and starts addInitial()
todoAdd.addEventListener("click", () => {
  addInitial()
})

//checks if input has text, if it doesnt it returns the function and displays error message
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
  //pushes both input value and date which acts as id to array for storage
  let itemId = Date.now()
  todoList.push({ text: todoInput.value, id: itemId });
  addList();
};
//creates li and span, pushes array.text to li textcontent and array.id for its id. pushes array.id into span for its textcontent
function addList() {
  const todoElement = document.createElement("li");
  const todoDate = document.createElement("span")
  //for each that that appends list element to list container, converts array.id to date and adds it as text to span, adds array.text to list element, adds id to list element, sets items in localstorage and removes value from input for each item in the array, mostly used when rendering stored localstorage items
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
  //removes element by way of index and splice, set updated array in localstorage
  todoElement.addEventListener("click", function() {
    let index = (todoList) => todoList.id == todoElement.id
    let removeIndex = todoList.findIndex(index)
    todoList.splice(removeIndex, 1)
    console.log(todoList)
    todoElement.remove();
    todoDate.remove()
    localStorage.setItem("list", JSON.stringify(todoList));
  });
  //clears entire array, localstorage and html elements
  clearBtn.addEventListener("click", function () {
    localStorage.clear();
    todoList = [];
    todoListContainer.removeChild(todoElement);
  });
}
//creates array from all li elements currently on page and indexes with search input value to find the html element with matching text
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



