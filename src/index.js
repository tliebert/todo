import { todoFactory } from "./item.js"
import { makeProject } from "./project.js"
import { projectsFolder } from "./overview.js"

// utility functions to use in each of the individual modules for todo lists, project lists and the app overview

function removeItemFromArray(itemID, array) {

}

function returnList(list) {
    return list
}

function addItemToArray(item, array) {
    array.push(item)
}

export {removeItemFromArray, returnList, addItemToArray}