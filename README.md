# Child Creativity Lab

This read me is a work in progress. Feel free to change stuff or add more!

### How to run

After cloning, run the following commands from the terminal from the root directory.

```
npm i
npm start
```

The application will be running from localhost:3000

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
