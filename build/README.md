# Todo

a simple todo list app. It supports the following features:

1. Add a new todo item
2. add a sub item
3. Mark a todo item as done
4. Delete a todo item
5. load last saved todo list when app starts

## build

wails v2(v2.9) needed.

run `wails build` in the root dir to build the app.

## structure

- `main.go`: the main entry of the app
- `frontent`: the frontend code with react
- `todoapp`: interface between frontend and backend
- `todocore`: saving & loading logic of todo list