/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeProjectNode\": () => (/* binding */ makeProjectNode),\n/* harmony export */   \"makeProjectsFolder\": () => (/* binding */ makeProjectsFolder),\n/* harmony export */   \"makeToDoObjectsFromArray\": () => (/* binding */ makeToDoObjectsFromArray),\n/* harmony export */   \"renderProjects\": () => (/* binding */ renderProjects),\n/* harmony export */   \"makeNavItem\": () => (/* binding */ makeNavItem),\n/* harmony export */   \"renderNavAndProjects\": () => (/* binding */ renderNavAndProjects)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.js */ \"./src/project.js\");\n/* harmony import */ var _item_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./item.js */ \"./src/item.js\");\n\n\n\n\nconst navContainer = document.getElementById(\"navContainer\");\nconst projectContainer = document.getElementById(\"container\");\nconst priorities = [\"Low\", \"Medium\", \"High\", \"Nuclear\"];\n\n// Module for handling edit clicks\n\nconst clickEditController = (function () {\n  let activeEditedNode;\n  let todoListItem;\n\n  function handleTodoClick(event) {\n    if (!activeEditedNode) {\n      console.log(\"no activeEditedNode option\");\n      todoListItem = event.target;\n      let inputBox = replaceTodoAndReturnInput(event);\n      activeEditedNode = inputBox;\n      addClickElsewhereListener();\n    } else if (event.target === activeEditedNode) {\n      console.log(\"event target is the activeEditedNode\");\n      return;\n    } else if (!(event.target === activeEditedNode)) {\n      submitValueAndReplaceListItem(activeEditedNode, todoListItem);\n\n      todoListItem = event.target;\n      let inputBox = replaceTodoAndReturnInput(event);\n      activeEditedNode = inputBox;\n      addClickElsewhereListener();\n    } else {\n      console.log(\"end of todo handle Click event reached\");\n    }\n  }\n\n  function submitValueAndReplaceListItem(editedInput, oldListItem) {\n    if (!editedInput.parentElement) {\n      return;\n    } else {\n      submitCurrentToDoValue(editedInput);\n\n      let parent = editedInput.parentElement;\n\n      oldListItem.textContent = editedInput.value;\n\n      parent.replaceChild(oldListItem, activeEditedNode);\n    }\n  }\n\n  function addClickElsewhereListener() {\n    document.addEventListener(\"click\", clickElsewhereListener, true);\n  }\n\n  function clickElsewhereListener(e) {\n    if (e.target === activeEditedNode) {\n      console.log(\"clicked target was active edited Node \");\n      return;\n    } else if (isEditable(e.target)) {\n      console.log(\"clickElsewhere thinks the event target is editable\");\n\n      //if its another todo, remove event listener then handle\n\n      handleTodoClick(e);\n    } else {\n      console.log(\n        \"click elsewhere listener thinks is going to try to submit the active edited item\"\n      );\n\n      submitValueAndReplaceListItem(activeEditedNode, todoListItem);\n    }\n  }\n\n  function submitCurrentToDoValue(node) {\n    console.log(node, node.parentElement);\n    let parentProjectPosition = getPosition(\n      node.closest(\"[data-type=project]\")\n    );\n    let todoPosition = getPosition(node.closest(\"[data-type=todo]\"));\n    let itemtype = node.getAttribute(\"data-itemtype\");\n    let currentTodoValue = node.value;\n\n    submitNewTodoItem(\n      parentProjectPosition,\n      todoPosition,\n      currentTodoValue,\n      itemtype\n    );\n  }\n\n  function isEditable(node) {\n    if (node.closest(\"[data-type=todo]\")) {\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  function replaceTodoAndReturnInput(event) {\n    // extract the data-itemtype\n    let itemtype = event.target.getAttribute(\"data-itemtype\");\n\n    // find the parent node\n    let parent = event.target.parentElement;\n\n    // create an input of the correct type\n    let tempInput = createInputByType(itemtype);\n    tempInput.setAttribute(\"value\", event.target.innerHTML);\n\n    // replace the target element with the new input\n    parent.replaceChild(tempInput, event.target);\n\n    return tempInput;\n  }\n\n  return {\n    handleTodoClick,\n  };\n})();\n\n// Node creation at ToDo, Project, and Folder (all projects) level\n\nfunction makeToDoItemNode(toDoItem) {\n  let listItem = document.createElement(\"li\");\n  listItem.textContent = toDoItem;\n  listItem.addEventListener(\"click\", clickEditController.handleTodoClick);\n  return listItem;\n}\n\nfunction makeToDoObjectNode(toDoObject) {\n  let toDoContainer = document.createElement(\"div\");\n\n  // this should only append the function to replace each node w/ a click to change\n\n  for (let key in toDoObject) {\n    if (key === \"pos\") continue;\n    else {\n      let listItem = makeToDoItemNode(toDoObject[key]);\n      listItem.setAttribute(\"data-itemtype\", key);\n      toDoContainer.appendChild(listItem);\n    }\n  }\n\n  addButtonByType(toDoContainer, \"Delete\", deleteEvent);\n  (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.setPositionDataAttribute)(toDoContainer, toDoObject);\n  (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.setContainerType)(toDoContainer, \"todo\");\n\n  return toDoContainer;\n}\n\nfunction makeToDoObjectsFromArray(listArray) {\n  let nodes = listArray.map(makeToDoObjectNode);\n  return nodes;\n}\n\nfunction makeProjectNode(project) {\n  let projectNode = document.createElement(\"div\");\n\n  let title = document.createElement(\"h1\");\n  title.textContent = project[\"title\"];\n  projectNode.appendChild(title);\n\n  let description = document.createElement(\"h2\");\n  description.textContent = project[\"description\"];\n  projectNode.appendChild(description);\n\n  addButtonByType(projectNode, \"Delete\", deleteEvent);\n  addButtonByType(projectNode, \"Add ToDo\", displayAddTodoForm);\n\n  (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.setPositionDataAttribute)(projectNode, project);\n  (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.setContainerType)(projectNode, \"project\");\n\n  let toDoArray = project.returnList();\n  let toDoNodes = makeToDoObjectsFromArray(toDoArray);\n  toDoNodes.forEach((node) => projectNode.appendChild(node));\n\n  return projectNode;\n}\n\nfunction makeProjectsFolder(arrayOfProjects) {\n  let folder = document.createElement(\"div\");\n  let arrayOfProjectNodes = arrayOfProjects.map((project) =>\n    makeProjectNode(project)\n  );\n  arrayOfProjectNodes.forEach((node) => folder.appendChild(node));\n  return folder;\n}\n\n//navbar functions\n\nfunction makeNavbar(arrayOfProjects) {\n  let nav = document.createElement(\"nav\");\n  arrayOfProjects.forEach((item) => nav.appendChild(makeNavItem(item)));\n\n  addButtonByType(nav, \"Add Project\", displayAddProjectForm);\n  addButtonByType(nav, \"Display All Projects\", _index_js__WEBPACK_IMPORTED_MODULE_0__.logContentChange);\n\n  nav.classList.add(\"navBar\")\n\n  return nav;\n}\n\nfunction makeNavItem(project) {\n  let proj = document.createElement(\"div\");\n  proj.innerText = project[\"title\"];\n  (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.setPositionDataAttribute)(proj, project);\n  proj.addEventListener(\"click\", displayProject);\n\n  proj.classList.add(\"navItem\")\n\n  return proj;\n}\n\n//page rendering functions\n\nfunction removeAllNodes(container) {\n  while (container.hasChildNodes()) {\n    container.removeChild(container.firstChild);\n  }\n}\n\n// active monitor \n\nlet activeMonitor = {\n  activeProject: false,\n  get active() {return this.activeProject},\n  set active(project) {this.activeProject = project},\n  resetActive: function() {this.activeProject = false} \n}\n\nfunction displayProject(event) {\n  if (activeMonitor.active) {\n    activeMonitor.resetActive;\n  }\n\n  let navNodes = document.querySelectorAll(\".navItem\")\n  navNodes.forEach((node) => {node.classList.remove('activeNavItem')})\n  \n  let node = event.target;\n\n  let position = getPosition(node);\n  let activeProject = _index_js__WEBPACK_IMPORTED_MODULE_0__.firstFolder.returnProjectFromIndex(position);\n\n  activeMonitor.active = activeProject;\n\n  renderSingleProject(activeProject);\n\n  node.classList.add(\"activeNavItem\")\n}\n\nfunction renderSingleProject(project) {\n  let projectNode = makeProjectNode(project);\n  removeAllNodes(projectContainer);\n  projectContainer.appendChild(projectNode);\n}\n\nfunction renderProjects(arrayOfProjects, container) {\n  let allProjectNodes = makeProjectsFolder(arrayOfProjects);\n  container.appendChild(allProjectNodes);\n}\n\nfunction renderNavAndProjects(arrayOfProjects) {\n  removeAllNodes(projectContainer);\n  removeAllNodes(navContainer);\n  let nav = makeNavbar(arrayOfProjects);\n  navContainer.appendChild(nav);\n  renderProjects(arrayOfProjects, projectContainer);\n}\n\n// returning data attributes. This functionality mainly happens in overview / firstFolder object,\n// but also for displaying single projects.\n\nfunction getPosition(node) {\n  return node.getAttribute(\"data-pos\");\n}\n\nfunction getType(node) {\n  return node.getAttribute(\"data-type\");\n}\n\nfunction returnParentProjectNode(event) {\n  let projectNode = event.target.closest(\"[data-type=project]\");\n  return projectNode;\n}\n\nfunction returnTodoNode(event) {\n  let todoNode = event.target.closest(\"[data-type=todo]\");\n  return todoNode;\n}\n\nfunction submitNewTodoItem(parentPos, todoPos, newValue, type) {\n  _index_js__WEBPACK_IMPORTED_MODULE_0__.firstFolder.editTodoItem(parentPos, todoPos, newValue, type);\n}\n\n// CSS functions\n\nfunction toggleNavHighlight(node) {\n  node.classList.toggle(\"selectedProject\");\n}\n\nfunction toggleFormView() {}\n\n// buttons & click functions\n\nfunction addButtonByType(containerNode, buttonText, clickFunction) {\n  let button = document.createElement(\"button\");\n  button.innerText = buttonText;\n  containerNode.appendChild(button);\n  button.addEventListener(\"click\", clickFunction);\n}\n\n//event listener button functions\n\nfunction deleteEvent(event) {\n  // delete button should always be a direct child of either a project or todo container\n  //labelled with type and position in the larger array\n  // so this should send back the container node\n\n  let containerDiv = event.target.parentElement;\n\n  _index_js__WEBPACK_IMPORTED_MODULE_0__.firstFolder.deleteEntry(containerDiv);\n\n  (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.logContentChange)();\n}\n\nfunction addProject(event) {\n  //event.preventDefault();\n\n  let form = event.target.parentElement;\n\n  let array = getFormValues(form);\n\n  let title, description;\n  [title, description] = [...array];\n\n  // dependent on knowing a lot about how the objects are made. Positional dependency\n\n  let project = (0,_project_js__WEBPACK_IMPORTED_MODULE_1__.makeProject)(title, description);\n  _index_js__WEBPACK_IMPORTED_MODULE_0__.firstFolder.addProjectToList(project);\n\n  (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.logContentChange)();\n}\n\nfunction addTodo(event) {\n  event.preventDefault();\n\n  let projectNode = returnParentProjectNode(event);\n  let index = getPosition(projectNode);\n\n  let form = event.target.parentElement;\n  let valuesArray = getFormValues(form);\n\n  let title, description, duedate, priority, notes;\n  [title, description, duedate, priority, notes] = [...valuesArray];\n\n  let projectObject = _index_js__WEBPACK_IMPORTED_MODULE_0__.firstFolder.returnProjectFromIndex(index);\n\n  let todo = (0,_item_js__WEBPACK_IMPORTED_MODULE_2__.todoFactory)(title, description, duedate, priority, notes);\n\n  projectObject.addItemToProject(todo);\n\n  if (activeMonitor.active) {\n    renderSingleProject(activeMonitor.active)\n  }\n  else {(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.logContentChange)()};\n}\n\n//Project form functions\n\nfunction displayAddProjectForm() {\n  // create form node inclduing add project button\n  let formNode = createAddProjectForm();\n\n  // add unseen class\n\n  // append the node to the body\n  navContainer.appendChild(formNode);\n\n  // toggle the unseen class\n}\n\nfunction createAddProjectForm() {\n  let form = document.createElement(\"form\");\n  form.setAttribute(\"name\", \"project-inputs\");\n\n  let inputs = [\"title\", \"description\"];\n\n  inputs.forEach((input) => {\n    form.appendChild(createInputByType(input));\n  });\n\n  // add button that connects to add Project\n\n  addButtonByType(form, \"Submit\", addProject);\n\n  return form;\n}\n\n//Todo form functions\n\nfunction createAddTodoForm() {\n  let form = document.createElement(\"form\");\n  form.setAttribute(\"name\", \"todo-inputs\");\n\n  let fields = [\"title\", \"description\", \"duedate\", \"priority\", \"notes\"];\n\n  fields.forEach((field) => {\n    let inputNode = createInputByType(field);\n    form.appendChild(inputNode);\n  });\n\n  // add button that connects to add Project\n\n  addButtonByType(form, \"Submit\", addTodo);\n\n  return form;\n}\n\nfunction displayAddTodoForm(event) {\n  let formNode = createAddTodoForm();\n\n  let projectContainer = returnParentProjectNode(event);\n\n  projectContainer.appendChild(formNode);\n}\n\n// utility form functions\n\nfunction createInputByType(type) {\n  if ((type === \"title\") | (type === \"description\") | (type === \"notes\")) {\n    let input = document.createElement(\"input\");\n    input.setAttribute(\"data-itemtype\", type);\n    input.setAttribute(\"type\", \"text\");\n    input.setAttribute(\"placeholder\", type);\n    input.setAttribute(\"value\", \"\");\n    input.setAttribute(\"name\", \"project-inputs\");\n    return input;\n  } else if (type === \"duedate\") {\n    let input = document.createElement(\"input\");\n    input.setAttribute(\"data-itemtype\", type);\n    input.setAttribute(\"type\", \"date\");\n    input.setAttribute(\"value\", \"\");\n    input.setAttribute(\"name\", \"project-inputs\");\n    return input;\n  } else if (type === \"priority\") {\n    let selector = document.createElement(\"select\");\n    selector.setAttribute(\"data-itemtype\", type);\n    selector.setAttribute(\"name\", \"priorities\");\n    selector.setAttribute(\"id\", \"priorities\");\n\n    priorities.forEach((level) => {\n      let option = document.createElement(\"option\");\n      option.setAttribute(\"value\", level);\n      option.textContent = level;\n      selector.appendChild(option);\n    });\n    return selector;\n  } else {\n    console.log(\"invalid input type\");\n  }\n}\n\nfunction getFormValues(formNode) {\n  let childNodes = Array.from(formNode.childNodes);\n  return childNodes.reduce((acc, ele) => {\n    if (ele.value) {\n      acc.push(ele.value);\n    }\n    return acc;\n  }, []);\n}\n\n\n\n\n//# sourceURL=webpack://todo/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"firstFolder\": () => (/* binding */ firstFolder),\n/* harmony export */   \"removeItemFromArray\": () => (/* binding */ removeItemFromArray),\n/* harmony export */   \"addItemToArray\": () => (/* binding */ addItemToArray),\n/* harmony export */   \"addPositionProperty\": () => (/* binding */ addPositionProperty),\n/* harmony export */   \"setPositionDataAttribute\": () => (/* binding */ setPositionDataAttribute),\n/* harmony export */   \"setContainerType\": () => (/* binding */ setContainerType),\n/* harmony export */   \"logContentChange\": () => (/* binding */ logContentChange)\n/* harmony export */ });\n/* harmony import */ var _item_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item.js */ \"./src/item.js\");\n/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.js */ \"./src/project.js\");\n/* harmony import */ var _overview_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overview.js */ \"./src/overview.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n\n\n\n\n\nconst firstFolder = (0,_overview_js__WEBPACK_IMPORTED_MODULE_2__.projectsFolder)();\n\n// Dummy objects for initial page render.\n\nlet testFactoryProj = (0,_project_js__WEBPACK_IMPORTED_MODULE_1__.makeProject)(\"FactoryTestHeader\", \"firstDescription\");\nlet testFactoryProj2 = (0,_project_js__WEBPACK_IMPORTED_MODULE_1__.makeProject)(\"Second Project\", \"second Descriptiongk\");\nlet testFactoryObj3 = (0,_project_js__WEBPACK_IMPORTED_MODULE_1__.makeProject)(\"Third Project\", \"auto added to test button\");\nlet testFactoryObj = (0,_item_js__WEBPACK_IMPORTED_MODULE_0__.todoFactory)(\n  \"my title\",\n  \"my description\",\n  \"the duedate\",\n  \"top priority\",\n  \"notes\"\n);\nlet testFactoryObj2 = (0,_item_js__WEBPACK_IMPORTED_MODULE_0__.todoFactory)(\n  \"title 2\",\n  \"descript 2\",\n  \"dueWhenever\",\n  \"high priority\",\n  \"no notes\"\n);\ntestFactoryProj.addItemToProject(testFactoryObj);\ntestFactoryProj2.addItemToProject(testFactoryObj2);\nfirstFolder.addProjectToList(testFactoryProj);\nfirstFolder.addProjectToList(testFactoryProj2);\n\n// utility functions to use in each of the individual modules for todo lists, project lists and the app overview\n\nfunction removeItemFromArray(item, array) {\n  let index = array.indexOf(item);\n  array.splice(index, 1);\n}\n\nfunction addItemToArray(item, array) {\n  array.push(item);\n}\n\nfunction addPositionProperty(object, position) {\n  object[\"pos\"] = position;\n}\n\nfunction setPositionDataAttribute(containerNode, object) {\n  containerNode.setAttribute(\"data-pos\", object[\"pos\"]);\n}\n\nfunction setContainerType(containerNode, type) {\n  containerNode.setAttribute(\"data-type\", type);\n}\n\nconst firstRender = function () {\n  let folder = firstFolder.returnList();\n  (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.renderNavAndProjects)(folder);\n};\n\nfunction logContentChange() {\n  firstRender();\n}\n\nfirstRender();\n\n\n\n\n//# sourceURL=webpack://todo/./src/index.js?");

