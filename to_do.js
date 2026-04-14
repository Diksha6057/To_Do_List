document.addEventListener("DOMContentLoaded", function () {

    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const filterButtons = document.querySelectorAll(".filter-btn");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];    //  localStorage Browser memory that saves data permanently.JSON.parse() Converts text → back to array.Because localStorage only stores strings.

    // Save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Render Tasks
    function showTasks(filter = "all") //Default value.If no filter given → show all tasks.
    {
        taskList.innerHTML = "";  //Clears old list. Why?So it doesn’t duplicate tasks. Clears all list items from screen.Before showing tasks again,we remove old tasks.Otherwise tasks will duplicate.

        tasks.forEach((task, index) => {    //Loop through each task.

            if (
                (filter === "active" && task.completed) ||
                (filter === "completed" && !task.completed)
            ) {
                return;
            }

            const li = document.createElement("li"); //Creates new <li>.   Creates a new <li> element using JavaScript.Why used?Because tasks are added dynamically.They are not written in HTML manually.
            li.className = "list-group-item";//bs Adds Bootstrap style.

            const span = document.createElement("span");
            span.textContent = task.text; //Displays task text.
            span.className = "task-text"; //Adds CSS class.
            if (task.completed) {
                span.classList.add("completed");  //if task completed → add line-through style.
            }

            // Toggle Completion
            span.addEventListener("click", function () {  //When task text is clicked:
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                showTasks(filter);
            });

            // Delete Button
            const deleteBtn = document.createElement("button"); //Creates button.
            deleteBtn.textContent = "X";
            deleteBtn.className = "btn btn-sm btn-danger";

            deleteBtn.addEventListener("click", function () {
                tasks.splice(index, 1);  //Removes 1 task at that position.  What does splice() do?Removes elements from array.
                saveTasks();
                showTasks(filter);
            });

            li.appendChild(span);
            li.appendChild(deleteBtn);
            taskList.appendChild(li); //adds content inside that HTML
        });
    }

    // Add Task
    addTaskBtn.addEventListener("click", function () {  //When Add button clicked:
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        tasks.push({   //What does push() do?Adds element to array.
            text: taskText,
            completed: false
        });

        saveTasks();
        showTasks();
        taskInput.value = "";
    });

    // Filter Tasks
    filterButtons.forEach(button => {  //Loop through 3 buttons.
        button.addEventListener("click", function () {
            const filter = this.getAttribute("data-filter");  //Gets value: all / active / completed
           showTasks(filter);  //shows tasks according to filter.
        });
    });

    // Initial Render
    showTasks();  //When page loads → show saved tasks.
});