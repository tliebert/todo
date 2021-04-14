import {removeItemFromArray, addItemToArray} from "./index.js"


function projectsFolder() {
    let projectsList = []

    function returnList() {
        return projectsList
    }

    function addProjectToList(project) {
        projectsList.push(project)
    }

    const removeProject = function(project) {
        removeItemFromArray(project, projectsList)
    }

    return {returnList, addProjectToList, removeProject}
}



export { projectsFolder } 
