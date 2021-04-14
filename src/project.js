import {removeItemFromArray, addItemToArray} from "./index.js"


//factory function to generate new projects 

function makeProject(title, description) {

    let items = []

    const addItemToProject = function(item) {
        addItemToArray(item, items)
    }
    
    const removeItemFromProject = function(item) {
        removeItemFromArray(item, items)
    }
    
    function returnList() {
        return items
    }    

    return {title, description, items, returnList, removeItemFromProject, addItemToProject}
}

export { makeProject }