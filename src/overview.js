import {removeItemFromArray, returnList, addItemToArray} from "./index.js"

function projectsFolder() {
    let projectsList = []

    function returnListOfProjects() {
        return projectList
    }

    function addProjectToList(project) {
        projectsList.push(project)
    }

    function removeProject(project) {
            let id = projectsList["title"]
            let index = items.indexOf(id)
            projectsList.splice(index, 1)
    }
        

    return {returnListOfProjects, addProjectToList, removeProject}
}



export { projectsFolder } 
