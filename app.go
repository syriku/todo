package main

import (
	"context"
	"github.com/syriku/todo/todoapp"
)

// Todo struct
type Todo struct {
	todoapp.Todo
}

// NewApp creates a new Todo application struct
func NewApp() *Todo {
	return &Todo{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *Todo) startup(ctx context.Context) {
	a.Ctx = ctx
}
