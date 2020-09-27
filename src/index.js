import ProjectList from './ProjectList';
import * as projectListView from './projectListView';
import * as projectForm from './projectForm';
import {elements} from './base';

/** Global state of the app
 * - Project list
 * - Add Project View Modal/Object
 * - Add task View Modal/Object
 * - Current project object with tasks
 * - Shortcuts 
 */

const state = {};

// Project List - create default project or load saved projects
window.addEventListener('load', () => {

    if (!state.projectList) state.projectList = new ProjectList();

    // check if storage has any projects
    state.projectList.readStorage();

    const numProjects = state.projectList.getNumProjects();

    if (numProjects === 0) {
        //if empty, create a default project
        const defaultProject = state.projectList.addProject("Default Project");
        projectListView.renderProject(defaultProject);
    } else {
        // render saved projects
        projectListView.renderSavedProjects(state.projectList.projects);
    }

    // console.log(state.projectList);
});

/**
 * Project List Controller 
 **/

// expand project to show tasks or minimize
elements.projectList.addEventListener('click', e => {
    const arrow = e.target.closest('.fa-chevron-right');
    if (arrow) {
        // get the project id
        const projectID = arrow.parentElement.parentElement.dataset.projectid;

        // addTask (title, description, dueDate, priority, projectName, notes = '', status = true)
        // const taskList = state.projectList.getTaskList(projectID);
        // const task = taskList.addTask('test', 'test', 'test', 'test', 'test', 'test', 'test');
        // state.projectList.persistData();

        // collapse or expand
        const expanded = projectListView.isExpanded(projectID);

        if (expanded) {
            // collapse and hide task
            projectListView.hideTasks(projectID);
            projectListView.transformArrow(arrow);
        } else {
            // check if there are any tasks in the project before expanding
            const numTasks = state.projectList.getNumTasks(projectID);
            console.log(numTasks);
    
            if (numTasks > 0) {
                // render projects and transform the arrow
                const taskList = state.projectList.getTaskList(projectID);
                projectListView.renderProjectTasks(taskList.tasks, projectID);
                projectListView.transformArrow(arrow);
            }
        }
    }
});

// add project button
elements.addProjectBtn.addEventListener('click', () => {
    // render form
    projectForm.renderForm();

    const formDOM = document.getElementById('add-proj-form');
    formDOM.addEventListener('submit', e => {
        e.preventDefault();
        controlProjectForm();
    });

});

const controlProjectForm = () => {
    // get input when form submitted
    const input = projectForm.getInput();
    // create a new project and render
    const newProject = state.projectList.addProject(input);
    projectListView.renderProject(newProject);
    // exit form
    projectForm.clearInput();
    projectForm.exitForm();
};