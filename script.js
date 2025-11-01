const form = document.getElementById('taskForm');
const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');
const fieldInput = document.getElementById('taskField');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Simpan tasks ke localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks ke UI
function renderTasks() {
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if(task.completed) li.classList.add('completed');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });
        li.appendChild(checkbox);

        const span = document.createElement('span');
        span.textContent = `${task.text} [${task.field}]`;
        li.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete';
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}

// Event submit form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    const taskField = fieldInput.value.trim(); // ambil nilai bidang
    if(taskText === '' || taskField === '') return;

    tasks.push({ text: taskText, field: taskField, completed: false });
    input.value = '';
    fieldInput.value = '';
    saveTasks();
    renderTasks();
});

renderTasks();
