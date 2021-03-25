//Default project / todo for initial display

let dummyProj = {
    title: "Sample Project",
    descrption: "What the project's about",
    items: [dummyObj],
}

let dummyObj = {
    title: "Sample ToDo Item", 
    description: "A short description",
    duedate: "01/02/2022",
    priority: "nuclear", 
    notes: "gotta finish this!",
}

//factory function to generate new projects 

function makeProject(title, description) {

    let items = []

    function addItemToProject(todo) {
        items.push(todo)
    }
    
    function deleteItem(todo) {
        let id = todo["title"]
        let index = items.indexOf(id)
        items.splice(index, 1)
    }
    
    function returnList() {
        return items
    }    

    return {title, description, items, returnList, deleteItem, addItemToProject}
}

export { makeProject }