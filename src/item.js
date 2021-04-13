// factory that creates the todo object 

let dummyObj = {
    title: "Sample ToDo Item", 
    description: "A short description",
    duedate: "01/02/2022",
    priority: "nuclear", 
    notes: "gotta finish this!",
}

const todoFactory = function(title, description, duedate, priority, notes) {

    let todoItem = {title, description, duedate, priority, notes}

    return todoItem
}


function setPriority(todo, priority) {
    todo["priority"] = priority
}

function setDescription(todo, description) {
    todo["description"] = description
}

function setDate(todo, date) {
    todo["duedate"] = date
}

function setNotes(todo, note) {
    todo["notes"] = note
}

function setTitle(todo, title) {
    todo["title"] = title
}

export { todoFactory }