/* eslint-disable no-undef */

export default class WeekOrder {
  constructor() {
    this.order = [];
  }

  persistData() {
    localStorage.setItem('weekOrder', JSON.stringify(this.order));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('weekOrder'));
    if (storage) this.order = storage;
  }

  updateOrder(idArr) {
    this.order = idArr;
    this.persistData();
  }

  rearrangeTasks(currentTaskArr) {
    if (this.order.length === 0) {
      currentTaskArr.forEach((task) => this.order.push(task.id));
      this.persistData();
      return currentTaskArr;
    }
    const newTaskArr = [];

    this.order.forEach((taskid) => {
      const index = currentTaskArr.findIndex((task) => task.id === taskid);
      const task = currentTaskArr[index];
      newTaskArr.push(task);
    });

    return newTaskArr;
  }

  moveTaskToEnd(taskid) {
    const index = this.order.findIndex((id) => id === taskid);
    this.order.push(this.order.splice(index, 1)[0]);
    this.persistData();
  }

  restoreTask(taskid) {
    const index = this.order.findIndex((id) => id === taskid);
    this.order.unshift(this.order.splice(index, 1)[0]);
    this.persistData();
  }

  addTask(taskid) {
    this.order.push(taskid);
    this.persistData();
  }

  removeTask(taskid) {
    const index = this.order.findIndex((id) => id === taskid);
    this.order.splice(index, 1);
    this.persistData();
  }
}
