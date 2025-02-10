import {Button, Checkbox, Flex, Input} from "antd";
import {useEffect, useState} from "react";

export default function ({className, text, setText, completed = false, onDelete}: {
    className?: string,
    text: string,
    setText: (text: string) => void,
    completed?: boolean,
    onDelete?: () => void
}) {

    const [complete, setComplete] = useState<boolean>(false);

    useEffect(() => {
        setComplete(completed);
    }, [completed]);

    const textStyle = {
        textDecoration: complete ? "line-through" : "none",
        width: '100%'
    };
    return (
        <Flex className={className} style={{width: '100%'}}>
            <Checkbox defaultChecked={completed} onChange={(e) => setComplete(e.target.checked)}></Checkbox>
            <Input disabled={complete} style={textStyle} value={text}
                   onChange={(e) => setText(e.target.value)}
                   allowClear
                   variant="borderless">
            </Input>
            {!onDelete || <Button color={"danger"} variant={"dashed"} onClick={onDelete}>删除</Button>}
        </Flex>
    );
}