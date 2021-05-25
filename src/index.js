import { todoFactory } from "./item.js"
import { makeProject } from "./project.js"
import { projectsFolder } from "./overview.js"
import { renderNavAndProjects } from "./dom.js"

const firstFolder = projectsFolder()

// Dummy objects for initial page render. 

let testFactoryProj = makeProject("FactoryTestHeader", "firstDescription")
let testFactoryProj2 = makeProject("Second Project", "second Description")
let testFactoryObj3 = makeProject("Third Project", "auto added to test button")
let testFactoryObj = todoFactory("my title", "my description", "the duedate", "top priority", "notes")
let testFactoryObj2 = todoFactory("title 2", "descript 2", "dueWhenever", "high priority", "no notes")
testFactoryProj.addItemToProject(testFactoryObj)
testFactoryProj2.addItemToProject(testFactoryObj2)
firstFolder.addProjectToList(testFactoryProj)
firstFolder.addProjectToList(testFactoryProj2)


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

function logContentChange() {
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
            logContentChange
    }