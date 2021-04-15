
import { addPositionProperty, setPositionDataAttribute } from "./index.js"

// Node creation at ToDo, Project, and Folder (all projects) level 

function makeToDoItemNode(toDoItem) {
        let listItem = document.createElement("li")
        listItem.textContent = toDoItem;
        return listItem
}

function makeToDoObjectNode(toDoObject, index) {

    let toDoContainer = document.createElement("div");
    
    for (let key in toDoObject) {
        let listItem = makeToDoItemNode(toDoObject[key])
        listItem.setAttribute("data-itemtype", key)
        toDoContainer.appendChild(listItem)
    }

    addDeleteButton(toDoContainer)
    setPositionDataAttribute(toDoContainer, toDoObject)

    return toDoContainer
}

function makeToDoObjectsFromArray(listArray) {
    let nodes = listArray.map(makeToDoObjectNode)
    return nodes 
}

function makeProjectNode(project, index) {

    let projectNode = document.createElement("div");

    let title = document.createElement("h1")
    title.textContent = project["title"]
    projectNode.appendChild(title)

    let description = document.createElement("h2")
    description.textContent = project["description"]
    projectNode.appendChild(description)

    setPositionDataAttribute(projectNode, project)

    // could abstract this by adding a parameter that accepted a function as a node generator, but the specific implementation is fine for now
    
    let toDoArray = project.returnList()
    let toDoNodes = makeToDoObjectsFromArray(toDoArray)
    toDoNodes.forEach(node => projectNode.appendChild(node))

    return projectNode
}

function makeProjectsFolder(arrayOfProjects) {
    let folder = document.createElement("div")
    let arrayOfProjectNodes = arrayOfProjects.map(project => makeProjectNode(project))
    arrayOfProjectNodes.forEach(node => folder.appendChild(node))
    return folder 
}

//Event listeners!

function addDeleteButton(containerNode) {
    let deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete"
    containerNode.appendChild(deleteButton)
    deleteButton.addEventListener("click", deleteEvent)
}

function deleteEvent(event) {
    console.log(event)
    let containerDiv = event.target.parentElement
    let indexNumber = containerDiv.getAttribute("data-pos")
    console.log(indexNumber)
}


export { makeProjectNode , makeProjectsFolder, makeToDoObjectsFromArray }