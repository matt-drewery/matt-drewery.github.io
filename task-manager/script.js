// Task Management App Logic
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskForm = document.getElementById('taskForm');
    const taskItems = document.getElementById('taskItems');
    const categoryList = document.getElementById('categoryList');
    const editModal = document.getElementById('editModal');
    const editTaskForm = document.getElementById('editTaskForm');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categoryItems = document.querySelectorAll('.category-item');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const allCountElement = document.getElementById('allCount');
    const dropArea = document.getElementById('dropArea');

    const taskCategoryInput = document.getElementById('taskCategory');
const editTaskCategoryInput = document.getElementById('editTaskCategory');

// Function to create a category dropdown system
function createCategoryDropdownSystem(inputElement) {
  // Create wrapper div to contain both the input and dropdown
  const wrapper = document.createElement('div');
  wrapper.className = 'category-dropdown-wrapper';
  wrapper.style.position = 'relative';
  
  // Insert wrapper before the input
  inputElement.parentNode.insertBefore(wrapper, inputElement);
  
  // Move input inside wrapper
  wrapper.appendChild(inputElement);
  
  // Create dropdown element
  const dropdown = document.createElement('div');
  dropdown.className = 'category-dropdown';
  dropdown.style.position = 'absolute';
  dropdown.style.top = '100%';
  dropdown.style.left = '0';
  dropdown.style.width = '100%';
  dropdown.style.maxHeight = '200px';
  dropdown.style.overflowY = 'auto';
  dropdown.style.backgroundColor = 'white';
  dropdown.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  dropdown.style.borderRadius = '5px';
  dropdown.style.zIndex = '1000';
  dropdown.style.display = 'none';
  wrapper.appendChild(dropdown);
  
  // Function to update dropdown with current categories
  function updateCategoryDropdown() {
    dropdown.innerHTML = '';
    
    // Add option to create new category if input has value
    if (inputElement.value.trim() !== '') {
      const newCategoryOption = document.createElement('div');
      newCategoryOption.className = 'category-option new-category';
      newCategoryOption.style.padding = '10px';
      newCategoryOption.style.cursor = 'pointer';
      newCategoryOption.style.borderBottom = '1px solid #f1f1f1';
      newCategoryOption.style.backgroundColor = '#f8f9fa';
      newCategoryOption.innerHTML = `<strong>Create new:</strong> "${inputElement.value.trim()}"`;
      
      newCategoryOption.addEventListener('mouseover', () => {
        newCategoryOption.style.backgroundColor = '#e9ecef';
      });
      
      newCategoryOption.addEventListener('mouseout', () => {
        newCategoryOption.style.backgroundColor = '#f8f9fa';
      });
      
      newCategoryOption.addEventListener('click', () => {
        // Keep the current value (creating a new category)
        dropdown.style.display = 'none';
      });
      
      dropdown.appendChild(newCategoryOption);
    }
    
    // Add existing categories that match input value
    if (categories.size > 0) {
      let foundMatch = false;
      const searchTerm = inputElement.value.toLowerCase();
      
      categories.forEach(category => {
        if (searchTerm === '' || category.toLowerCase().includes(searchTerm)) {
          foundMatch = true;
          const option = document.createElement('div');
          option.className = 'category-option';
          option.textContent = category;
          option.style.padding = '10px';
          option.style.cursor = 'pointer';
          
          option.addEventListener('mouseover', () => {
            option.style.backgroundColor = '#f1f1f1';
          });
          
          option.addEventListener('mouseout', () => {
            option.style.backgroundColor = 'white';
          });
          
          option.addEventListener('click', () => {
            inputElement.value = category;
            dropdown.style.display = 'none';
          });
          
          dropdown.appendChild(option);
        }
      });
      
      if (!foundMatch && searchTerm === '') {
        const noResults = document.createElement('div');
        noResults.style.padding = '10px';
        noResults.style.color = '#6c757d';
        noResults.textContent = 'No categories available';
        dropdown.appendChild(noResults);
      }
    } else if (inputElement.value.trim() === '') {
      const noResults = document.createElement('div');
      noResults.style.padding = '10px';
      noResults.style.color = '#6c757d';
      noResults.textContent = 'No categories available';
      dropdown.appendChild(noResults);
    }
    
    // Only show dropdown if it has content
    if (dropdown.children.length > 0) {
      dropdown.style.display = 'block';
    } else {
      dropdown.style.display = 'none';
    }
  }
  
  // Show dropdown when focusing on input
  inputElement.addEventListener('focus', () => {
    updateCategoryDropdown();
  });
  
  // Update dropdown as user types
  inputElement.addEventListener('input', () => {
    updateCategoryDropdown();
  });
  
  // Hide dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
  
  // Prevent dropdown from closing when clicking inside it
  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  return updateCategoryDropdown;
}

