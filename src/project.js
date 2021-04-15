import {removeItemFromArray, addItemToArray, addPositionProperty} from "./index.js"


//factory function to generate new projects 

function makeProject(title, description) {

    let items = []

    const addItemToProject = function(item) {
        let length = items.length;
        addPositionProperty(item, length)
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