package todocore

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
)

type ITask struct {
	Content   string `json:"content"`
	Completed bool   `json:"completed"`
	Id        string `json:"id"`
	IsComment bool   `json:"isComment"`
}

type IFatherTask struct {
	ITask
	Children []ITask `json:"children"`
	Expand   bool    `json:"expand"`
}

var Tasks []IFatherTask

const todoCache = "todo-cache"

func init() {
	Tasks = make([]IFatherTask, 0)
}

func getCache() string {
	var baseDir string
	switch runtime.GOOS {
	case "windows", "linux":
		home, _ := os.UserHomeDir()
		baseDir = filepath.Join(home, "Documents", todoCache)
	case "darwin":
		home, _ := os.UserHomeDir()
		baseDir = filepath.Join(home, "Library", "Application Support", todoCache)
	}
	return filepath.Join(baseDir, "tasks.json")
}

func createCache() (*os.File, error) {
	cacheFile := getCache()
	cacheDir := filepath.Dir(cacheFile)
	_, err := os.Stat(cacheDir)
	if os.IsNotExist(err) {
		err = os.MkdirAll(cacheDir, os.ModePerm)
	}
	if err != nil {
		return nil, err
	}
	return os.Create(cacheFile)
}

func Save() {
	// cwd, err := os.Getwd()
	file, err := createCache()
	if err != nil {
		_, _ = fmt.Fprintln(os.Stderr, "Error creating file: ", err)
		return
	}
	defer func(file *os.File) {
		_ = file.Close()
	}(file)
	jsonStr, err := json.Marshal(Tasks)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error on marshal: %s", err)
		return
	}
	// fmt.Printf("Save:\n%s\nto %s", jsonStr, file.Name())
	_, _ = file.Write(jsonStr)
}

func Load() {
	cacheFile := getCache()
	file, err := os.Open(cacheFile)
	if os.IsNotExist(err) {
		return
	}
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
