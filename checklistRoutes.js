const express = require("express");
const Checklist = require("../models/Checklist");

const router = express.Router();

// Automatic checklist generation
router.post("/generate", async (req, res) => {
    try {
        const { role, department } = req.body;

        if (!role || !department) {
            return res.status(400).json({
                message: "Role and department are required"
            });
        }

        const tasks = [
            {
                title: "Complete HR documentation",
                completed: false
            },
            {
                title: "Create company email account",
                completed: false
            },
            {
                title: "Attend company orientation",
                completed: false
            },
            {
                title: `Complete ${department} introduction`,
                completed: false
            },
            {
                title: `Meet the ${role} team`,
                completed: false
            },
            {
                title: "Complete security training",
                completed: false
            }
        ];

        const checklist = await Checklist.create({
            role,
            department,
            tasks
        });

        res.status(201).json({
            message: "Checklist generated successfully",
            checklist
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to generate checklist",
            error: error.message
        });
    }
});

// Get all checklists
router.get("/", async (req, res) => {
    try {
        const checklists = await Checklist.find();

        res.status(200).json({
            message: "Checklists fetched successfully",
            checklists
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch checklists",
            error: error.message
        });
    }
});
// Update task completion status
router.put("/:checklistId/task/:taskId", async (req, res) => {
    try {
        const { checklistId, taskId } = req.params;
        const { completed } = req.body;

        const checklist = await Checklist.findById(checklistId);

        if (!checklist) {
            return res.status(404).json({
                message: "Checklist not found"
            });
        }

        const task = checklist.tasks.id(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        task.completed = completed;

        await checklist.save();

        res.status(200).json({
            message: "Task updated successfully",
            checklist
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update task",
            error: error.message
        });
    }
});
// Get checklist progress
router.get("/:checklistId/progress", async (req, res) => {
    try {
        const { checklistId } = req.params;

        const checklist = await Checklist.findById(checklistId);

        if (!checklist) {
            return res.status(404).json({
                message: "Checklist not found"
            });
        }

        const totalTasks = checklist.tasks.length;

        const completedTasks = checklist.tasks.filter(
            task => task.completed === true
        ).length;

        const remainingTasks = totalTasks - completedTasks;

        const progressPercentage = totalTasks === 0
            ? 0
            : (completedTasks / totalTasks) * 100;

        res.status(200).json({
            message: "Progress fetched successfully",
            totalTasks,
            completedTasks,
            remainingTasks,
            progressPercentage: Number(progressPercentage.toFixed(2))
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch progress",
            error: error.message
        });
    }
});
// Edit task title
router.put("/:checklistId/task/:taskId/edit", async (req, res) => {
    try {
        const { checklistId, taskId } = req.params;
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Task title is required"
            });
        }

        const checklist = await Checklist.findById(checklistId);

        if (!checklist) {
            return res.status(404).json({
                message: "Checklist not found"
            });
        }

        const task = checklist.tasks.id(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        task.title = title;

        await checklist.save();

        res.status(200).json({
            message: "Task edited successfully",
            checklist
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to edit task",
            error: error.message
        });
    }
});
module.exports = router;