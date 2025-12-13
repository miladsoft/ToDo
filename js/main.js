new Vue({
    el: '#app',
    data: {
        // Tasks
        tasks: [],
        newTaskText: '',
        searchQuery: '',
        draggedTask: null,
        
        // Team
        teamMembers: [],
        newMemberName: '',
        newMemberRole: '',
        selectedMember: null,
        
        // Modals
        showTaskModal: false,
        showTeamModal: false,
        currentTask: null,
        
        // Stats
        stats: {
            todo: 0,
            doing: 0,
            done: 0
        },
        
        // Colors for avatars
        avatarColors: [
            '#e74c3c', '#3498db', '#2ecc71', '#f39c12', 
            '#9b59b6', '#1abc9c', '#e67e22', '#34495e',
            '#16a085', '#27ae60', '#2980b9', '#8e44ad',
            '#d35400', '#c0392b', '#7f8c8d', '#2c3e50'
        ]
    },
    
    computed: {
        // Filtered tasks by search and member
        filteredTasks() {
            let filtered = this.tasks;
            
            // Filter by search query
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(task => 
                    task.text.toLowerCase().includes(query) ||
                    (task.description && task.description.toLowerCase().includes(query))
                );
            }
            
            // Filter by selected member
            if (this.selectedMember !== null) {
                filtered = filtered.filter(task => task.assignee === this.selectedMember);
            }
            
            return filtered;
        },
        
        filteredTodoTasks() {
            return this.filteredTasks.filter(task => task.status === 'todo');
        },
        
        filteredDoingTasks() {
            return this.filteredTasks.filter(task => task.status === 'doing');
        },
        
        filteredDoneTasks() {
            return this.filteredTasks.filter(task => task.status === 'done');
        }
    },
    
    watch: {
        tasks: {
            handler() {
                this.updateStats();
                this.saveTasks();
            },
            deep: true
        },
        
        teamMembers: {
            handler() {
                this.saveTeam();
            },
            deep: true
        }
    },
    
    mounted() {
        this.loadTasks();
        this.loadTeam();
        this.updateStats();
    },
    
    methods: {
        // Task Management
        addTask() {
            const taskText = this.newTaskText.trim();
            if (taskText) {
                const task = {
                    id: Date.now() + Math.random(),
                    text: taskText,
                    description: '',
                    status: 'todo',
                    priority: 'normal',
                    assignee: null,
                    createdAt: new Date().toISOString(),
                    activityLog: [
                        {
                            type: 'created',
                            text: 'Task created',
                            timestamp: new Date().toISOString()
                        }
                    ]
                };
                
                this.tasks.push(task);
                this.newTaskText = '';
                this.showNotification('Task added successfully!');
            }
        },
        
        deleteTask() {
            if (confirm('Are you sure you want to delete this task?')) {
                const index = this.tasks.findIndex(t => t.id === this.currentTask.id);
                if (index > -1) {
                    this.tasks.splice(index, 1);
                    this.closeTaskModal();
                    this.showNotification('Task deleted!');
                }
            }
        },
        
        updateTask(field) {
            if (!this.currentTask) return;
            
            const task = this.tasks.find(t => t.id === this.currentTask.id);
            if (task) {
                // Log the change
                let logText = '';
                switch(field) {
                    case 'title':
                        logText = `Title updated to "${this.currentTask.text}"`;
                        break;
                    case 'status':
                        logText = `Status changed to ${this.getStatusLabel(this.currentTask.status)}`;
                        break;
                    case 'priority':
                        logText = `Priority changed to ${this.currentTask.priority}`;
                        break;
                    case 'assignee':
                        const assigneeName = this.getAssigneeName(this.currentTask.assignee);
                        logText = this.currentTask.assignee 
                            ? `Assigned to ${assigneeName}`
                            : 'Unassigned';
                        break;
                    case 'description':
                        logText = 'Description updated';
                        break;
                }
                
                if (logText) {
                    this.currentTask.activityLog.unshift({
                        type: field,
                        text: logText,
                        timestamp: new Date().toISOString()
                    });
                }
                
                // Update the task
                Object.assign(task, this.currentTask);
                this.saveTasks();
            }
        },
        
        // Drag and Drop
        onDragStart(task, event) {
            this.draggedTask = task;
            event.dataTransfer.effectAllowed = 'move';
        },
        
        onDragEnd(event) {
            this.draggedTask = null;
        },
        
        onDragOver(event) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            event.dataTransfer.dropEffect = 'move';
            return false;
        },
        
        onDrop(newStatus, event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            
            if (this.draggedTask && this.draggedTask.status !== newStatus) {
                const oldStatus = this.draggedTask.status;
                this.draggedTask.status = newStatus;
                
                // Log the status change
                this.draggedTask.activityLog.unshift({
                    type: 'status',
                    text: `Moved from ${this.getStatusLabel(oldStatus)} to ${this.getStatusLabel(newStatus)}`,
                    timestamp: new Date().toISOString()
                });
                
                this.saveTasks();
                this.showNotification(`Task moved to ${this.getStatusLabel(newStatus)}!`);
            }
            
            return false;
        },
        
        // Modal Management
        openTaskModal(task) {
            this.currentTask = JSON.parse(JSON.stringify(task)); // Deep clone
            this.showTaskModal = true;
        },
        
        closeTaskModal() {
            this.showTaskModal = false;
            this.currentTask = null;
        },
        
        // Team Management
        addTeamMember() {
            const name = this.newMemberName.trim();
            const role = this.newMemberRole.trim() || 'Team Member';
            
            if (name) {
                const member = {
                    id: Date.now() + Math.random(),
                    name: name,
                    role: role,
                    initials: this.getInitials(name),
                    color: this.avatarColors[this.teamMembers.length % this.avatarColors.length]
                };
                
                this.teamMembers.push(member);
                this.newMemberName = '';
                this.newMemberRole = '';
                this.showNotification(`${name} added to team!`);
            }
        },
        
        removeTeamMember(memberId) {
            if (confirm('Remove this team member? Their assigned tasks will become unassigned.')) {
                // Unassign tasks
                this.tasks.forEach(task => {
                    if (task.assignee === memberId) {
                        task.assignee = null;
                        task.activityLog.unshift({
                            type: 'assignee',
                            text: 'Unassigned (team member removed)',
                            timestamp: new Date().toISOString()
                        });
                    }
                });
                
                // Remove member
                const index = this.teamMembers.findIndex(m => m.id === memberId);
                if (index > -1) {
                    this.teamMembers.splice(index, 1);
                    
                    // Reset selected member if it was removed
                    if (this.selectedMember === memberId) {
                        this.selectedMember = null;
                    }
                    
                    this.showNotification('Team member removed!');
                }
            }
        },
        
        // Helper Methods
        getInitials(name) {
            return name
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        },
        
        getAssigneeName(assigneeId) {
            if (!assigneeId) return 'Unassigned';
            const member = this.teamMembers.find(m => m.id === assigneeId);
            return member ? member.name : 'Unknown';
        },
        
        getAssigneeInitials(assigneeId) {
            if (!assigneeId) return '?';
            const member = this.teamMembers.find(m => m.id === assigneeId);
            return member ? member.initials : '?';
        },
        
        getAssigneeColor(assigneeId) {
            if (!assigneeId) return '#999';
            const member = this.teamMembers.find(m => m.id === assigneeId);
            return member ? member.color : '#999';
        },
        
        getPriorityColor(priority) {
            return {
                'high': '#d32f2f',
                'normal': '#1976d2',
                'low': '#999'
            }[priority] || '#1976d2';
        },
        
        getPriorityIcon(priority) {
            return {
                'high': 'fas fa-exclamation-circle',
                'normal': 'fas fa-minus-circle',
                'low': 'fas fa-arrow-down'
            }[priority] || 'fas fa-minus-circle';
        },
        
        getStatusLabel(status) {
            return {
                'todo': 'To Do',
                'doing': 'Doing',
                'done': 'Done'
            }[status] || status;
        },
        
        getActivityIcon(type) {
            const icons = {
                'created': { icon: 'fas fa-plus', color: '#2ecc71' },
                'status': { icon: 'fas fa-exchange-alt', color: '#3498db' },
                'priority': { icon: 'fas fa-flag', color: '#f39c12' },
                'assignee': { icon: 'fas fa-user', color: '#9b59b6' },
                'title': { icon: 'fas fa-edit', color: '#1abc9c' },
                'description': { icon: 'fas fa-align-left', color: '#34495e' }
            };
            return icons[type] || { icon: 'fas fa-info-circle', color: '#7f8c8d' };
        },
        
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const now = new Date();
            const diff = now - date;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            
            if (days === 0) {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                if (hours === 0) {
                    const minutes = Math.floor(diff / (1000 * 60));
                    return minutes <= 1 ? 'Just now' : `${minutes}m ago`;
                }
                return hours === 1 ? '1h ago' : `${hours}h ago`;
            }
            if (days === 1) return 'Yesterday';
            if (days < 7) return `${days}d ago`;
            if (days < 30) return `${Math.floor(days / 7)}w ago`;
            
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
            });
        },
        
        formatDateTime(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        
        updateStats() {
            this.stats.todo = this.tasks.filter(t => t.status === 'todo').length;
            this.stats.doing = this.tasks.filter(t => t.status === 'doing').length;
            this.stats.done = this.tasks.filter(t => t.status === 'done').length;
        },
        
        // Storage
        saveTasks() {
            try {
                localStorage.setItem('team-kanban-tasks', JSON.stringify(this.tasks));
            } catch (e) {
                console.error('Error saving tasks:', e);
            }
        },
        
        loadTasks() {
            try {
                const saved = localStorage.getItem('team-kanban-tasks');
                if (saved) {
                    this.tasks = JSON.parse(saved);
                }
            } catch (e) {
                console.error('Error loading tasks:', e);
            }
        },
        
        saveTeam() {
            try {
                localStorage.setItem('team-kanban-members', JSON.stringify(this.teamMembers));
            } catch (e) {
                console.error('Error saving team:', e);
            }
        },
        
        loadTeam() {
            try {
                const saved = localStorage.getItem('team-kanban-members');
                if (saved) {
                    this.teamMembers = JSON.parse(saved);
                }
            } catch (e) {
                console.error('Error loading team:', e);
            }
        },
        
        // Export/Import
        exportData() {
            const data = {
                tasks: this.tasks,
                teamMembers: this.teamMembers,
                exportedAt: new Date().toISOString()
            };
            
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `kanban-export-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            URL.revokeObjectURL(url);
            this.showNotification('Data exported successfully!');
        },
        
        importData() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = JSON.parse(event.target.result);
                        if (data.tasks && Array.isArray(data.tasks)) {
                            this.tasks = data.tasks;
                        }
                        if (data.teamMembers && Array.isArray(data.teamMembers)) {
                            this.teamMembers = data.teamMembers;
                        }
                        this.showNotification('Data imported successfully!');
                    } catch (e) {
                        alert('Error importing data. Please check the file format.');
                        console.error('Import error:', e);
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        },
        
        clearDone() {
            if (confirm('Clear all completed tasks?')) {
                this.tasks = this.tasks.filter(t => t.status !== 'done');
                this.showNotification('Completed tasks cleared!');
            }
        },
        
        showNotification(message) {
            // Simple console notification - can be enhanced with toast library
            console.log(`[NOTIFICATION] ${message}`);
        }
    }
});
