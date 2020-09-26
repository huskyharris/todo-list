!function(t){var e={};function r(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(n,s,function(e){return t[e]}.bind(null,s));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=2)}([function(t,e,r){(function(e){var r=e&&e.pid?e.pid.toString(36):"";function n(){var t=Date.now(),e=n.last||t;return n.last=t>e?t:e+1}t.exports=t.exports.default=function(t,e){return(t||"")+""+r+n().toString(36)+(e||"")},t.exports.process=function(t,e){return(t||"")+r+n().toString(36)+(e||"")},t.exports.time=function(t,e){return(t||"")+n().toString(36)+(e||"")}}).call(this,r(1))},function(t,e){var r,n,s=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function c(t){if(r===setTimeout)return setTimeout(t,0);if((r===o||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{return r(t,0)}catch(e){try{return r.call(null,t,0)}catch(e){return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:o}catch(t){r=o}try{n="function"==typeof clearTimeout?clearTimeout:i}catch(t){n=i}}();var a,u=[],l=!1,d=-1;function p(){l&&a&&(l=!1,a.length?u=a.concat(u):d=-1,u.length&&f())}function f(){if(!l){var t=c(p);l=!0;for(var e=u.length;e;){for(a=u,u=[];++d<e;)a&&a[d].run();d=-1,e=u.length}a=null,l=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===i||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function h(t,e){this.fun=t,this.array=e}function m(){}s.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];u.push(new h(t,e)),1!==u.length||l||c(f)},h.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=m,s.addListener=m,s.once=m,s.off=m,s.removeListener=m,s.removeAllListeners=m,s.emit=m,s.prependListener=m,s.prependOnceListener=m,s.listeners=function(t){return[]},s.binding=function(t){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(t){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},function(t,e,r){"use strict";r.r(e);var n=r(0),s=r.n(n);class o{constructor(){this.tasks=[]}addTask(t,e,r,n,o,i,c=!0){const a={id:s()(),title:t,description:e,dueDate:r,priority:n,projectName:o,notes:i,status:c};return this.tasks.push(a),a}removeTask(t){const e=this.tasks.findIndex(e=>e.id===t);this.tasks.splice(e,1)}getNumTasks(){return this.tasks.length}test(){console.log("test")}}class i{constructor(){this.projects=[]}addProject(t){const e={id:s()(),name:t,taskList:new o};return this.projects.push(e),this.persistData(),e}removeProject(t){const e=t;this.projects.splice(e,1),this.persistData()}persistData(){localStorage.setItem("projects",JSON.stringify(this.projects))}readStorage(){const t=JSON.parse(localStorage.getItem("projects"));t&&(this.projects=t)}getNumProjects(){return this.projects.length}getProject(t){const e=this.projects.findIndex(e=>e.id===t);return this.projects[e]}remakeTaskList(t){const e=new o;return e.tasks=t.tasks,e}getTaskList(t){const e=this.getProject(t);return this.remakeTaskList(e.taskList)}getNumTasks(t){return this.getTaskList(t).getNumTasks()}}const c=t=>{const e=`\n    <div class="project-item-container" data-projectid="${t.id}">\n        <div class="view-1">\n            <i class="fas fa-chevron-right"></i>\n            <div class="click-proj">\n                <div class="shortcut-text proj-name">${t.name}</div>\n                ${a(t.taskList.tasks)}\n            </div>\n        </div>\n\n        <div class="view-2" data-viewid="${t.id}"></div>\n    </div>\n    `;document.getElementById("project-list").insertAdjacentHTML("beforeend",e)},a=t=>{const e=t.length;let r="";return e>0&&(r=`\n            <div class="task-num-style proj-task-num">${e}</div>\n        `),r},u={projectList:document.getElementById("project-list")},l={};window.addEventListener("load",()=>{l.projectList||(l.projectList=new i),l.projectList.readStorage();if(0===l.projectList.getNumProjects()){const t=l.projectList.addProject("Default Project");c(t)}else l.projectList.projects.forEach(t=>c(t))}),u.projectList.addEventListener("click",t=>{const e=t.target.closest(".fa-chevron-right");if(e){const t=e.parentElement.parentElement.dataset.projectid,r=l.projectList.getNumTasks(t);console.log(r)}})}]);