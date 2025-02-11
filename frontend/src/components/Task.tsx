import {Button, Checkbox, Flex, Input} from "antd";

export default function ({className, text, onChange, completed = false, onDelete}: {
    className?: string,
    text: string,
    onChange: (text: string, completed: boolean) => void,
    completed?: boolean,
    onDelete?: () => void
}) {
    const textStyle = {
        textDecoration: completed ? "line-through" : "none",
        flexGrow: 1
    };
    return (
        <Flex className={className} style={{width:'100%'}}>
            <Checkbox defaultChecked={completed} onChange={(e) => onChange(text, e.target.checked)}></Checkbox>
            <Input disabled={completed} style={textStyle} value={text}
                   onChange={(e) => onChange(e.target.value, completed)}
                   allowClear
                   variant="borderless">
            </Input>
            {!onDelete || <Button type={"primary"} danger onClick={onDelete} size={"small"}>x</Button>}
        </Flex>
    );
}