/***/ }),

/***/ "./src/item.js":
/*!*********************!*\
  !*** ./src/item.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"todoFactory\": () => (/* binding */ todoFactory)\n/* harmony export */ });\n// factory that creates the todo object\n\nconst todoFactory = function (title, description, duedate, priority, notes) {\n  let todoItem = {\n    title: title,\n    description: description,\n    duedate: duedate,\n    priority: priority,\n    notes: notes,\n  };\n\n  return todoItem;\n};\n\n// explore how to refactor this into a single function with different parameters\n\nfunction setPriority(todo, priority) {\n  todo[\"priority\"] = priority;\n}\n\nfunction setDescription(todo, description) {\n  todo[\"description\"] = description;\n}\n\nfunction setDate(todo, date) {\n  todo[\"duedate\"] = date;\n}\n\nfunction setNotes(todo, note) {\n  todo[\"notes\"] = note;\n}\n\nfunction setTitle(todo, title) {\n  todo[\"title\"] = title;\n}\n\n\n\n\n//# sourceURL=webpack://todo/./src/item.js?");

/***/ }),

/***/ "./src/overview.js":
/*!*************************!*\
  !*** ./src/overview.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectsFolder\": () => (/* binding */ projectsFolder)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n\n\nconst projectsFolder = function () {\n  let projectsList = [];\n\n  function returnList() {\n    return projectsList;\n  }\n\n  function addProjectToList(project) {\n    let length = projectsList.length;\n    (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.addPositionProperty)(project, length);\n    projectsList.push(project);\n  }\n\n  const resetPositionProperties = function (array) {\n    array.forEach((project, currInd) => {\n      (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.addPositionProperty)(project, currInd);\n    });\n  };\n\n  // the below function was originally part of the suite of general-use functions in index\n  // could be refactored, carefully, as the Webpack settings were causing an error when it was\n  // imported\n\n  const editTodoItem = function (projectIndex, todoIndex, newValue, type) {\n    let project = returnProjectFromIndex(projectIndex);\n    let todo = project.items[todoIndex];\n    todo[type] = newValue;\n  };\n\n  const removeItemFromArray = function (project) {\n    let index = projectsList.indexOf(project);\n    projectsList.splice(index, 1);\n  };\n\n  const removeProject = function (project) {\n    // an object\n    removeItemFromArray(project, projectsList);\n    resetPositionProperties(projectsList);\n  };\n\n  function returnProjectFromIndex(index) {\n    return projectsList[index];\n  }\n\n  // refactor to move the DOM functionality to ./dom.js\n  // dom.js can have functionality that separates out the index number and container type\n\n  function deleteEntry(node) {\n    // console.log(node)\n\n    let indexNumber = node.getAttribute(\"data-pos\");\n    let containerType = node.getAttribute(\"data-type\");\n\n    switch (containerType) {\n      case \"todo\":\n        {\n          let project = returnProjectFromIndex(findParentObjectPosition(node));\n          let list = project.returnList();\n          project.removeItemFromProject(list[indexNumber]);\n        }\n        break;\n      case \"project\":\n        // console.log(returnProjectFromIndex(indexNumber))\n        removeProject(returnProjectFromIndex(indexNumber));\n        break;\n      default:\n        console.log(\"neither to-do nor project\");\n    }\n    // console.log(projectsList)\n  }\n\n  function findParentObjectPosition(node) {\n    return node.parentElement.getAttribute(\"data-pos\");\n  }\n\n  return {\n    projectsList,\n    editTodoItem,\n    returnList,\n    addProjectToList,\n    removeProject,\n    deleteEntry,\n    returnProjectFromIndex,\n  };\n};\n\n\n\n\n//# sourceURL=webpack://todo/./src/overview.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeProject\": () => (/* binding */ makeProject)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n\n\n//factory function to generate new projects\n\nfunction makeProject(title, description) {\n  let items = [];\n\n  const addItemToProject = function (item) {\n    let length = items.length;\n    (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.addPositionProperty)(item, length);\n    (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.addItemToArray)(item, items);\n  };\n\n  const resetPositionProperties = function (array) {\n    array.forEach((item, index) => (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.addPositionProperty)(item, index));\n  };\n\n  const removeItemFromProject = function (item) {\n    (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.removeItemFromArray)(item, items);\n    resetPositionProperties(items);\n  };\n\n  function returnList() {\n    return items;\n  }\n\n  return {\n    title,\n    description,\n    items,\n    returnList,\n    removeItemFromProject,\n    addItemToProject,\n  };\n}\n\n\n\n\n//# sourceURL=webpack://todo/./src/project.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;