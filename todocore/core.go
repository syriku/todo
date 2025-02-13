package todocore

import (
	"encoding/json"
	"fmt"
	"os"
)

type ITask struct {
	Content   string `json:"content"`
	Completed bool   `json:"completed"`
	Id        string `json:"id"`
}

type IFatherTask struct {
	ITask
	Children []ITask `json:"children"`
	Expand   bool    `json:"expand"`
}

var Tasks []IFatherTask

func Save() {
	cwd, err := os.Getwd()
	if err != nil {
		_, _ = fmt.Fprintln(os.Stderr, "Error getting current working directory: ", err)
		return
	}
	file, err := os.Create(cwd + "/tasks.json")
	if err != nil {
		_, _ = fmt.Fprintln(os.Stderr, "Error creating file: ", err)
		return
	}
	defer func(file *os.File) {
		_ = file.Close()
	}(file)
	jsonStr, _ := json.Marshal(Tasks)
	_, _ = file.Write(jsonStr)
}

func Load() {
	cwd, err := os.Getwd()
	if err != nil {
		_, _ = fmt.Fprintln(os.Stderr, "Error getting current working directory: ", err)
		return
	}
	file, err := os.Open(cwd + "/tasks.json")
	if err != nil {
		_, _ = fmt.Fprintln(os.Stderr, "Error opening file tasks: ", err)
		return
	}
	defer func(file *os.File) {
		_ = file.Close()
	}(file)
	jsonParser := json.NewDecoder(file)
	_ = jsonParser.Decode(&Tasks)
	fmt.Printf("tasks: %#v\n", Tasks)
}
