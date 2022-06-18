const draggableList = document.querySelector("#draggable-list");
const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Carlos Slim Helu",
  "Bernard Arnault",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zukerberg",
  "Micheal Bloomberg",
  "Larry Page",
];

// store list
const listItems = [];
let dragStartIndex;

createList();

// createList and add event listeners

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.className = "row bg-white m-0";
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
      <span class="number bg-dark d-flex align-items-center justify-content-center text-white">${
        index + 1
      }</span>
      <div class="draggable d-flex align-items-center justify-content-between" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;
      listItems.push(listItem);
      draggableList.append(listItem);
    });

  addEventListeners();
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

// drag events

function dragStart() {
  dragStartIndex = this.closest("li").getAttribute("data-index");
}

function dragDrop() {
  const dragEndIndex = this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

// swapping items

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}
