
import { set } from "date-fns";
import { firstFolder, setPositionDataAttribute, setContainerType} from "./index.js"

const projectContainer = document.getElementById("container");

// Node creation at ToDo, Project, and Folder (all projects) level 

function makeToDoItemNode(toDoItem) {
        let listItem = document.createElement("li")
        listItem.textContent = toDoItem;
        return listItem
}

function makeToDoObjectNode(toDoObject) {

    let toDoContainer = document.createElement("div");
    
    for (let key in toDoObject) {
        let listItem = makeToDoItemNode(toDoObject[key])
        listItem.setAttribute("data-itemtype", key)
        toDoContainer.appendChild(listItem)
    }

    addButtonByType(toDoContainer, "Delete", deleteEvent)
    setPositionDataAttribute(toDoContainer, toDoObject)
    setContainerType(toDoContainer, "todo")

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

    addButtonByType(projectNode, "Delete", deleteEvent)
    setPositionDataAttribute(projectNode, project)
    setContainerType(projectNode, "project")
    
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

function addButtonByType(containerNode, buttonText, clickFunction) {
    let button = document.createElement("button")
    button.innerText = buttonText;
    containerNode.appendChild(button)
    button.addEventListener("click", clickFunction)
}

//page rendering functions 

function removeAllNodes(container) {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild)
    }
}

function makeNavbar(arrayOfProjects) {
    let nav = document.createElement("nav") 
    arrayOfProjects.forEach(item => nav.appendChild(makeNavItem(item)))
}

function makeNavItem(project) {
    let proj = document.createElement("div")
    proj.innerText = project["title"]
    setPositionDataAttribute(proj, project)
    proj.addEventListener("click", displayProject)
    return proj
}

function displayProject(node) {
    node.classList.toggle('selectedProject')
}

function renderSingleProject(project) {

}
    

function renderProjects(arrayOfProjects) {
    removeAllNodes(projectContainer);
    let allProjectNodes = makeProjectsFolder(arrayOfProjects);
    projectContainer.appendChild(allProjectNodes)
}

//event listener functions 

function deleteEvent(event) {
    let containerDiv = event.target.parentElement;
    firstFolder.deleteEntry(containerDiv)
    renderPage()
}

function addToDo() {

}

//form functions 

function addForm(container) {

}

function getFormValues() {

}

export { makeProjectNode, 
        makeProjectsFolder, 
        makeToDoObjectsFromArray, 
        renderProjects 
    }