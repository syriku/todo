import {Flex, Button} from "antd"
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";

export default function ({turnUp, turnDown}: { turnUp: () => void, turnDown: () => void }) {
    return (
        <Flex vertical>
            <Button onClick={turnUp} className={"turn-up"} type={"text"} size={"small"}
                    style={{width: "12px", height: "15px"}}>
                <ArrowUpOutlined/>
            </Button>
            <Button onClick={turnDown} className={"turn-down"} type={"text"} size={"small"}
                    style={{width: "12px", height: "15px"}}>
                <ArrowDownOutlined/>
            </Button>
        </Flex>
    )
}