import { todoFactory } from "./item.js"
import { makeProject } from "./project.js"
import { projectsFolder } from "./overview.js"
import { renderNavAndProjects } from "./dom.js"

let firstFolder = projectsFolder()

// Dummy objects for initial page render. 

let testFactoryProj = makeProject("FactoryTestHeader", "firstDescription")
let testFactoryObj = todoFactory("my title", "my description", "the duedate", "top priority", "notes")
testFactoryProj.addItemToProject(testFactoryObj)
firstFolder.addProjectToList(testFactoryProj)


// utility functions to use in each of the individual modules for todo lists, project lists and the app overview

function removeItemFromArray(item, array) {
    let index = array.indexOf(item)
    array.splice(index, 1)
}

function addItemToArray(item, array) {
    array.push(item)
}

function addPositionProperty(object, position) {
    object["pos"] = position;
}

function setPositionDataAttribute(containerNode, object) {
    containerNode.setAttribute("data-pos", object["pos"])
}

function setContainerType(containerNode, type) {
    containerNode.setAttribute("data-type", type)
}

const firstRender = function() {
    let folder = firstFolder.returnList()
    renderNavAndProjects(folder)
}

function logDelete() {
    firstRender()
}

firstRender()


export {  
            firstFolder, 
            removeItemFromArray, 
            addItemToArray, 
            addPositionProperty, 
            setPositionDataAttribute, 
            setContainerType,
            logDelete
    }