let dummyObj = {
    title: "Sample ToDo Item", 
    description: "A short description",
    duedate: "01/02/2022",
    priority: "nuclear", 
    notes: "gotta finish this!",
}

let dummyObj2 = {
    title: "Second Sample", 
    description: "A short description",
    duedate: "10/20/2022",
    priority: "regular", 
    notes: "when time warrants",
}

let dummyProj = {
    title: "Sample Project",
    descrption: "What the project's about",
    items: [dummyObj, dummyObj2],
}

// Node creation at ToDo, Project, and Folder (all projects) level 

function makeToDoItemNode(toDoItem) {
        let listItem = document.createElement("li")
        listItem.textContent = toDoItem;
        return listItem
}

function makeToDoObjectNode(toDoObject) {
    let toDoContainer = document.createElement("div");
    for (key in toDoObject) {
        toDoContainer.appendChild(makeToDoItemNode(toDoObject[key]))
    }
    return toDoContainer
}

function makeToDoObjectsFromArray(listArray) {
    let nodes = listArray.map(makeToDoObjectNode)
    return nodes 
}

function makeProjectNode(project) {
    let projectNode = document.createElement("div");

    let title = document.createElement("h1")
    title.textContent = project["title"]
    projectNode.appendChild(title)

    let description = document.createElement("h2")
    description.textContent = project["description"]
    projectNode.appendChild(description)

    // could abstract this by adding a parameter that accepted a function as a node generator, but the specific implementation is fine for now
    
    let toDoArray = project["items"]
    let toDoNodes = makeToDoObjectsFromArray(toDoArray)
    toDoNodes.forEach(node => projectNode.appendChild(node))

    return projectNode
}

function makeProjectsFolder (arrayOfProjects) {
    let folder = document.createElement("div")
    let arrayOfProjectNodes = arrayOfProjects.map(project => makeProjectNode(project))
    arrayOfProjectNodes.forEach(node => folder.appendChild(node))
    return folder 
}



export { makeProjectNode , makeProjectsFolder, makeToDoObjectsFromArray }