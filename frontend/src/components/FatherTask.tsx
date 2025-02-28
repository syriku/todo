import Task from "./Task";
import {Button, Flex, List} from "antd";
import {todocore} from "../../wailsjs/go/models";
import ITask = todocore.ITask;
import ComboButton from "./ComboButton";


export default function ({
                             className, text, onChange, completed = false, onDelete, children, expand, turnUp = () => {
    }, turnDown = () => {
    }
                         }: {
    className?: string,
    text: string,
    onChange: (text: string, completed: boolean, kids: ITask[], expand: boolean) => void,
    completed?: boolean,
    onDelete?: () => void,
    children: ITask[],
    expand: boolean,
    turnUp?: () => void,
    turnDown?: () => void
}) {
    function newChild(isComment: boolean) {
        let newChild: ITask = new ITask({
            content: isComment ? "注释" : "新任务",
            completed: false,
            id: crypto.randomUUID(),
            isComment
        });
        children.push(newChild);
        onChange(text, completed, children, expand);
    }

    return (
        <Flex vertical style={{width: '100%'}}>
            <Flex style={{width: '100%'}}>
                <Button type={"text"} onClick={() => {
                    onChange(text, completed, children, !expand)
                }}>{expand ? '▼' : '▶'}</Button>
                <Task className={className} text={text}
                      onChange={(newVal, newCompleted) => onChange(newVal, newCompleted, children, expand)}
                      completed={completed} onDelete={onDelete} turnDown={turnDown} turnUp={turnUp}></Task>
            </Flex>

            {expand && children.length != 0 &&
                <List className={className} dataSource={children} renderItem={(item, index) =>
                    <List.Item key={item.id} style={{width: "100%"}}>
                        <Task isComment={item.isComment} className={"sub-content"} text={item.content}
                              completed={item.completed} onDelete={() => {
                            children = [...children.slice(0, index), ...children.slice(index + 1)];
                            onChange(text, completed, children, expand);
                        }} onChange={(newText, newCompleted) => {
                            children[index].content = newText;
                            children[index].completed = newCompleted;
                            onChange(text, completed, children, expand);
                        }} turnUp={() => {
                            if (index == 0) return;
                            children = [...children.slice(0, index - 1), children[index], children[index - 1], ...children.slice(index + 1)];
                            onChange(text, completed, children, expand);
                        }} turnDown={() => {
                            if (index >= children.length - 1) return;
                            children = [...children.slice(0, index), children[index + 1], children[index], ...children.slice(index + 2)];
                            onChange(text, completed, children, expand);
                        }}></Task>
                    </List.Item>
                }></List>
            }
            {expand && <ComboButton className={"submit"} style={{marginLeft: "80%"}} mainClicked={() => newChild(false)}
                                    subClicked={() => newChild(true)}></ComboButton>}
        </Flex>
    );
}