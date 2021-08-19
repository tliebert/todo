import { addPositionProperty, logContentChange } from "./index.js";

const projectsFolder = function () {
  let projectsList = [];

  function returnList() {
    return projectsList;
  }

  function addProjectToList(project) {
    let length = projectsList.length;
    addPositionProperty(project, length);
    projectsList.push(project);
  }

  const resetPositionProperties = function (array) {
    array.forEach((project, currInd) => {
      addPositionProperty(project, currInd);
    });
  };

  // the below function was originally part of the suite of general-use functions in index
  // could be refactored, carefully, as the Webpack settings were causing an error when it was
  // imported

  const editTodoItem = function (projectIndex, todoIndex, newValue, type) {
    let project = returnProjectFromIndex(projectIndex);
    let todo = project.items[todoIndex];
    todo[type] = newValue;
  };

  const removeItemFromArray = function (project) {
    let index = projectsList.indexOf(project);
    projectsList.splice(index, 1);
  };

  const removeProject = function (project) {
    // an object
    removeItemFromArray(project, projectsList);
    resetPositionProperties(projectsList);
  };

  function returnProjectFromIndex(index) {
    return projectsList[index];
  }

  // refactor to move the DOM functionality to ./dom.js
  // dom.js can have functionality that separates out the index number and container type

  function deleteEntry(node) {
    // console.log(node)

    let indexNumber = node.getAttribute("data-pos");
    let containerType = node.getAttribute("data-type");

    switch (containerType) {
      case "todo":
        {
          let project = returnProjectFromIndex(findParentObjectPosition(node));
          let list = project.returnList();
          project.removeItemFromProject(list[indexNumber]);
        }
        break;
      case "project":
        // console.log(returnProjectFromIndex(indexNumber))
        removeProject(returnProjectFromIndex(indexNumber));
        break;
      default:
        console.log("neither to-do nor project");
    }
    // console.log(projectsList)
  }

  function findParentObjectPosition(node) {
    return node.parentElement.getAttribute("data-pos");
  }

  return {
    projectsList,
    editTodoItem,
    returnList,
    addProjectToList,
    removeProject,
    deleteEntry,
    returnProjectFromIndex,
  };
};

export { projectsFolder };
