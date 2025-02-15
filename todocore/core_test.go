package todocore

import "testing"

func TestCache(t *testing.T) {
	cacheFile := getCache()
	if cacheFile != `/Users/fhyxz/Library/Application Support/todo-cache/tasks.json` {
		t.Error("got a wrong file path: ", cacheFile)
		t.Fail()
	}
}
