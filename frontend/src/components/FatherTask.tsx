import Task from "./Task";

export default function ({className, text, setText, completed = false, onDelete}: {
    className?: string,
    text: string,
    setText: (text: string) => void,
    completed?: boolean,
    onDelete?: () => void
}) {
    return (
        <>
            <Task className={className} text={text} setText={setText} completed={completed} onDelete={onDelete}></Task>
        </>
    );
}