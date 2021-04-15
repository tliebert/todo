import {removeItemFromArray, addItemToArray, addPositionProperty} from "./index.js"


function projectsFolder() {
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

    return {returnList, addProjectToList, removeProject}
}



export { projectsFolder } 
