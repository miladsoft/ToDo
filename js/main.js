// Animated icon set (Lucide-based paths). Parts carry classes the CSS animates on hover.
const ICONS = {
    'check': '<path class="draw" pathLength="1" d="M20 6 9 17l-5-5"/>',
    'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
    'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'sun': '<circle cx="12" cy="12" r="4"/><g class="rays"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></g>',
    'moon': '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path class="star" d="M19 3v4"/><path class="star" d="M21 5h-4"/>',
    'users': '<g class="front"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></g><g class="back"><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></g>',
    'user': '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    'user-plus': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><g class="pop"><path d="M19 8v6"/><path d="M22 11h-6"/></g>',
    'more': '<circle class="d1" cx="5" cy="12" r="1.2"/><circle class="d2" cx="12" cy="12" r="1.2"/><circle class="d3" cx="19" cy="12" r="1.2"/>',
    'search': '<g class="lens"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></g>',
    'trash': '<g class="lid"><path d="M3 6h18"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></g><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/>',
    'flag': '<path class="cloth" d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
    'arrow-up': '<g class="arrow"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></g>',
    'arrow-down': '<g class="arrow"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></g>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><g class="arrow"><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></g>',
    'upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><g class="arrow"><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/></g>',
    'clock': '<circle cx="12" cy="12" r="10"/><path class="hand" d="M12 6v6l4 2"/>',
    'history': '<g class="spin"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></g><path class="hand" d="M12 7v5l4 2"/>',
    'circle-check': '<circle cx="12" cy="12" r="10"/><path class="draw" pathLength="1" d="m9 12 2 2 4-4"/>',
    'inbox': '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    'hourglass': '<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>',
    'chevron': '<path d="m6 9 6 6 6-6"/>',
    'swap': '<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',
    'pencil': '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
    'text': '<path d="M17 6H3"/><path d="M21 12H3"/><path d="M15 18H3"/>',
    'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'
};

Vue.component('a-icon', {
    functional: true,
    props: {
        name: { type: String, required: true },
        size: { type: Number, default: 18 },
        stroke: { type: Number, default: 2 }
    },
    render(h, ctx) {
        const p = ctx.props;
        return h('svg', Object.assign({}, ctx.data, {
            class: ['ai', 'ai-' + p.name, ctx.data.class],
            attrs: Object.assign({
                viewBox: '0 0 24 24',
                width: p.size,
                height: p.size,
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': p.stroke,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'aria-hidden': 'true'
            }, ctx.data.attrs),
            domProps: { innerHTML: ICONS[p.name] || '' }
        }));
    }
});

// Sliding number: each digit is a vertical reel that springs to its value.
Vue.component('n-roll', {
    props: {
        value: { type: [Number, String], default: 0 }
    },
    computed: {
        digits() {
            const str = String(this.value);
            // Key from the right so the ones digit keeps its element (and animates) as the number grows.
            return str.split('').map((c, i) => ({ c, k: str.length - 1 - i, isDigit: c >= '0' && c <= '9' }));
        }
    },
    template: '<span class="roll" :aria-label="String(value)">' +
        '<span v-for="d in digits" :key="d.k" class="roll-d" :class="{ \'is-num\': d.isDigit }" aria-hidden="true">' +
        '<span class="roll-ghost">{{ d.c }}</span>' +
        '<span v-if="d.isDigit" class="roll-reel" :style="{ transform: \'translateY(\' + (-Number(d.c) * 10) + \'%)\' }">' +
        '<span v-for="n in 10" :key="n">{{ n - 1 }}</span>' +
        '</span>' +
        '</span>' +
        '</span>'
});

const COLUMN_KEYS = ['todo', 'doing', 'done'];
const PRIORITIES = ['normal', 'high', 'low'];

