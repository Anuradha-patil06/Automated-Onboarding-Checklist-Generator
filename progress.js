// Get saved checklist
const checklist = JSON.parse(
    localStorage.getItem("checklist")
);


// Check whether checklist exists
if (!checklist) {

    alert("No checklist found.");

    window.location.href = "index.html";

} else {

    // Display tasks
    displayTasks(checklist.tasks);

    // Load progress
    getProgress();
}


// Display checklist tasks
function displayTasks(tasks) {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const taskItem =
            document.createElement("div");

        taskItem.className = "task";

        taskItem.innerHTML = `
            <div class="task-left">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="updateTask('${task._id}', this.checked)"
                >

                <span class="task-title">
                    ${index + 1}. ${task.title}
                </span>

            </div>

            <button
                class="edit-btn"
                onclick="editTask('${task._id}', '${task.title.replace(/'/g, "\\'") }')"
            >
                Edit
            </button>
        `;

        taskList.appendChild(taskItem);
    });
}


// Update task completion
async function updateTask(taskId, completed) {

    try {

        const response = await fetch(
            `http://localhost:5000/api/checklist/${checklist._id}/task/${taskId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    completed: completed
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            console.log("Task updated successfully");

            // Update local checklist
            const task = checklist.tasks.find(
                task => task._id === taskId
            );

            if (task) {
                task.completed = completed;
            }

            // Save updated checklist
            localStorage.setItem(
                "checklist",
                JSON.stringify(checklist)
            );

            // Refresh progress
            getProgress();

        } else {

            console.error(data.message);

        }

    } catch (error) {

        console.error(
            "Error updating task:",
            error
        );
    }
}


// Get checklist progress
async function getProgress() {

    try {

        const response = await fetch(
            `http://localhost:5000/api/checklist/${checklist._id}/progress`
        );

        const data = await response.json();

        if (response.ok) {

            document.getElementById(
                "totalTasks"
            ).innerText = data.totalTasks;

            document.getElementById(
                "completedTasks"
            ).innerText = data.completedTasks;

            document.getElementById(
                "remainingTasks"
            ).innerText = data.remainingTasks;

            document.getElementById(
                "progressPercentage"
            ).innerText = data.progressPercentage;


            // Update visual progress bar
            document.getElementById(
                "progressBarFill"
            ).style.width =
                data.progressPercentage + "%";

        } else {

            console.error(data.message);

        }

    } catch (error) {

        console.error(
            "Error fetching progress:",
            error
        );
    }
}


// Edit task
async function editTask(taskId, oldTitle) {

    const newTitle = prompt(
        "Enter the new task title:",
        oldTitle
    );

    // Cancel button
    if (newTitle === null) {
        return;
    }

    // Empty title
    if (newTitle.trim() === "") {

        alert("Task title cannot be empty.");

        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/checklist/${checklist._id}/task/${taskId}/edit`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: newTitle.trim()
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            console.log("Task edited successfully");

            // Update local checklist
            const task = checklist.tasks.find(
                task => task._id === taskId
            );

            if (task) {
                task.title = newTitle.trim();
            }

            // Save updated checklist
            localStorage.setItem(
                "checklist",
                JSON.stringify(checklist)
            );

            // Display updated tasks
            displayTasks(checklist.tasks);

        } else {

            alert(
                data.message ||
                "Failed to edit task."
            );
        }

    } catch (error) {

        console.error(
            "Error editing task:",
            error
        );

        alert(
            "Unable to connect to the server."
        );
    }
}


// Go back to role selection
function goBack() {

    window.location.href = "index.html";
}