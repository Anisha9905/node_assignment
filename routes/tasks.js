const express = require('express');
const router = express.Router();
const { validateCreate, validateUpdate } = require('../middleware/validateTask');

// ------------------------------------
// Pre-loaded tasks when server starts
// ------------------------------------
let tasks = [
  {
    id: 1,
    title: "Water the plants",
    description: "Water all indoor plants with 1 liter each",
    status: "pending",
    createdAt: "2025-01-10T10:00:00Z"
  },
  {
    id: 2,
    title: "Buy fertilizer",
    description: "Purchase 5kg nitrogen-rich organic fertilizer",
    status: "in-progress",
    createdAt: "2025-01-12T08:30:00Z"
  },
  {
    id: 3,
    title: "Clean garden tools",
    description: "Clean pruning shears and spray bottles",
    status: "completed",
    createdAt: "2025-01-15T12:45:00Z"
  }
];

// Auto-increment id
let nextId = 4;

// ------------------------------------
// CREATE task
// ------------------------------------
router.post('/', validateCreate, (req, res, next) => {
  try {
    const { title, description, status = 'pending' } = req.body;

    const newTask = {
      id: nextId++,
      title,
      description,
      status,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);

    res.status(201).json({
      success: true,
      message: "Task created",
      data: newTask
    });
  } catch (err) {
    next(err);
  }
});

// ------------------------------------
// GET all tasks (with filters)
// ------------------------------------
router.get('/', (req, res, next) => {
  try {
    let result = [...tasks];
    const { status, sort } = req.query;

    if (status) {
      result = result.filter(t => t.status === status);
    }

    if (sort === "asc" || sort === "desc") {
      result.sort((a, b) => {
        const cA = new Date(a.createdAt);
        const cB = new Date(b.createdAt);
        return sort === "asc" ? cA - cB : cB - cA;
      });
    }

    res.status(200).json({
      success: true,
      message: "Tasks retrieved",
      data: result
    });

  } catch (err) {
    next(err);
  }
});

// ------------------------------------
// GET one task by ID
// ------------------------------------
router.get('/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task retrieved",
      data: task
    });

  } catch (err) {
    next(err);
  }
});

// ------------------------------------
// UPDATE task
// ------------------------------------
router.put('/:id', validateUpdate, (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    const { title, description, status } = req.body;

    if (title !== undefined) tasks[index].title = title;
    if (description !== undefined) tasks[index].description = description;
    if (status !== undefined) tasks[index].status = status;

    res.status(200).json({
      success: true,
      message: "Task updated",
      data: tasks[index]
    });

  } catch (err) {
    next(err);
  }
});

// ------------------------------------
// DELETE task
// ------------------------------------
router.delete('/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    tasks.splice(index, 1);

    res.status(200).json({
      success: true,
      message: "Task deleted"
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