new Vue({
    el: '#app',
    data: {
        // Theme (seeded from the pre-paint script so the toggle icon doesn't animate on load)
        theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
        _themeMql: null,
        _themeMqlHandler: null,

        // Intro
        ready: false,
        introDone: false,

        // Tasks
        tasks: [],
        newTaskText: '',
        newTaskPriority: 'normal',
        searchQuery: '',
        draggedTask: null,
        dragOverColumn: null,
        justDone: null,

        // Team
        teamMembers: [],
        newMemberName: '',
        newMemberRole: '',
        selectedMember: null,

        // Layout
        activeColumn: 'todo',
        showMenu: false,

        // Modals
        showTaskModal: false,
        showTeamModal: false,
        currentTask: null,

        // Toast
        toast: { id: 0, message: '', visible: false },

        // Stats
        stats: {
            todo: 0,
            doing: 0,
            done: 0
        },

        statusOptions: [
            { value: 'todo', label: 'To Do' },
            { value: 'doing', label: 'Doing' },
            { value: 'done', label: 'Done' }
        ],

        priorityOptions: [
            { value: 'low', label: 'Low' },
            { value: 'normal', label: 'Normal' },
            { value: 'high', label: 'High' }
        ],

        // Colors for avatars
        avatarColors: [
            '#ff3b30', '#007aff', '#34c759', '#ff9500',
            '#af52de', '#5ac8fa', '#ff2d55', '#5856d6',
            '#30b0c7', '#a2845e', '#64d2ff', '#bf5af2',
            '#ff6482', '#32ade6', '#8e8e93', '#1d1d1f'
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
        },

        columns() {
            return [
                { key: 'todo', title: 'To Do', color: 'var(--accent)', tasks: this.filteredTodoTasks, emptyIcon: 'inbox', emptyText: 'All clear', emptyHint: 'Add a task below to get started' },
                { key: 'doing', title: 'Doing', color: 'var(--orange)', tasks: this.filteredDoingTasks, emptyIcon: 'hourglass', emptyText: 'Nothing in progress', emptyHint: 'Drag a task here or set its status' },
                { key: 'done', title: 'Done', color: 'var(--green)', tasks: this.filteredDoneTasks, emptyIcon: 'circle-check', emptyText: 'No completed tasks', emptyHint: 'Tap the circle on a task to finish it' }
            ];
        },

        activeIndex() {
            return Math.max(0, COLUMN_KEYS.indexOf(this.activeColumn));
        },

        isFiltering() {
            return !!this.searchQuery || this.selectedMember !== null;
        },

        completion() {
            return this.tasks.length ? Math.round((this.stats.done / this.tasks.length) * 100) : 0;
        },

        todayLabel() {
            return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
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
        this.initTheme();
        this.loadTasks();
        this.loadTeam();
        this.updateStats();

        this._onKeydown = (e) => this.onKeydown(e);
        this._onResize = () => this.syncBoardScroll(false);
        window.addEventListener('keydown', this._onKeydown);
        window.addEventListener('resize', this._onResize);

        this.$nextTick(() => this.playIntro());
    },

    beforeDestroy() {
        window.removeEventListener('keydown', this._onKeydown);
        window.removeEventListener('resize', this._onResize);
        try {
            if (this._themeMql && this._themeMqlHandler) {
                if (this._themeMql.removeEventListener) this._themeMql.removeEventListener('change', this._themeMqlHandler);
                else if (this._themeMql.removeListener) this._themeMql.removeListener(this._themeMqlHandler);
            }
        } catch (e) {}
    },

    methods: {
        // Intro: splash logo flies into the header mark, then the UI rises in.
        playIntro() {
            const splash = document.getElementById('splash');
            const done = () => {
                this.introDone = true;
                if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
            };

            if (!splash) {
                this.ready = true;
                this.introDone = true;
                return;
            }

            let reduce = false;
            try {
                reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            } catch (e) {}

            // Let the splash breathe so the logo draw animation completes.
            const wait = Math.max(0, 1150 - performance.now());

            setTimeout(() => {
                const from = splash.querySelector('.splash-mark');
                const to = this.$refs.appMark;

                if (reduce || !from || !to || !from.animate) {
                    this.ready = true;
                    splash.classList.add('fade');
                    setTimeout(done, 350);
                    return;
                }

                const a = from.getBoundingClientRect();
                const b = to.getBoundingClientRect();
                const dx = (b.left + b.width / 2) - (a.left + a.width / 2);
                const dy = (b.top + b.height / 2) - (a.top + a.height / 2);
                const scale = b.width / a.width;

                let easing = 'cubic-bezier(0.34, 1.3, 0.64, 1)';
                try {
                    if (CSS.supports('animation-timing-function', 'linear(0, 1)')) {
                        easing = getComputedStyle(document.documentElement).getPropertyValue('--spring').trim() || easing;
                    }
                } catch (e) {}

                // Freeze the CSS entrance animation so WAAPI starts from the settled pose.
                from.style.animation = 'none';
                splash.classList.add('leaving');
                this.ready = true;

                const anim = from.animate([
                    { transform: 'translate(0, 0) scale(1)', boxShadow: '0 20px 50px rgba(0, 122, 255, 0.35)' },
                    { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + scale + ')', boxShadow: '0 6px 16px rgba(0, 122, 255, 0.3)' }
                ], { duration: 850, easing: easing, fill: 'forwards' });

                anim.onfinish = done;
                // Safety net in case the animation is interrupted (e.g. background tab).
                setTimeout(done, 1400);
            }, wait);
        },

        // Theme
        getSystemTheme() {
            try {
                const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
                return mql && mql.matches ? 'dark' : 'light';
            } catch (e) {
                return 'light';
            }
        },

        updateThemeColorMeta(theme) {
            const meta = document.querySelector('meta[name="theme-color"]');
            if (!meta) return;
            meta.setAttribute('content', theme === 'dark' ? '#0b0b0d' : '#f5f5f7');
        },

        applyTheme(theme, persist) {
            const next = theme === 'dark' ? 'dark' : 'light';
            this.theme = next;
            document.documentElement.setAttribute('data-theme', next);
            this.updateThemeColorMeta(next);

            if (persist) {
                try {
                    localStorage.setItem('todo-theme', next);
                } catch (e) {}
            }
        },

        initTheme() {
            let saved = null;
            try {
                saved = localStorage.getItem('todo-theme');
            } catch (e) {}

            const initial = saved || this.getSystemTheme();
            this.applyTheme(initial, false);

            // Follow system theme only if user hasn't explicitly chosen one.
            try {
                if (!saved && window.matchMedia) {
                    const mql = window.matchMedia('(prefers-color-scheme: dark)');
                    const handler = () => {
                        let stillNoSaved = true;
                        try {
                            stillNoSaved = !localStorage.getItem('todo-theme');
                        } catch (e) {}
                        if (stillNoSaved) {
                            this.applyTheme(mql.matches ? 'dark' : 'light', false);
                        }
                    };

                    this._themeMql = mql;
                    this._themeMqlHandler = handler;
                    if (mql.addEventListener) mql.addEventListener('change', handler);
                    else if (mql.addListener) mql.addListener(handler);
                }
            } catch (e) {}
        },

        toggleTheme() {
            const next = this.theme === 'dark' ? 'light' : 'dark';
            this.applyTheme(next, true);
        },

        // Task Management
        addTask() {
            const taskText = this.newTaskText.trim();
            if (taskText) {
                const task = {
                    id: Date.now() + Math.random(),
                    text: taskText,
                    description: '',
                    status: 'todo',
                    priority: this.newTaskPriority,
                    // Keep the new task visible when the board is filtered by a member.
                    assignee: this.selectedMember,
                    createdAt: new Date().toISOString(),
                    activityLog: [
                        {
                            type: 'created',
                            text: 'Task created',
                            timestamp: new Date().toISOString()
                        }
                    ]
                };

                this.tasks.unshift(task);
                this.newTaskText = '';
                this.newTaskPriority = 'normal';
                this.setActiveColumn('todo');
                this.showNotification('Task added');
            }
        },

        deleteTask() {
            if (confirm('Are you sure you want to delete this task?')) {
                const index = this.tasks.findIndex(t => t.id === this.currentTask.id);
                if (index > -1) {
                    this.tasks.splice(index, 1);
                    this.closeTaskModal();
                    this.showNotification('Task deleted');
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

        setTaskField(field, value) {
            if (!this.currentTask || this.currentTask[field] === value) return;
            this.currentTask[field] = value;
            this.updateTask(field);
        },

        moveTask(task, newStatus) {
            if (!task || task.status === newStatus) return;
            const oldStatus = task.status;
            task.status = newStatus;
            task.activityLog.unshift({
                type: 'status',
                text: `Moved from ${this.getStatusLabel(oldStatus)} to ${this.getStatusLabel(newStatus)}`,
                timestamp: new Date().toISOString()
            });
            this.saveTasks();
        },

        toggleDone(task) {
            const next = task.status === 'done' ? 'todo' : 'done';
            this.moveTask(task, next);
            if (next === 'done') {
                this.justDone = task.id;
                setTimeout(() => {
                    if (this.justDone === task.id) this.justDone = null;
                }, 700);
                this.showNotification('Nice — task completed');
            }
        },

        cyclePriority() {
            const i = PRIORITIES.indexOf(this.newTaskPriority);
            this.newTaskPriority = PRIORITIES[(i + 1) % PRIORITIES.length];
        },

        optionIndex(options, value) {
            return Math.max(0, options.findIndex(o => o.value === value));
        },

        // Drag and Drop
        onDragStart(task, event) {
            this.draggedTask = task;
            event.dataTransfer.effectAllowed = 'move';
            try {
                event.dataTransfer.setData('text/plain', task.text);
            } catch (e) {}
        },

        onDragEnd() {
            this.draggedTask = null;
            this.dragOverColumn = null;
        },

        onDragOver(status, event) {
            if (!this.draggedTask) return;
            event.dataTransfer.dropEffect = 'move';
            this.dragOverColumn = status;
        },

        onDrop(newStatus) {
            if (this.draggedTask && this.draggedTask.status !== newStatus) {
                this.moveTask(this.draggedTask, newStatus);
                this.showNotification(`Moved to ${this.getStatusLabel(newStatus)}`);
            }
            this.draggedTask = null;
            this.dragOverColumn = null;
        },

        // Mobile column paging (scroll-snap board synced with the tabs)
        isPaged() {
            const board = this.$refs.board;
            return !!board && board.scrollWidth > board.clientWidth + 1;
        },

        setActiveColumn(key) {
            this.activeColumn = key;
            this.syncBoardScroll(true);
        },

        syncBoardScroll(smooth) {
            const board = this.$refs.board;
            if (!board || !this.isPaged()) return;
            board.scrollTo({ left: this.activeIndex * board.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
        },

        onBoardScroll() {
            if (this._scrollRaf) return;
            this._scrollRaf = requestAnimationFrame(() => {
                this._scrollRaf = null;
                const board = this.$refs.board;
                if (!board || !this.isPaged()) return;
                const idx = Math.round(board.scrollLeft / board.clientWidth);
                const key = COLUMN_KEYS[Math.min(COLUMN_KEYS.length - 1, Math.max(0, idx))];
                if (key !== this.activeColumn) this.activeColumn = key;
            });
        },

        onKeydown(e) {
            if (e.key === 'Escape') {
                if (this.showTaskModal) this.closeTaskModal();
                else if (this.showTeamModal) this.showTeamModal = false;
                else if (this.showMenu) this.showMenu = false;
                return;
            }
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (this.$refs.search) this.$refs.search.focus();
            }
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
                this.showNotification(`${name} joined the team`);
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

                    this.showNotification('Team member removed');
                }
            }
        },

        // Helper Methods
        getInitials(name) {
            return name
                .split(' ')
                .filter(Boolean)
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
            if (!assigneeId) return '#8e8e93';
            const member = this.teamMembers.find(m => m.id === assigneeId);
            return member ? member.color : '#8e8e93';
        },

        getPriorityIcon(priority) {
            return priority === 'low' ? 'arrow-down' : 'flag';
        },

        getPriorityLabel(priority) {
            return {
                'high': 'High',
                'normal': 'Normal',
                'low': 'Low'
            }[priority] || 'Normal';
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
                'created': { icon: 'plus', color: '#34c759' },
                'status': { icon: 'swap', color: '#007aff' },
                'priority': { icon: 'flag', color: '#ff9500' },
                'assignee': { icon: 'user', color: '#af52de' },
                'title': { icon: 'pencil', color: '#30b0c7' },
                'description': { icon: 'text', color: '#5856d6' }
            };
            return icons[type] || { icon: 'info', color: '#8e8e93' };
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
            this.showNotification('Data exported');
        },

        importData() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;
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
                        this.showNotification('Data imported');
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
                this.showNotification('Completed tasks cleared');
            }
        },

        showNotification(message) {
            clearTimeout(this._toastTimer);
            this.toast = { id: this.toast.id + 1, message, visible: true };
            this._toastTimer = setTimeout(() => {
                this.toast.visible = false;
            }, 2200);
        }
    }
});
