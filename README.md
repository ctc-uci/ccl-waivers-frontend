# Child Creativity Lab

## Admin Dashboard

This README is for the admin dashboard component and is a work in progress. Feel free to change stuff or add more!

### How to run

After cloning, run the following commands from the terminal from the root directory.

```
npm i
npm start
```

The application will be running from localhost:3000. Navigate to localhost:3000/admin to see the current admin dashboard.

### Things to Fix

- The `App.js` file is too cluttered and the code should be put in the `views/dashboard` subdirectory.
- Perhaps have a `Layout.js` component that includes the dashboard header and navbar

### Recommended vscode settings

https://vscode.readthedocs.io/en/latest/getstarted/settings/

```
{
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "editor.formatOnSave": true,
  "prettier.disableLanguages": ["javascript"],
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  }
}
```

These settings will enable prettier + eslint to run automatically when saving files, and will not create any collisions.

## Pre-commit Hooks

Husky will be automatically running eslint before allowing commits to go through.
