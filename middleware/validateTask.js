const validStatuses = ["pending", "in-progress", "completed"];

function validateCreate(req, res, next) {
  const { title, description, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "title and description are required"
    });
  }

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status value" });
  }

  next();
}

function validateUpdate(req, res, next) {
  const { status } = req.body;

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status value" });
  }

  next();
}

module.exports = { validateCreate, validateUpdate };
