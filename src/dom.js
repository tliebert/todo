
import { set } from "date-fns";
import { testFactoryObj3, firstFolder, setPositionDataAttribute, setContainerType, logContentChange} from "./index.js"
import { makeProject } from "./project.js"


const pageBody = document.querySelector("body")
const navContainer = document.getElementById("navContainer")
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
    addButtonByType(projectNode, "Add ToDo", addTodo)

    setPositionDataAttribute(projectNode, project)
    setContainerType(projectNode, "project")

    let number = document.createElement("h3")
    number.textContent = project["pos"]
    projectNode.appendChild(number)
    
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

//navbar functions

function makeNavbar(arrayOfProjects) {
    let nav = document.createElement("nav") 
    arrayOfProjects.forEach(item => nav.appendChild(makeNavItem(item)))

    addButtonByType(nav, "Add Project", displayAddProjectForm)

    return nav;
}

function makeNavItem(project) {
    let proj = document.createElement("div")
    proj.innerText = project["title"]
    setPositionDataAttribute(proj, project)
    proj.addEventListener("click", displayProject)
    return proj
}

//page rendering functions 

function removeAllNodes(container) {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild)
    }
}

function displayProject(event) {
    let node = event.target;
    let position = getPosition(node)
    let activeProject = firstFolder.returnProjectFromIndex(position)
    renderSingleProject(activeProject)
}

// is this redundant with makeProjectNode above?

function renderSingleProject(project) {
    let projectNode = makeProjectNode(project)  
    removeAllNodes(projectContainer)
    projectContainer.appendChild(projectNode)
}

function renderProjects(arrayOfProjects, container) {
    let allProjectNodes = makeProjectsFolder(arrayOfProjects);
    container.appendChild(allProjectNodes)
}

function renderNavAndProjects(arrayOfProjects) {
    removeAllNodes(projectContainer);
    removeAllNodes(navContainer)
    let nav = makeNavbar(arrayOfProjects);
    navContainer.appendChild(nav)
    renderProjects(arrayOfProjects, projectContainer)
}

// returning data attributes. This functionality mainly happens in overview / firstFolder objeck, 
// but also for displaying single projects. 

function getPosition(node) {
    return node.getAttribute("data-pos")
}

function getType(node) {
    return node.getAttribute("data-type")
}

// CSS functions

function toggleNavHighlight(node) {
    node.classList.toggle('selectedProject')
}

function toggleFormView() {

}

// buttons

function addButtonByType(containerNode, buttonText, clickFunction) {
    let button = document.createElement("button")
    button.innerText = buttonText;
    containerNode.appendChild(button)
    button.addEventListener("click", clickFunction)
}

//event listener functions 

function deleteEvent(event) {

    // delete button should always be a direct child of either a project or todo container
    //labelled with type and position in the larger array
    // so this should send back the container node

    let containerDiv = event.target.parentElement;

    firstFolder.deleteEntry(containerDiv)
    
    logContentChange()
}

//form functions 

function displayAddProjectForm(event) {
 
    // create form node inclduing add project button 
    let nodeForm = createAddProjectForm()

    // add unseen class 

    // append the node to the body 

    // toggle the unseen class
}

function createAddProjectForm() {
    let form = document.createElement("form")

    // add button that connects to add Project 

    addButtonByType(form, "Submit", addProject)
}

// where should the factory go? For now, it's in DOM 

function getDataValuesFromEvent(event) {

}

function addProject(event) {
    [title, description] = [...array]
    console.log(title)
    console.log(description)
    let project = makeProject(title, description)
    firstFolder.addProjectToList(project)
}


function getFormValues() {

}

function displayAddTodoForm() {

}


function addTodo(event) {

}


//

export { makeProjectNode, 
        makeProjectsFolder, 
        makeToDoObjectsFromArray, 
        renderProjects, 
        makeNavItem, 
        renderNavAndProjects,
    }