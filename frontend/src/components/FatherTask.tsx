import Task from "./Task";
import {Button, Flex, List} from "antd";
import {todocore} from "../../wailsjs/go/models";
import ITask = todocore.ITask;

export default function ({className, text, onChange, completed = false, onDelete, children, expand}: {
    className?: string,
    text: string,
    onChange: (text: string, completed: boolean, kids: ITask[], expand: boolean) => void,
    completed?: boolean,
    onDelete?: () => void,
    children: ITask[],
    expand: boolean
}) {
    return (
        <Flex vertical style={{width: '100%'}}>
            <Flex style={{width: '100%'}}>
                <Button type={"text"} onClick={() => {
                    onChange(text, completed, children, !expand)
                }}>{expand ? '▼' : '▶'}</Button>
                <Task className={className} text={text}
                      onChange={(newVal, newCompleted) => onChange(newVal, newCompleted, children, expand)}
                      completed={completed} onDelete={onDelete}></Task>
            </Flex>

            {expand && children.length != 0 &&
                <List className={className} dataSource={children} renderItem={(item, index) =>
                    <List.Item key={item.id} style={{width: "100%"}}>
                        <Task className={"sub-content"} text={item.content} completed={item.completed} onDelete={() => {
                            children = [...children.slice(0, index), ...children.slice(index + 1)];
                            onChange(text, completed, children, expand);
                        }} onChange={(newText, newCompleted) => {
                            children[index].content = newText;
                            children[index].completed = newCompleted;
                            onChange(text, completed, children, expand);
                        }}></Task>
                    </List.Item>
                }></List>
            }
            {expand && <Button className={"submit"} style={{marginLeft: "80%"}} onClick={()=>{
                let newChild: ITask = new ITask({
                    content: "新任务",
                    completed: false,
                    id: crypto.randomUUID()
                });
                children.push(newChild);
                onChange(text, completed, children, expand);
            }}>+</Button>}
        </Flex>
    );
}