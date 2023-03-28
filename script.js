const form = document.getElementById('to-do-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const deleteCompletedBtn = document.getElementById('delete-completed-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');

// Local Storage
let tasks;
if (localStorage.getItem('tasks') === null) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(task => createTaskElement(task.title, task.completed, task.id));
}

// Create Task Element
function createTaskElement(title, completed, id) {
  const task = document.createElement('li');
  task.className = 'task';
  if (completed) {
    task.classList.add('completed');
  }
  task.innerHTML = `
    <input type="checkbox" class="task-checkbox" ${completed ? 'checked' : ''} />
    <p class="task-title">${title}</p>
    <div class="task-actions">
      <button class="delete-task-btn">Delete</button>
    </div>
  `;
  task.querySelector('.task-checkbox').addEventListener('change', () => {
    task.classList.toggle('completed');
    updateTaskInLocalStorage(id, title, !completed);
  });
  task.querySelector('.delete-task-btn').addEventListener('click', () => {
    task.remove();
    deleteTaskFromLocalStorage(id);
  });
  taskList.appendChild(task);
}

// Add Task
form.addEventListener('submit', e => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (title === '') {
    alert('يجب إدخال عنوان للمهمة!');
    return;
  }
  const id = Date.now();
  createTaskElement(title, false, id);
  tasks.push({ title, completed: false, id });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  taskInput.value = '';
});

// Delete Completed Tasks
deleteCompletedBtn.addEventListener('click', () => {
  taskList.querySelectorAll('.completed').forEach(task => {
    task.remove();
    deleteTaskFromLocalStorage(task.dataset.id);
  });
});

// Delete All Tasks
deleteAllBtn.addEventListener('click', () => {
  taskList.querySelectorAll('.task').forEach(task => {
    task.remove();
    deleteTaskFromLocalStorage(task.dataset.id);
  });
  tasks = [];
  localStorage.clear();
});

// Delete Task from Local Storage
function deleteTaskFromLocalStorage(id) {
  tasks = tasks.filter(task => task.id != id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update Task in Local Storage
function updateTaskInLocalStorage(id, title, completed) {
  tasks = tasks.map(task => {
    if (task.id == id) {
      task.title = title;
      task.completed = completed;
    }
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}






