
import { testFactoryObj3, firstFolder, setPositionDataAttribute, setContainerType, logContentChange} from "./index.js"
import { makeProject } from "./project.js"
import { todoFactory } from "./item.js"

const pageBody = document.querySelector("body")
const navContainer = document.getElementById("navContainer")
const projectContainer = document.getElementById("container");
const priorities = ["Low", "Medium", "High", "Nuclear"]

// Module for handling edit clicks

const clickEditController = (function() {

    let activeEditedNode

    //only invoked if todo clicked on

    function handleTodoClick(event) {

        if (!activeEditedNode) {
            activeEditedNode = event.target
            let inputBox = replaceInput(event)
            activeEditedNode = inputBox;
            addClickElsewhereListener()
        }

        else if (event.target === activeEditedNode) {
            return 
        }

        else if (!(event.target === activeEditedNode)) {
            submitCurrentToDoValue(activeEditedNode)
            activeEditedNode = event.target
            let inputBox = replaceInput(event)
            activeEditedNode = inputBox;
            addClickElsewhereListener()
        }
        else {
            console.log("end of todo handle Click event reached")
        }

    }

    //this filters out non-editable events 

    function addClickElsewhereListener() {
        document.addEventListener("click", clickElsewhereListener)
    }

    function clickElsewhereListener(e) {
        if (e.target === activeEditedNode) {
            return
        }
        else if (isEditable(e.target)) { 

            console.log("Program thinks clicked thing is editable and will initiate handle todo click")
            //if its another todo, remove event listener then handle 
            handleTodoClick(e)
        }
        else {
            console.log("clicked elsewhere")    
        }
    }

    function submitCurrentToDoValue(node) {

        let parentProjectPosition = getPosition(node.closest("[data-type=project]"))
        let todoPosition = getPosition(node.closest("[data-type=todo]"))
        let itemtype = node.getAttribute("data-itemtype")
        let currentTodoValue = node.value 

        submitNewTodoItem(parentProjectPosition, todoPosition, currentTodoValue, itemtype)

    }


    function isEditable(event) {
        if (event.closest("[data-type=todo]")) {
            return true 
        }
        else {
            return false 
        }

    }

    function replaceInput (event) {
        // extract the data-itemtype
        let itemtype = event.target.getAttribute("data-itemtype")
    
        // find the parent node
        let parent = event.target.parentElement
    
        // create an input of the correct type 
        let tempInput = createInputByType(itemtype)
        tempInput.setAttribute("value", event.target.innerHTML)
    
        // replace the target element with the new input
        parent.replaceChild(tempInput, event.target)

        return tempInput
}
    function testerLog(){
        console.log("ieff module initiated")
    }
    
    return {
        handleTodoClick, testerLog
    }

})()

clickEditController.testerLog()

// Node creation at ToDo, Project, and Folder (all projects) level 


function makeToDoItemNode(toDoItem) {
        let listItem = document.createElement("li")
        listItem.textContent = toDoItem;
        listItem.addEventListener("click", clickEditController.handleTodoClick)
        return listItem
} 

