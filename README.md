# Personal Diary App

A React application for keeping a personal diary with date and mood tracking.

## Features

- Create journal entries with date and mood indicators
- View, edit, and delete previous entries
- Entries are stored locally using localStorage
- Beautiful UI with animations and gradient colors
- Mobile responsive design

## Tech Stack

- React 18
- Vite
- Bootstrap 5
- Local Storage for data persistence

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```


## Project Structure

```
personal-diary-app/
├── public/
│   └── diary-icon.svg
├── src/
│   ├── components/
│   │   ├── Diary.jsx
│   │   └── Diary.css
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## How it works?

1. Select a date using the date picker
2. Choose your mood from the dropdown menu
3. Write your journal entry in the text area
4. Click "Save Entry" to add it to your diary
5. View previous entries in the accordion section below
6. Click on an entry date to expand and read the full entry
7. Use the edit and delete buttons to manage your entries

## Data Storage

All diary entries are stored in the browser's local storage. This means:
- Your data stays on your device
- No data is sent to any servers
- Clearing your browser data will erase your entries

