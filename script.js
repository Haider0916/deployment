document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                complete: li.classList.contains('complete')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to DOM
    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        if (task.complete) {
            li.classList.add('complete');
        }
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="remove-task">x</button>
        `;
        li.querySelector('button.remove-task').addEventListener('click', () => {
            li.remove();
            saveTasks();
        });
        li.addEventListener('click', () => {
            li.classList.toggle('complete');
            saveTasks();
        });
        taskList.appendChild(li);
    };

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToDOM({ text: taskText, complete: false });
            taskInput.value = '';
            saveTasks();
        }
    });

    // Load tasks on page load
    loadTasks();
});
