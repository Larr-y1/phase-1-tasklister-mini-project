document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("#form");
  let formInput = document.querySelector("#description");

  // Load tasks from localStorage
  loadTasks();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let task = formInput.value.trim();

    if (task !== "") {//Empty tasks are not added in which it removes spaces and prevents empty strings from being saved.
      saveTask(task);   // Saves task to localStorage
      createTask(task); // Displays task in the UI
      form.reset();     // Clears the input field
    }
  });
});


  function createTask(task) {
    let taskList = document.querySelector("#tasks");
    let li = document.createElement("li");
    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");

    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", handleDelete);
   
    editBtn.textContent = "edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => editTask(task));

    li.textContent = `${task} `;
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  function handleDelete(e) {
    let taskText = e.target.parentNode.textContent.slice(0, -2); // Remove ' x'
    e.target.parentNode.remove();
    removeTask(taskText);
 
  }

  function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; //Retrieves the current list from localStorage
    tasks.push(task);//Adds the new task to the array
    localStorage.setItem("tasks", JSON.stringify(tasks));//Stores the updated list back in localStorage
  }
  
  function loadTasks() {
    //Ensures tasks persist after page refresh
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];//Retrieves saved tasks from localStorage
    tasks.forEach(createTask);//Calls createTask(task) for each stored task
  }

  function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];//Retrieves tasks from localStorage
    tasks = tasks.filter(t => t !== task); //Filters out the task that needs to be removed
    localStorage.setItem("tasks", JSON.stringify(tasks));//Saves the updated list back to localStorage
  }

  function editTask(oldTask) {
    let newTask = prompt("Edit Task:", oldTask);// Prompt user for new task name
    if (newTask && newTask.trim() !== "") {
      // Find and replace the old task with the new task
      removeTask(oldTask);
      saveTask(newTask.trim()); // Save the updated task list in localStorage
      document.querySelector("#tasks").textContent = ""; // Clear list
      loadTasks(); // Reload tasks from storage
    }
  }

