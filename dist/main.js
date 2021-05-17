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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeProjectNode\": () => (/* binding */ makeProjectNode),\n/* harmony export */   \"makeProjectsFolder\": () => (/* binding */ makeProjectsFolder),\n/* harmony export */   \"makeToDoObjectsFromArray\": () => (/* binding */ makeToDoObjectsFromArray),\n/* harmony export */   \"renderProjects\": () => (/* binding */ renderProjects),\n/* harmony export */   \"makeNavItem\": () => (/* binding */ makeNavItem),\n/* harmony export */   \"renderNavAndProjects\": () => (/* binding */ renderNavAndProjects)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n\n\n\n\nconst pageBody = document.querySelector(\"body\")\nconst navContainer = document.getElementById(\"navContainer\")\nconst projectContainer = document.getElementById(\"container\");\n\n// Node creation at ToDo, Project, and Folder (all projects) level \n\nfunction makeToDoItemNode(toDoItem) {\n        let listItem = document.createElement(\"li\")\n        listItem.textContent = toDoItem;\n        return listItem\n}\n\nfunction makeToDoObjectNode(toDoObject) {\n\n    let toDoContainer = document.createElement(\"div\");\n    \n    for (let key in toDoObject) {\n        let listItem = makeToDoItemNode(toDoObject[key])\n        listItem.setAttribute(\"data-itemtype\", key)\n        toDoContainer.appendChild(listItem)\n    }\n\n    addButtonByType(toDoContainer, \"Delete\", deleteEvent)\n    ;(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.setPositionDataAttribute)(toDoContainer, toDoObject)\n    ;(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.setContainerType)(toDoContainer, \"todo\")\n\n    return toDoContainer\n}\n\nfunction makeToDoObjectsFromArray(listArray) {\n    let nodes = listArray.map(makeToDoObjectNode)\n    return nodes \n}\n\nfunction makeProjectNode(project) {\n\n    let projectNode = document.createElement(\"div\");\n\n    let title = document.createElement(\"h1\")\n    title.textContent = project[\"title\"]\n    projectNode.appendChild(title)\n\n    let description = document.createElement(\"h2\")\n    description.textContent = project[\"description\"]\n    projectNode.appendChild(description)\n\n    addButtonByType(projectNode, \"Delete\", deleteEvent)\n    ;(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.setPositionDataAttribute)(projectNode, project)\n    ;(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.setContainerType)(projectNode, \"project\")\n    \n    let toDoArray = project.returnList()\n    let toDoNodes = makeToDoObjectsFromArray(toDoArray)\n    toDoNodes.forEach(node => projectNode.appendChild(node))\n\n    return projectNode\n}\n\nfunction makeProjectsFolder(arrayOfProjects) {\n    let folder = document.createElement(\"div\")\n    let arrayOfProjectNodes = arrayOfProjects.map(project => makeProjectNode(project))\n    arrayOfProjectNodes.forEach(node => folder.appendChild(node))\n    return folder \n}\n\nfunction addButtonByType(containerNode, buttonText, clickFunction) {\n    let button = document.createElement(\"button\")\n    button.innerText = buttonText;\n    containerNode.appendChild(button)\n    button.addEventListener(\"click\", clickFunction)\n}\n\n//page rendering functions \n\nfunction removeAllNodes(container) {\n    while (container.hasChildNodes()) {\n        container.removeChild(container.firstChild)\n    }\n}\n\nfunction makeNavbar(arrayOfProjects) {\n    let nav = document.createElement(\"nav\") \n    arrayOfProjects.forEach(item => nav.appendChild(makeNavItem(item)))\n    return nav;\n}\n\nfunction makeNavItem(project) {\n    let proj = document.createElement(\"div\")\n    proj.innerText = project[\"title\"]\n    ;(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.setPositionDataAttribute)(proj, project)\n    proj.addEventListener(\"click\", displayProject)\n    return proj\n}\n\nfunction displayProject(event) {\n    let node = event.target;\n    let position = getPosition(node)\n    let activeProject = _index_js__WEBPACK_IMPORTED_MODULE_0__.firstFolder.returnProjectFromIndex(position)\n    renderSingleProject(activeProject)\n}\n\nfunction renderSingleProject(project) {\n    let projectNode = makeProjectNode(project)  \n    removeAllNodes(projectContainer)\n    projectContainer.appendChild(projectNode)\n}\n\nfunction renderProjects(arrayOfProjects, container) {\n    let allProjectNodes = makeProjectsFolder(arrayOfProjects);\n    container.appendChild(allProjectNodes)\n}\n\nfunction renderNavAndProjects(arrayOfProjects) {\n    removeAllNodes(projectContainer);\n    removeAllNodes(navContainer)\n    let nav = makeNavbar(arrayOfProjects);\n    navContainer.appendChild(nav)\n    renderProjects(arrayOfProjects, projectContainer)\n}\n\n// returning data attributes \n\nfunction getPosition(node) {\n    return node.getAttribute(\"data-pos\")\n}\n\nfunction getType(node) {\n    return node.getAttribute(\"data-type\")\n}\n\n// CSS functions\n\nfunction toggleNavHighlight(node) {\n    node.classList.toggle('selectedProject')\n}\n\n//event listener functions \n\nfunction deleteEvent(event) {\n    let containerDiv = event.target.parentElement;\n    _index_js__WEBPACK_IMPORTED_MODULE_0__.firstFolder.deleteEntry(containerDiv)\n    ;(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.logDelete)()\n}\n\nfunction addToDo() {\n\n}\n\n//form functions \n\nfunction addForm(container) {\n\n}\n\nfunction getFormValues() {\n\n}\n\n\n\n//# sourceURL=webpack://todo/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"firstFolder\": () => (/* binding */ firstFolder),\n/* harmony export */   \"removeItemFromArray\": () => (/* binding */ removeItemFromArray),\n/* harmony export */   \"addItemToArray\": () => (/* binding */ addItemToArray),\n/* harmony export */   \"addPositionProperty\": () => (/* binding */ addPositionProperty),\n/* harmony export */   \"setPositionDataAttribute\": () => (/* binding */ setPositionDataAttribute),\n/* harmony export */   \"setContainerType\": () => (/* binding */ setContainerType),\n/* harmony export */   \"logDelete\": () => (/* binding */ logDelete)\n/* harmony export */ });\n/* harmony import */ var _item_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item.js */ \"./src/item.js\");\n/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.js */ \"./src/project.js\");\n/* harmony import */ var _overview_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overview.js */ \"./src/overview.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n\n\n\n\n\nlet firstFolder = (0,_overview_js__WEBPACK_IMPORTED_MODULE_2__.projectsFolder)()\n\n// Dummy objects for initial page render. \n\nlet testFactoryProj = (0,_project_js__WEBPACK_IMPORTED_MODULE_1__.makeProject)(\"FactoryTestHeader\", \"firstDescription\")\nlet testFactoryObj = (0,_item_js__WEBPACK_IMPORTED_MODULE_0__.todoFactory)(\"my title\", \"my description\", \"the duedate\", \"top priority\", \"notes\")\ntestFactoryProj.addItemToProject(testFactoryObj)\nfirstFolder.addProjectToList(testFactoryProj)\n\n\n// utility functions to use in each of the individual modules for todo lists, project lists and the app overview\n\nfunction removeItemFromArray(item, array) {\n    let index = array.indexOf(item)\n    array.splice(index, 1)\n}\n\nfunction addItemToArray(item, array) {\n    array.push(item)\n}\n\nfunction addPositionProperty(object, position) {\n    object[\"pos\"] = position;\n}\n\nfunction setPositionDataAttribute(containerNode, object) {\n    containerNode.setAttribute(\"data-pos\", object[\"pos\"])\n}\n\nfunction setContainerType(containerNode, type) {\n    containerNode.setAttribute(\"data-type\", type)\n}\n\nconst firstRender = function() {\n    let folder = firstFolder.returnList()\n    ;(0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.renderNavAndProjects)(folder)\n}\n\nfunction logDelete() {\n    firstRender()\n}\n\nfirstRender()\n\n\n\n\n//# sourceURL=webpack://todo/./src/index.js?");

