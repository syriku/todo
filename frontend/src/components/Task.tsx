import {Button, Checkbox, Flex, Input} from "antd";
import RearrangeButton from "./RearrangeButton";

export default function ({
                             className,
                             text,
                             onChange,
                             completed = false,
                             onDelete,
                             isComment = false,
                             turnDown = () => {
                             },
                             turnUp = () => {
                             }
                         }: {
    className?: string,
    text: string,
    onChange: (text: string, completed: boolean) => void,
    completed?: boolean,
    onDelete?: () => void,
    isComment?: boolean,
    turnUp?: () => void,
    turnDown?: () => void
}) {
    const textStyle = {
        textDecoration: completed ? "line-through" : "none",
        flexGrow: 1
    };
    return (
        <Flex className={className} style={{width: '100%'}}>
            {isComment ||
                <Checkbox defaultChecked={completed} onChange={(e) => onChange(text, e.target.checked)}></Checkbox>}
            <Input disabled={completed} style={textStyle} value={text}
                   onChange={(e) => onChange(e.target.value, completed)}
                   allowClear
                   variant="borderless">
            </Input>
            {!onDelete || <Button type={"primary"} danger onClick={onDelete} size={"small"}>X</Button>}
            <RearrangeButton turnDown={turnDown} turnUp={turnUp}></RearrangeButton>
        </Flex>
    );
}