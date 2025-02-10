import "./App.css"
import {Button, List} from "antd"
import Task from "./components/Task"
import {useState} from "react";
import FatherTask from "./components/FatherTask";

interface Task {
    parent?: string;
}

export default function () {
    const [data, setData] = useState<string[]>([]);

    const onPushBack = (values: Task) => {
        console.log('Success:', values);
        setData([...data, values.parent!]);
    };

    return (
        <>
            <h1>TodoList</h1>
            <hr className={"horizontal"}></hr>

            <div id={"body"}>
                {data.length != 0 && <List
                    className={"content"}
                    bordered
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item>
                            <FatherTask text={item} setText={
                                (text) => {
                                    setData([...data.slice(0, index), text, ...data.slice(index + 1)]);
                                }
                            } onDelete={
                                () => {
                                    console.log("delete item.");
                                    setData([...data.slice(0, index), ...data.slice(index + 1)]);
                                }
                            }></FatherTask>
                        </List.Item>
                    )}
                />}
            </div>
            <Button className={"submit"} type={"primary"} onClick={() => {
                onPushBack({parent: "新任务"});
            }}>+</Button>
        </>
    );
}
