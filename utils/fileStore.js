const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'tasks.json');

function loadTasks() {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading tasks.json", error);
    return [];
  }
}

function saveTasks(tasks) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error("Error saving tasks.json", error);
  }
}

module.exports = { loadTasks, saveTasks };
