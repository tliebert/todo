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

function makeToDoNodes(listArray) {
    let nodes = listArray.map(makeNode)

    function makeNode(toDoObject) {
        let container = document.createElement("div");
        for (key in toDoObject) {
            let listItem = document.createElement("li")
            listItem.textContent = toDoObject[key]
            container.appendChild(listItem)
        }
        return container
    }
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
    let toDoNodes = makeToDoNodes(toDoArray)
    toDoNodes.forEach(node => projectNode.appendChild(node))

    return projectNode
}

function makeProjectsFolder (arrayOfProjects) {
    let folder = document.createElement("div")
    arrayOfProjects.forEach(folder.appendChild)
}

export { makeProjectNode }