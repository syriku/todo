import {Dropdown} from "antd";
import {ReactNode} from "react";

export default function ({mainClicked, subClicked, className, style}: {
    mainClicked: () => void,
    subClicked: () => void,
    className?: string,
    style?: any,
}) {
    return (
        <Dropdown.Button className={className} style={style} onClick={mainClicked}
                         menu={{items: [{key: 'sub', label: '注释'}], onClick: subClicked}}>
        +</Dropdown.Button>
    )
}