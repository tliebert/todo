import {removeItemFromArray, addItemToArray, addPositionProperty} from "./index.js"
import { todoFactory } from "./item.js"


const projectsFolder = function() {
    let projectsList = []

    function returnList() {
        return projectsList
    }

    function addProjectToList(project) {
        let length = projectsList.length
        addPositionProperty(project, length)
        projectsList.push(project)
    }

    const removeProject = function(project) {
        removeItemFromArray(project, projectsList)
    }

    function returnProjectFromIndex(index) {
        return projectsList[index]
    }

    function deleteEntry(node) {
        let indexNumber = node.getAttribute("data-pos")
        let containerType = node.getAttribute("data-type")
        switch (containerType) {
            case "todo":
                let project = returnProjectFromIndex(findParentObjectPosition(node));
                let list = project.returnList()
                project.removeItemFromProject(list[indexNumber])
                break;
            case "project":
                removeProject(returnProjectFromIndex(indexNumber))
                break;
            default:
                console.log("neither to-do nor project")
        }
        console.log(returnList())
    }

    function findParentObjectPosition(node) {
        return node.parentElement.getAttribute("data-pos")
    }

    return {returnList, addProjectToList, removeProject, deleteEntry}

}


export { projectsFolder } 
