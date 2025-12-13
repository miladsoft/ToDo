# TODO - Professional Team Task Management 📋

> A powerful, feature-rich team collaboration tool with Kanban board, task assignment, complete activity tracking, and drag & drop functionality.

[![GitHub Pages](https://img.shields.io/badge/demo-live-success)](https://miladsoft.github.io/ToDo/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vue.js](https://img.shields.io/badge/vue.js-2.x-green.svg)](https://vuejs.org/)
[![PWA](https://img.shields.io/badge/PWA-enabled-blueviolet.svg)](PWA.md)

**[🚀 Live Demo](https://miladsoft.github.io/ToDo/)** | **[📖 Documentation](#features)** | **[📱 PWA Info](PWA.md)** | **[🐛 Report Bug](../../issues)**

---

## ✨ Features

### Core Functionality
- 👥 **Team Management** - Add/remove team members with roles
- 🎯 **Task Assignment** - Assign tasks to team members
- 🖱️ **Drag & Drop** - Seamlessly move tasks between columns
- ✅ **Full CRUD** - Create, read, update, delete tasks
- 💾 **Local Storage** - Automatic save and restore
- 📦 **Export/Import** - Backup and restore all data

### Advanced Task Features
- 📝 **Detailed Task View** - Double-click to open full details modal
- 📋 **Task Description** - Add detailed descriptions to tasks
- 📊 **Activity Log** - Complete history of all task changes
- ⏰ **Timestamps** - Track every action with date and time
- 🚀 **Priority System** - High, Normal, Low with visual indicators
- 🏷️ **Status Tracking** - Todo → Doing → Done workflow

### Team Collaboration
- 👤 **Member Profiles** - Avatar, name, and role for each member
- 🎨 **Color Coding** - Unique colors for easy identification
- 🔍 **Filter by Member** - View tasks for specific team members
- 📈 **Team Statistics** - Track team size and workload
- 🔄 **Reassignment** - Easy task reassignment between members

### Data Management
- 📤 **Export** - Download tasks as JSON
- 📥 **Import** - Import tasks from JSON file
- 🔄 **Sort** - Sort by date or priority
- 💯 **Progress Tracking** - Visual progress indicators

### UI/UX
- 🎨 **Modern Design** - Beautiful minimalist UI
- 📱 **Responsive** - Works on all devices
- ⚡ **Animations** - Smooth transitions
- 🎭 **Icons** - Font Awesome icons
- 🌈 **Color Coding** - Priority-based colors

### PWA Features
- 📱 **Installable** - Add to home screen on any device
- 🔌 **Offline Support** - Works without internet connection
- ⚡ **Fast Loading** - Service worker caching
- 🔔 **Push Notifications** - Stay updated (ready)
- 🎨 **Native Feel** - Looks and feels like a native app
- 📊 **SEO Optimized** - Perfect social media previews

## 🚀 Getting Started

### Installation
1. Clone or download this repository
2. Open `index.html` in your browser
3. Start managing your tasks!

### Team Management
1. Click **"Manage Team"** button
2. Add team members with name and role
3. Each member gets unique avatar and color
4. Remove members when needed (tasks get unassigned)

### Managing Tasks
1. **Create**: Type task name and click "Add Task"
2. **View Details**: Double-click any task card
3. **Edit**: Update title, description, priority, assignee, status
4. **Move**: Drag & drop between columns
5. **Delete**: Open task details and click delete

### Task Detail Modal
When you double-click a task:
- ✏️ **Edit Title**: Change task name
- 📝 **Add Description**: Detailed information
- 🎯 **Change Status**: Todo, Doing, or Done
- 🚦 **Set Priority**: High, Normal, or Low
- 👤 **Assign Member**: Choose team member
- 📜 **View Activity Log**: Complete history with timestamps

### Activity Logging
Every action is automatically logged:
- ✅ Task created
- 🔄 Status changed (with from/to)
- 🚩 Priority updated
- 👤 Assignee changed
- ✏️ Title modified
- 📝 Description updated
- ⏰ All with exact timestampess
- **Done**: Completed tasks

### Quick Actions
- Move from Todo → Doing with "Next" button
- Move from Doing → Done with "Done" button
- Move back with arrow buttons
- Drag & drop for maximum flexibility
- **By Date**: Most recent first
- **By Priority**: High → Normal → Low

### Data Export/Import
- **Export**: Download all tasks as JSON file
- **Import**: Upload a previously exported JSON file

### Bulk Actions
- **Clear Completed**: Remove all completed tasks
- **Clear All**: Delete all tasks (with confirmation)

## 🛠️ Technical Details

### Technologies Used
### Storage Structure
```javascript
{
  id: timestamp + random,
  text: "Task description",
  status: "todo", // todo, doing, done
  priority: "normal", // low, normal, high
  createdAt: "2025-12-13T...",
  movedAt: "2025-12-13T...",
  tags: [],
  description: ""
}
```

### Local Storage Keys
- `kanban-tasks` - Current tasks array
- `kanban-backup` - Backup with timestamp
## 🎨 Features Highlights

### Activity Log System
- 📝 Every change is tracked
- ⏰ Precise timestamps
- 🎯 Action types with icons
- 📜 Scrollable history
- 🔍 Easy to understand format

### Team Member System
- 👤 Unlimited team members
- 🎨 Auto-generated avatars
- 🌈 16 unique colors
- 📋 Name + Role display
- 🔄 Easy reassignment

### Smart Filtering
- 🔍 Search across all tasks
- 👥 Filter by team member
- 📊 Real-time statistics
- ⚡ Instant updates

### Professional UI
- 🎨 Minimalist design
- 📱 Fully responsive
- ⚡ Fast and lightweight
- 🖱️ Intuitive interactions
- 💡 Clear visual hierarchy
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adding Categories
Tasks already have a `category` field. You can extend the UI to support categories.

### Adding Due Dates
Tasks already have a `dueDate` field. Add a date picker to enable this feature.

## 📱 Browser Compatibility
- ✅ Chrome (recommended) - Full PWA support
- ✅ Firefox - Basic functionality
- ✅ Safari - iOS PWA support
- ✅ Edge - Full PWA support
- ✅ Opera - Full PWA support

## 📱 Install as App
1. **Desktop**: Click install button in address bar (Chrome/Edge)
2. **Android**: Menu → Add to Home Screen
3. **iOS**: Share → Add to Home Screen

## 🔒 Privacy
All data is stored locally in your browser. No server, no tracking, completely private. Works offline after first load.

## 📄 License
Free to use and modify for personal and commercial projects.

## 🤝 Contributing
Feel free to fork, modify, and enhance this project!

---

Made with ❤️ using Vue.js
