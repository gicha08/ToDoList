// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Event Listener for Add Button (Feature 1: Add Tasks)
addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Event Listener for the whole list (Event Delegation)
taskList.addEventListener('click', handleTaskActions);

// --- Core Functions ---

/**
 * Creates and adds a new task item to the list. (Feature 1)
 */
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    
    // Structure of the task item
    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="actions">
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    taskList.appendChild(taskItem);
    taskInput.value = ''; // Clear the input field
}

/**
 * Handles clicks on the Complete, Edit, and Delete buttons. 
 */
function handleTaskActions(e) {
    const target = e.target;
    
    // Get the parent list item of the clicked button
    const taskItem = target.closest('.task-item');
    if (!taskItem) return; // Exit if the click wasn't on a button inside a task

    if (target.classList.contains('complete-btn')) {
        toggleComplete(taskItem); // Feature 2: Mark as completed
    } else if (target.classList.contains('delete-btn')) {
        deleteTask(taskItem); // Feature 3: Delete task
    } else if (target.classList.contains('edit-btn')) {
        editTask(taskItem, target); // Feature 4: Edit task
    }
}

/**
 * Toggles the 'completed' class on a task item. (Feature 2)
 */
function toggleComplete(taskItem) {
    taskItem.classList.toggle('completed');
    const completeButton = taskItem.querySelector('.complete-btn');
    
    // Change button text based on state
    if (taskItem.classList.contains('completed')) {
        completeButton.textContent = 'Undo';
        completeButton.style.backgroundColor = '#28a745'; // Green for Undo
    } else {
        completeButton.textContent = 'Complete';
        completeButton.style.backgroundColor = ''; // Reset to default
    }
}

/**
 * Removes a task item from the list. (Feature 3)
 */
function deleteTask(taskItem) {
    taskList.removeChild(taskItem);
}

/**
 * Allows the user to edit the text of a task. (Feature 4)
 */
function editTask(taskItem, editButton) {
    const taskTextSpan = taskItem.querySelector('.task-text');
    const currentText = taskTextSpan.textContent;

    if (editButton.textContent === 'Edit') {
        // Switch to editing mode
        taskTextSpan.innerHTML = `<input type="text" class="edit-input" value="${currentText}">`;
        editButton.textContent = 'Save';
        
        const editInput = taskItem.querySelector('.edit-input');
        editInput.focus();
        
        // Handle saving on 'Enter' key press
        editInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                saveEdit(taskItem, editButton);
            }
        });
    } else {
        // Save the changes
        saveEdit(taskItem, editButton);
    }
}

/**
 * Saves the edited task text.
 */
function saveEdit(taskItem, editButton) {
    const editInput = taskItem.querySelector('.edit-input');
    const newText = editInput.value.trim();

    if (newText !== '') {
        const taskTextSpan = taskItem.querySelector('.task-text');
        taskTextSpan.textContent = newText;
        editButton.textContent = 'Edit';
    } else {
        alert('Task cannot be empty!');
    }
}