package todoapp

import (
	"context"
	"fmt"
)

type Todo struct {
	Ctx context.Context
}

// Greet returns a greeting for the given name
func (a *Todo) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