/***/ }),

/***/ "./src/item.js":
/*!*********************!*\
  !*** ./src/item.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"todoFactory\": () => (/* binding */ todoFactory)\n/* harmony export */ });\n// factory that creates the todo object \n\nconst todoFactory = function(title, description, duedate, priority, notes) {\n\n    let todoItem = {title, description, duedate, priority, notes}\n\n    return todoItem\n}\n\n// explore how to refactor this into a single function with different parameters \n\nfunction setPriority(todo, priority) {\n    todo[\"priority\"] = priority\n}\n\nfunction setDescription(todo, description) {\n    todo[\"description\"] = description\n}\n\nfunction setDate(todo, date) {\n    todo[\"duedate\"] = date\n}\n\nfunction setNotes(todo, note) {\n    todo[\"notes\"] = note\n}\n\nfunction setTitle(todo, title) {\n    todo[\"title\"] = title\n}\n\n\n\n//# sourceURL=webpack://todo/./src/item.js?");

/***/ }),

/***/ "./src/overview.js":
/*!*************************!*\
  !*** ./src/overview.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectsFolder\": () => (/* binding */ projectsFolder)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n\n\nconst projectsFolder = function() {\n\n    let projectsList = []\n\n    function returnList() {\n        return projectsList\n    }\n\n    function addProjectToList(project) {\n        let length = projectsList.length\n        ;(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.addPositionProperty)(project, length)\n        projectsList.push(project)\n    }\n\n    const removeProject = function(project) {\n        (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.removeItemFromArray)(project, projectsList)\n    }\n\n    function returnProjectFromIndex(index) {\n        return projectsList[index]\n    }\n\n// refactor to move the DOM functionality to ./dom.js\n// dom.js can have functionality that separates out the index number and container type\n\n    function deleteEntry(node) {\n        let indexNumber = node.getAttribute(\"data-pos\")\n        let containerType = node.getAttribute(\"data-type\")\n        console.log(\"deletePressed\")\n        switch (containerType) {\n            case \"todo\":\n                let project = returnProjectFromIndex(findParentObjectPosition(node));\n                let list = project.returnList()\n                project.removeItemFromProject(list[indexNumber])\n                break;\n            case \"project\":\n                removeProject(returnProjectFromIndex(indexNumber))\n                break;\n            default:\n                console.log(\"neither to-do nor project\")\n        }\n    }\n\n    function findParentObjectPosition(node) {\n        return node.parentElement.getAttribute(\"data-pos\")\n    }\n\n    return {returnList, addProjectToList, removeProject, deleteEntry}\n\n}\n\n \n\n\n//# sourceURL=webpack://todo/./src/overview.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeProject\": () => (/* binding */ makeProject)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n\n\n\n//factory function to generate new projects \n\nfunction makeProject(title, description) {\n\n    let items = []\n\n    const addItemToProject = function(item) {\n        let length = items.length;\n        (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.addPositionProperty)(item, length)\n        ;(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.addItemToArray)(item, items)\n    }\n    \n    const removeItemFromProject = function(item) {\n        ;(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.removeItemFromArray)(item, items)\n    }\n    \n    function returnList() {\n        return items\n    }    \n\n    return {title, description, items, returnList, removeItemFromProject, addItemToProject}\n}\n\n\n\n//# sourceURL=webpack://todo/./src/project.js?");

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