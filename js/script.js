
// =====================================
// 1. ACADEMIC PLANNER
// =====================================

// Store academic tasks in an array
let tasks = JSON.parse(localStorage.getItem("academicTasks")) || [];

// Save tasks in the browser
function saveTasks() {
    localStorage.setItem("academicTasks", JSON.stringify(tasks));
}

// Display all tasks on the webpage
function displayTasks() {

    let taskList = document.getElementById("taskList");

    // Stop if this page does not have a task list
    if (!taskList) {
        return;
    }

    // Clear the current list before displaying tasks
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        // Create a list item
        let newTask = document.createElement("li");

        // Add the completed class when necessary
        if (task.completed) {
            newTask.classList.add("completed");
        }

        // Create the task text
        let taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.classList.add("task-text");

        newTask.appendChild(taskText);

        // Create the completion button
        let completeButton = document.createElement("button");

        completeButton.textContent = task.completed ? "Undo" : "Completed";
        completeButton.type = "button";

        completeButton.onclick = function() {

            // Change the completion status
            task.completed = !task.completed;

            saveTasks();
            displayTasks();
        };

        newTask.appendChild(completeButton);

        // Create the delete button
        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        deleteButton.onclick = function() {

            // Remove the selected task from the array
            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
        };

        newTask.appendChild(deleteButton);

        // Add the task to the list
        taskList.appendChild(newTask);
    });
}


// Add a new academic task
function addTask() {

    let taskInput = document.getElementById("taskInput");

    if (!taskInput) {
        return;
    }

    let task = taskInput.value.trim();

    // Prevent empty tasks
    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new task object
    let taskItem = {
        text: task,
        completed: false
    };

    // Add the task to the array
    tasks.push(taskItem);

    // Save and display the updated tasks
    saveTasks();
    displayTasks();

    // Clear the input field
    taskInput.value = "";
}


// Display saved tasks when the page loads
displayTasks();


// =====================================
// 2. CONTACT FORM VALIDATION
// =====================================

let contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        // Prevent the form from submitting automatically
        event.preventDefault();

        // Get the form information
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let message = document.getElementById("message").value.trim();

        let formMessage = document.getElementById("formMessage");

        // Check for empty fields
        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            message === ""
        ) {
            alert("Please fill in all fields!");
            return;
        }

        // Check email format
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address!");
            return;
        }

        // Check that the phone number contains digits only
        let phonePattern = /^[0-9]+$/;

        if (!phonePattern.test(phone)) {
            alert("Phone number must contain digits only!");
            return;
        }

        // Display a successful validation message
        if (formMessage) {
            formMessage.textContent =
                "Your message has passed validation successfully!";
        } else {
            alert("Your form has been validated successfully!");
        }

        // Clear the form
        contactForm.reset();

    });

}
