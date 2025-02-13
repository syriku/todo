package todoapp

import (
	"context"
	"fmt"
	"github.com/syriku/todo/todocore"
)

type Todo struct {
	Ctx context.Context
}

// Greet returns a greeting for the given name
func (a *Todo) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *Todo) SetTasks(tasks []todocore.IFatherTask) {
	todocore.Tasks = tasks
}

func (a *Todo) LoadTasks() []todocore.IFatherTask {
	return todocore.Tasks
}

func Finalise() {
	todocore.Save()
}

func Initialise() {
	todocore.Load()
}
