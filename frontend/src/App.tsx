import "./App.css"
import {Button, List} from "antd"
import {useState} from "react";
import FatherTask from "./components/FatherTask";
import {SetTasks} from "../wailsjs/go/main/Todo";
import {todocore} from "../wailsjs/go/models";
import IFatherTask = todocore.IFatherTask;
import ITask = todocore.ITask;


export default function () {
    const [data, setData] = useState<IFatherTask[]>([]);

    const setDataDeco = (tasks: IFatherTask[]) => {
        setData(tasks);
        SetTasks(tasks).catch((err) => {
            console.log(err);
        })
    };

    const onPushBack = (value: string) => {
        setData([...data,
            new IFatherTask({
                content: value,
                completed: false,
                id: crypto.randomUUID(),
                children: [],
                expand: false
            })]);
    }

    const onChange = (value: string, completed: boolean, children: ITask[], expand: boolean, id: string) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data[i].completed = completed;
                data[i].content = value;
                data[i].children = children;
                data[i].expand = expand;
                setDataDeco([...data]);
            }
        }
    }

    return (
        <>
            <h1>TodoList</h1>
            <hr className={"horizontal"}></hr>
            <div id={"body"}>
                {data.length != 0 ? <List
                    className={"content"}
                    bordered
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item key={item.id} style={{width: "100%"}}>
                            <FatherTask expand={item.expand} text={item.content} onChange={
                                ((newVal, newCompleted, children, expand) => onChange(newVal, newCompleted, children, expand, item.id))
                            } onDelete={
                                () => {
                                    console.log("delete item.");
                                    setDataDeco([...data.slice(0, index), ...data.slice(index + 1)]);
                                }
                            } completed={item.completed}>{item.children}</FatherTask>
                        </List.Item>
                    )}
                /> : <p>{"No Todo"}</p>}
            </div>
            <Button className={"submit"} type={"primary"} onClick={() => onPushBack("新任务")}
                    autoInsertSpace={false}>+</Button>
        </>
    );
}
