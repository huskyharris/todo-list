/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import uniqid from 'uniqid';
import TaskList from './TaskList';

export default class ProjectList {
  constructor() {
    this.projects = [];
  }

  addProject(name) {
    const id = uniqid();
    const taskList = new TaskList();
    const project = { id, name, taskList };
    this.projects.push(project);

    // Persist data in localStorage
    this.persistData();

    return project;
  }

  removeProject(id) {
    const index = this.projects.findIndex((proj) => proj.id === id);
    this.projects.splice(index, 1);

    // Persist data in localStorage
    this.persistData();
  }

  persistData() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('projects'));

    // Restoring projects from the localStorage
    if (storage) this.projects = storage;
  }

  getNumProjects() {
    return this.projects.length;
  }

  getProject(id) {
    const index = this.projects.findIndex((proj) => proj.id === id);
    return this.projects[index];
  }

  remakeTaskList(oldList) {
    const newList = new TaskList();
    newList.tasks = oldList.tasks;
    return newList;
  }

  getTaskList(id) {
    const project = this.getProject(id);
    const taskList = this.remakeTaskList(project.taskList);
    return taskList;
  }

  getNumTasks(id) {
    const taskList = this.getTaskList(id);
    const numTasks = taskList.getNumTasks();
    return numTasks;
  }

  getProjectNames() {
    const projNames = this.projects.map((proj) => proj.name);
    return projNames;
  }

  getProjectID(projectName) {
    const index = this.projects.findIndex((proj) => proj.name === projectName);
    return this.projects[index].id;
  }

  renameProject(id, newName) {
    const project = this.getProject(id);
    project.name = newName;
    this.persistData();
  }
}
