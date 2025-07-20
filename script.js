// Initialize global variable to hold todo elements
let mytodoelements = null;

/**
 * Fetch todo items from localStorage.
 * If no items are stored yet, return an empty array.
 */
function getLocalElement() {
    let ElementsList = localStorage.getItem("todoItems");
    let parsedList = JSON.parse(ElementsList);
    if (parsedList === null) {
        return [];
    }
    return parsedList;
}

// Load existing todos into the variable when the page loads
mytodoelements = getLocalElement();

// Get reference to the input box for entering new tasks
let taskInput = document.getElementById("todoUserInput");

// Initialize unique number for new tasks, so each has a unique ID
let uniqueNo = mytodoelements.length;

/**
 * Handle deletion of a todo item.
 * - Remove the list item from the DOM
 * - Remove the item from the array of todos
 */
function onclickDelete(mainId, listId, todo) {
    let mainContainer = document.getElementById(mainId);
    let subContainer = document.getElementById(listId);
    mainContainer.removeChild(subContainer);
    let todoIndex = mytodoelements.findIndex(function(eachitem) {
        if (eachitem === todo) {
            return true;
        }
        return false;
    });
    mytodoelements.splice(todoIndex, 1);
}

// Get reference to the Save button
let saveBtnElement = document.getElementById("save-button");

// Save the current state of todo items to localStorage when Save button is clicked
saveBtnElement.onclick = function() {
    localStorage.setItem("todoItems", JSON.stringify(mytodoelements));
    getLocalElement();
};

/**
 * Creates a new todo list item in the DOM.
 * This includes:
 * - A checkbox to mark it complete
 * - A label with the todo text
 * - A delete icon to remove the item
 */
function mytodoelementsList(todo) {
    let mainContainer = document.getElementById("todoItemsContainer");

    // Create <li> element for the todo item
    let listContainer = document.createElement("li");
    let listId = "list" + todo.uniqueNo;
    listContainer.id = listId;
    listContainer.classList.add("todo-item-container", "d-flex", "flex-row");
    mainContainer.appendChild(listContainer);

    // Create checkbox input
    let inputCheckBox = document.createElement("input");
    let inputId = "checkBox" + todo.uniqueNo;
    inputCheckBox.type = "checkBox";
    inputCheckBox.id = inputId;
    inputCheckBox.classList.add("checkbox-input");
    listContainer.appendChild(inputCheckBox);

    // Create container for label and delete icon
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    listContainer.appendChild(labelContainer);

    // Create the label with the todo text
    let labelElement = document.createElement("label");
    labelElement.textContent = todo.text;
    let labelId = "label" + todo.uniqueNo;
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.setAttribute("for", inputId);

    // If the todo was marked complete earlier, keep it checked
    if (todo.isChecked === true) {
        labelElement.classList.add("selected-label");
        inputCheckBox.checked = true;
    }
    labelContainer.appendChild(labelElement);

    // Create a container for the delete icon
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    // Add the trash icon for deleting the todo
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);

    // Handle deletion when the trash icon is clicked
    deleteIconContainer.onclick = function() {
        onclickDelete(mainContainer.id, listId, todo);
    };

    // Toggle the completed state when checkbox is clicked
    inputCheckBox.onclick = function() {
        labelElement.classList.toggle("selected-label");
        if (todo.isChecked === true) {
            todo.isChecked = false;
        } else {
            todo.isChecked = true;
        }
    };
}

// Get reference to the Add button
let addtodo = document.getElementById("addtodo");

// Handle adding a new todo when Add button is clicked
addtodo.onclick = function() {
    // Prevent adding empty todos
    if (taskInput.value === "") {
        alert("bruh....Don't try anything beyond");
        return;
    }

    // Create a new todo object
    uniqueNo = uniqueNo + 1;
    let todoObject = {
        text: taskInput.value,
        uniqueNo: uniqueNo,
        isChecked: false
    };

    // Clear the input box
    taskInput.value = "";

    // Add the new todo to the array and render it on the page
    mytodoelements.push(todoObject);
    mytodoelementsList(todoObject);
};

// Render all existing todos on page load
for (let i of mytodoelements) {
    mytodoelementsList(i);
}
