function projectsFolder() {
    let projectsList = []

    function returnListOfProjects() {
        return projectList
    }

    function addProjectToList(project) {
        projectsList.push(project)
    }

    return {returnListOfProjects, addProjectToList}
}

export { projectsFolder } 
