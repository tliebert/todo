// factory that creates the todo object

const todoFactory = function (title, description, duedate, priority, notes) {
  let todoItem = {
    title: title,
    description: description,
    duedate: duedate,
    priority: priority,
    notes: notes,
  };

  return todoItem;
};

// explore how to refactor this into a single function with different parameters

function setPriority(todo, priority) {
  todo["priority"] = priority;
}

function setDescription(todo, description) {
  todo["description"] = description;
}

function setDate(todo, date) {
  todo["duedate"] = date;
}

function setNotes(todo, note) {
  todo["notes"] = note;
}

function setTitle(todo, title) {
  todo["title"] = title;
}

export { todoFactory };
