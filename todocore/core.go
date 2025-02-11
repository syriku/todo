package todocore

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