// Create the dropdown for the add task form
const updateAddTaskDropdown = createCategoryDropdownSystem(taskCategoryInput);
  
// Create the dropdown for the edit task form
const updateEditTaskDropdown = createCategoryDropdownSystem(editTaskCategoryInput);

// Update dropdowns when categories change
const originalRenderCategories = renderCategories;
renderCategories = function() {
  originalRenderCategories();
  updateAddTaskDropdown();
  updateEditTaskDropdown();
};

    

    // Replace all existing sort dropdown code with this
const sortButton = document.getElementById('sortButton');

sortButton.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Remove any existing dropdown first
    const existingDropdown = document.getElementById('dynamicSortDropdown');
    if (existingDropdown) {
        existingDropdown.remove();
        return;
    }
    
    // Create a new dropdown menu
    const dropdown = document.createElement('div');
    dropdown.id = 'dynamicSortDropdown';
    
    // Position it relative to the button
    const buttonRect = sortButton.getBoundingClientRect();
    const topPosition = buttonRect.bottom + window.scrollY;
    const leftPosition = buttonRect.left + window.scrollX;
    
    // Style the dropdown
    dropdown.style.position = 'absolute';
    dropdown.style.top = topPosition + 'px';
    dropdown.style.left = leftPosition + 'px';
    dropdown.style.backgroundColor = 'white';
    dropdown.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    dropdown.style.borderRadius = '5px';
    dropdown.style.minWidth = '160px';
    dropdown.style.zIndex = '9999';
    
    // Add sort options
    const options = [
        { text: 'Due Date', value: 'dueDate' },
        { text: 'Priority', value: 'priority' },
        { text: 'Alphabetical', value: 'alphabetical' }
    ];
    
    options.forEach(option => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = option.text;
        link.style.display = 'block';
        link.style.padding = '10px';
        link.style.textDecoration = 'none';
        link.style.color = '#343a40';
        
        // Hover effect
        link.addEventListener('mouseover', () => {
            link.style.backgroundColor = '#f1f1f1';
        });
        link.addEventListener('mouseout', () => {
            link.style.backgroundColor = 'white';
        });
        
        // Click handler
        link.addEventListener('click', function(e) {
            e.preventDefault();
            sortTasks(option.value);
            dropdown.remove();
            sortButton.textContent = 'Sort By: ' + option.text + ' ▼';
        });
        
        dropdown.appendChild(link);
    });
    
    // Add the dropdown to the document
    document.body.appendChild(dropdown);
    
    // Close dropdown when clicking outside
    const closeDropdown = function(event) {
        if (!dropdown.contains(event.target) && event.target !== sortButton) {
            dropdown.remove();
            document.removeEventListener('click', closeDropdown);
        }
    };
    
    // Use setTimeout to prevent the dropdown from closing immediately
    setTimeout(() => {
        document.addEventListener('click', closeDropdown);
    }, 0);
});
    
    // Variables
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let categories = new Set();
    let currentFilter = 'all';
    let currentCategory = 'all';
    
    // Render tasks
    function renderTasks() {
        // Clear task items
        taskItems.innerHTML = '';
        
        // Filter tasks based on current filter and category
        let filteredTasks = tasks;
        
        if (currentFilter === 'active') {
            filteredTasks = filteredTasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.completed);
        }
        
        if (currentCategory !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.category === currentCategory);
        }
        
        // If no tasks, show empty state
        if (filteredTasks.length === 0) {
            taskItems.innerHTML = `
                <div class="empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <h3>No tasks found</h3>
                    <p>Add a new task to get started!</p>
                </div>
            `;
            return;
        }
        
        // Render each task
        filteredTasks.forEach(task => {
            // Format date
            const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date';
            
            // Create task element
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item', 'fade-in');
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskElement.setAttribute('data-id', task.id);
            taskElement.setAttribute('draggable', true);
            
            // Set task HTML content
            taskElement.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <div class="task-content">
                    <h3 class="task-text">${task.title}</h3>
                    <div class="task-date">Due: ${dueDate}</div>
                    ${task.description ? `<p>${task.description}</p>` : ''}
                    ${task.category ? `<div class="task-date">Category: ${task.category}</div>` : ''}
                </div>
                <span class="task-priority priority-${task.priority}">${task.priority}</span>
                <div class="task-actions">
                    <button class="task-action-btn edit-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="task-action-btn delete-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            `;
            
            // Add task element to DOM
            taskItems.appendChild(taskElement);
            
            // Add event listeners
            const checkbox = taskElement.querySelector('.task-checkbox');
            const editBtn = taskElement.querySelector('.edit-btn');
            const deleteBtn = taskElement.querySelector('.delete-btn');
            
            checkbox.addEventListener('change', function() {
                toggleTaskCompletion(task.id);
            });
            
            editBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                openEditModal(task.id);
            });
            
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                deleteTask(task.id);
            });
            
            // Add drag and drop functionality
            taskElement.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', task.id);
                this.classList.add('dragging');
                dropArea.classList.add('active');
            });
            
            taskElement.addEventListener('dragend', function() {
                this.classList.remove('dragging');
                dropArea.classList.remove('active');
            });
        });
    }
    
    // Render categories
    function renderCategories() {
        // Clear categories
        categoryList.innerHTML = '';
        categories = new Set();
        
        // Get all unique categories
        tasks.forEach(task => {
            if (task.category) {
                categories.add(task.category);
            }
        });
        
        // Render each category
        categories.forEach(category => {
            // Count tasks in this category
            const count = tasks.filter(task => task.category === category).length;
            
            // Create category element
            const categoryElement = document.createElement('div');
            categoryElement.classList.add('category-item');
            if (currentCategory === category) {
                categoryElement.classList.add('active');
            }
            categoryElement.setAttribute('data-category', category);
            
            // Set category HTML content
            categoryElement.innerHTML = `
                <span>${category}</span>
                <span class="category-count">${count}</span>
            `;
            
            // Add category element to DOM
            categoryList.appendChild(categoryElement);
            
            // Add event listener
            categoryElement.addEventListener('click', function() {
                currentCategory = category;
                updateActiveCategory();
                renderTasks();
            });
        });
        
        // Update all tasks count
        allCountElement.textContent = tasks.length;
    }
    
    // Add new task
    function addTask(title, description, priority, dueDate, category) {
        const task = {
            id: Date.now().toString(),
            title,
            description,
            priority,
            dueDate,
            category,
            completed: false,
            createdAt: new Date()
        };
        
        tasks.push(task);
        saveTasks();
        renderTasks();
        renderCategories();
    }
    
    // Delete task
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
        renderCategories();
    }
    
    // Toggle task completion
    function toggleTaskCompletion(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        saveTasks();
        renderTasks();
    }
    
    // Edit task
    function editTask(id, title, description, priority, dueDate, category) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    title,
                    description,
                    priority,
                    dueDate,
                    category
                };
            }
            return task;
        });
        
        saveTasks();
        renderTasks();
        renderCategories();
    }
    
    // Open edit modal
    function openEditModal(id) {
        const task = tasks.find(task => task.id === id);
        if (!task) return;
        
        document.getElementById('editTaskId').value = task.id;
        document.getElementById('editTaskTitle').value = task.title;
        document.getElementById('editTaskDescription').value = task.description || '';
        document.getElementById('editTaskPriority').value = task.priority;
        document.getElementById('editTaskDueDate').value = task.dueDate || '';
        document.getElementById('editTaskCategory').value = task.category || '';
        
        editModal.classList.add('active');
    }
    
    // Close edit modal
    function closeEditModal() {
        editModal.classList.remove('active');
    }
    
    // Update active filter
    function updateActiveFilter() {
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === currentFilter) {
                btn.classList.add('active');
            }
        });
    }
    
    // Update active category
    function updateActiveCategory() {
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-category') === currentCategory) {
                item.classList.add('active');
            }
        });
        
        // Make sure "All Tasks" is active if currentCategory is 'all'
        if (currentCategory === 'all') {
            document.querySelector('.category-item[data-category="all"]').classList.add('active');
        }
    }
    
    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Clear all tasks
    function clearAllTasks() {
document.getElementById('clearConfirmModal').classList.add('active');
}

// Add these event listeners
document.getElementById('closeClearModal').addEventListener('click', function() {
document.getElementById('clearConfirmModal').classList.remove('active');
});

document.getElementById('cancelClearBtn').addEventListener('click', function() {
document.getElementById('clearConfirmModal').classList.remove('active');
});

document.getElementById('confirmClearBtn').addEventListener('click', function() {
tasks = [];
saveTasks();
renderTasks();
renderCategories();
document.getElementById('clearConfirmModal').classList.remove('active');
});

// Update the clear all button to use the new function
clearAllBtn.addEventListener('click', clearAllTasks);
    
    // Event listeners
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const priority = document.getElementById('taskPriority').value;
        const dueDate = document.getElementById('taskDueDate').value;
        const category = document.getElementById('taskCategory').value;
        
        addTask(title, description, priority, dueDate, category);
        this.reset();
    });
    
    editTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const id = document.getElementById('editTaskId').value;
        const title = document.getElementById('editTaskTitle').value;
        const description = document.getElementById('editTaskDescription').value;
        const priority = document.getElementById('editTaskPriority').value;
        const dueDate = document.getElementById('editTaskDueDate').value;
        const category = document.getElementById('editTaskCategory').value;
        
        editTask(id, title, description, priority, dueDate, category);
        closeEditModal();
    });
    
    document.getElementById('closeEditModal').addEventListener('click', closeEditModal);
    document.getElementById('cancelEditBtn').addEventListener('click', closeEditModal);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currentFilter = this.getAttribute('data-filter');
            updateActiveFilter();
            renderTasks();
        });
    });
    
    document.querySelector('.category-item[data-category="all"]').addEventListener('click', function() {
        currentCategory = 'all';
        updateActiveCategory();
        renderTasks();
    });
    
    clearAllBtn.addEventListener('click', clearAllTasks);
    
    // Drop area functionality
    dropArea.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    
    dropArea.addEventListener('drop', function(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: true };
            }
            return task;
        });
        saveTasks();
        renderTasks();
    });
    
    // Initial render
    renderTasks();
    renderCategories();
    
    // Theme toggling
    function detectColorScheme() {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (localStorage.getItem('theme')) {
            return localStorage.getItem('theme');
        } else {
            return darkModeMediaQuery.matches ? 'dark' : 'light';
        }
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + A to add new task (focus on the task title field)
        if ((e.ctrlKey || e.metaKey) && e.key === 'a' && !e.target.closest('input, textarea')) {
            e.preventDefault();
            document.getElementById('taskTitle').focus();
        }
        
        // Escape key to close modal
        if (e.key === 'Escape' && editModal.classList.contains('active')) {
            closeEditModal();
        }
    });
    
    // Support for local time zones
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('taskDueDate').setAttribute('min', today);
    document.getElementById('editTaskDueDate').setAttribute('min', today);
    
    // Add sort functionality
    function sortTasks(sortBy) {
        switch (sortBy) {
            case 'dueDate':
                tasks.sort((a, b) => {
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    return new Date(a.dueDate) - new Date(b.dueDate);
                });
                break;
            case 'priority':
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
                break;
            case 'alphabetical':
                tasks.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'createdAt':
            default:
                tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        
        saveTasks();
        renderTasks();
    }
    
    
    
    // Search functionality
    function searchTasks(query) {
        if (!query) {
            renderTasks();
            return;
        }
        
        const searchResults = tasks.filter(task => {
            return (
                task.title.toLowerCase().includes(query.toLowerCase()) ||
                (task.description && task.description.toLowerCase().includes(query.toLowerCase())) ||
                (task.category && task.category.toLowerCase().includes(query.toLowerCase()))
            );
        });
        
        taskItems.innerHTML = '';
        
        if (searchResults.length === 0) {
            taskItems.innerHTML = `
                <div class="empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <h3>No results found</h3>
                    <p>Try a different search term</p>
                </div>
            `;
            return;
        }
        
        // Similar rendering logic as in renderTasks() but with searchResults instead
        searchResults.forEach(task => {
            // Format date
            const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date';
            
            // Create task element
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item', 'fade-in');
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskElement.setAttribute('data-id', task.id);
            taskElement.setAttribute('draggable', true);
            
            // Same HTML structure as in renderTasks()
            taskElement.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <div class="task-content">
                    <h3 class="task-text">${task.title}</h3>
                    <div class="task-date">Due: ${dueDate}</div>
                    ${task.description ? `<p>${task.description}</p>` : ''}
                    ${task.category ? `<div class="task-date">Category: ${task.category}</div>` : ''}
                </div>
                <span class="task-priority priority-${task.priority}">${task.priority}</span>
                <div class="task-actions">
                    <button class="task-action-btn edit-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="task-action-btn delete-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            `;
            
            // Add task element to DOM
            taskItems.appendChild(taskElement);
            
            // Add same event listeners as in renderTasks()
            const checkbox = taskElement.querySelector('.task-checkbox');
            const editBtn = taskElement.querySelector('.edit-btn');
            const deleteBtn = taskElement.querySelector('.delete-btn');
            
            checkbox.addEventListener('change', function() {
                toggleTaskCompletion(task.id);
            });
            
            editBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                openEditModal(task.id);
            });
            
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                deleteTask(task.id);
            });
        });
    }
    
    // Add search box
    const searchBox = document.createElement('input');
    searchBox.type = 'text';
    searchBox.className = 'form-control';
    searchBox.placeholder = 'Search tasks...';
    searchBox.style.margin = '1rem 0';
    
    searchBox.addEventListener('input', function() {
        searchTasks(this.value);
    });
    
    document.querySelector('.task-list h2').after(searchBox);
});