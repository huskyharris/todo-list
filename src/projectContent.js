import {elements} from './base';
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import isYesterday from 'date-fns/isYesterday';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import isThisWeek from 'date-fns/isThisWeek';

export const renderProjectTitle = projectName => {
    elements.titleBtns.innerHTML = '';

    elements.mainTitle.textContent = projectName;
    elements.titleBtns.innerHTML = `
    <i class="far fa-edit proj-edit-btn"></i>
    <i class="far fa-trash-alt proj-trash-btn"></i>
    `;
};

export const renderTasks = taskArray => {

    elements.taskList.innerHTML = '';

    taskArray.forEach(task => {
        const markup = `
        <div class="tasks underline-gray" data-taskid="${task.id}">
            <div class="tasks-left">
                <input type="checkbox" class="checkbox">
                <p class="task-name shortcut-text">${task.title}</p>
                <div class="time-remaining">Due ${calculateTime(task.dueDate)}</div>
            </div>
            <div class="tasks-right">
                <i class="far fa-edit task-edit-btn"></i>
                <i class="far fa-trash-alt task-trash-btn"></i>
            </div>
        </div>
        `;
          
        elements.taskList.insertAdjacentHTML('beforeend', markup);
    });
};

const calculateTime = dueDate => {
    if (isToday(new Date(dueDate))) {
        return 'Today'
    } else if (isTomorrow(new Date(dueDate))) {
        return 'Tomorrow'
    } else if (isYesterday(new Date(dueDate))) {
        return 'Yesterday'
    } else {
        const time = formatDistanceToNow(new Date(dueDate), {addSuffix: true});
        return time
    }
};