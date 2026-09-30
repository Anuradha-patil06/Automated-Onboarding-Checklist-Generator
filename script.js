let currentChecklistId = null;


// Generate checklist
async function generateChecklist() {

    const role = document.getElementById("role").value;
    const department = document.getElementById("department").value;
    const message = document.getElementById("message");

    if (!role || !department) {
        message.innerText = "Please select role and department.";
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/checklist/generate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    role: role,
                    department: department
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            message.innerText =
                "Checklist generated successfully!";

            console.log(data);

            // Store checklist ID
            currentChecklistId = data.checklist._id;

            // Store checklist information
            localStorage.setItem(
                "checklist",
                JSON.stringify(data.checklist)
            );

            // Open Progress Dashboard page
            window.location.href =
                "progress.html";

        } else {

            message.innerText =
                data.message || "Something went wrong.";
        }

    } catch (error) {

        console.error(error);

        message.innerText =
            "Unable to connect to the server.";
    }
}