function makeToDoObjectNode(toDoObject) {

    let toDoContainer = document.createElement("div");
    
    // this should only append the function to replace each node w/ a click to change 

    for (let key in toDoObject) {

        if (key === "pos") continue;

        // else if (key === "priority") {
        //     let listItem = makeToDoItemNode(toDoObject[key])
        //     listItem.setAttribute("data-itemtype", key)
        //     toDoContainer.appendChild(listItem)
        // }

        else {
            let listItem = makeToDoItemNode(toDoObject[key])
            listItem.setAttribute("data-itemtype", key)
            toDoContainer.appendChild(listItem)
        }
        
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
    addButtonByType(projectNode, "Add ToDo", displayAddTodoForm)

    setPositionDataAttribute(projectNode, project)
    setContainerType(projectNode, "project")

    // let number = document.createElement("h3")
    // number.textContent = project["pos"]
    // projectNode.appendChild(number)
    
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
    addButtonByType(nav, "Display All Projects", logContentChange)

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

function returnParentProjectNode(event) {
    let projectNode = event.target.closest("[data-type=project]")
    return projectNode
}

function returnTodoNode(event) {
        let todoNode = event.target.closest("[data-type=todo]")
        return todoNode
}

function submitNewTodoItem(parentPos, todoPos, newValue, type) {
    firstFolder.editTodoItem(parentPos, todoPos, newValue, type)
}

// CSS functions

function toggleNavHighlight(node) {
    node.classList.toggle('selectedProject')
}

function toggleFormView() {

}

// buttons & click functions 

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

function addProject(event) {

    event.preventDefault()

    let form = event.target.parentElement

    let array = getFormValues(form)

    let title, description
    [title, description] = [...array]

    // dependent on knowing a lot about how the objects are made. Positional dependency 

    let project = makeProject(title, description)
    firstFolder.addProjectToList(project)

    logContentChange()
}

function addTodo(event) {
    event.preventDefault()

    let projectNode = returnParentProjectNode(event)
    let index = getPosition(projectNode)

    let form = event.target.parentElement
    let valuesArray = getFormValues(form)

    let title, description, duedate, priority, notes
    [title, description, duedate, priority, notes] = [...valuesArray]

    let projectObject = firstFolder.returnProjectFromIndex(index)

    let todo = todoFactory(title, description, duedate, priority, notes)


    projectObject.addItemToProject(todo)

    //this is causing a adding a single todo to a single project view to add then re-render whole lsit 

    logContentChange()

}



//Project form functions 

function displayAddProjectForm(event) {
 
    // create form node inclduing add project button 
    let formNode = createAddProjectForm()

    // add unseen class 

    // append the node to the body 
    navContainer.appendChild(formNode)

    // toggle the unseen class
}

function createAddProjectForm() {
    let form = document.createElement("form")
    form.setAttribute("name", "project-inputs")

    let inputs = ["title", "description"]

    inputs.forEach(input => {
        form.appendChild(createInputByType(input))
    })

    // add button that connects to add Project 

    addButtonByType(form, "Submit", addProject)

    return form 
}

//Todo form functions 
function createAddTodoForm() {
    let form = document.createElement("form")
    form.setAttribute("name", "todo-inputs")

    let fields = ["title", "description", "duedate", "priority", "notes"]

    fields.forEach(field => {
        let inputNode = createInputByType(field)
        form.appendChild(inputNode)
    })

    // add button that connects to add Project 

    addButtonByType(form, "Submit", addTodo)

    return form 
}

function displayAddTodoForm(event) {
    let formNode = createAddTodoForm()

    let projectContainer = returnParentProjectNode(event)

    projectContainer.appendChild(formNode)
}


// utility form functions 


function createInputByType(type) {

    if (type === "title" | type === "description" | type === "notes") {
        let input = document.createElement("input")
        input.setAttribute("data-itemtype", type)
        input.setAttribute("type", "text")
        input.setAttribute("placeholder", type)
        input.setAttribute("value", "")
        input.setAttribute("name", "project-inputs")
        return input 
    }

    else if (type === "duedate") {
        let input = document.createElement("input")
        input.setAttribute("data-itemtype", type)
        input.setAttribute("type", "date")
        input.setAttribute("value", "")
        input.setAttribute("name", "project-inputs")
        return input
    }

    else if (type === "priority") {
        let selector = document.createElement("select")
        selector.setAttribute("data-itemtype", type)
        selector.setAttribute("name", "priorities")
        selector.setAttribute("id", "priorities")

        priorities.forEach(level => {
                let option = document.createElement("option");
                option.setAttribute("value", level)
                option.textContent = level
                selector.appendChild(option)
            })
        return selector; 
        }

    else {
        console.log('invalid input type')
    }
    
}

function getFormValues(formNode) {
    let childNodes = Array.from(formNode.childNodes)
    return childNodes.reduce((acc, ele) => {
            if(ele.value) {
                acc.push(ele.value)
            }
            return acc
        }, [])

}



export { makeProjectNode, 
        makeProjectsFolder, 
        makeToDoObjectsFromArray, 
        renderProjects, 
        makeNavItem, 
        renderNavAndProjects,
    }