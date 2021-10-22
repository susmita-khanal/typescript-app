import React, {
    FC,
    useState,
    ChangeEvent,
    FormEvent,
    MouseEventHandler,
} from "react";
import { FaTasks } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SiPinboard } from "react-icons/si";
import { GoPlus } from "react-icons/go";
import { Modal, Button } from "react-bootstrap";
// import Moment from "react-moment";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SingleTask from "./component/SingleTask";
interface TODOI {
    id: string;
    text: string;
    // isCompleted: boolean;
    isPinned: boolean;
    isChecked: boolean;
}
const App: FC = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<TODOI[]>([]);
    // const [isEditItem, setIsEditItem] = useState(null);
    const [clicked, setClicked] = useState<boolean>(false);
    const [pinned, setPinned] = useState<boolean>(false);
    // const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const moment = require("moment");

    const myDay = moment().format("dddd");

    const currDate = new Date().toLocaleDateString();
    // const currDay = new Date().getDay();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTodo(event.target.value);

        // setIsChecked(true);
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(e);
        if (!todo) {
            window.alert("please add the field");
        } else if (isEdit) {
            handleEdit(isEdit);
        } else {
            setTodos([
                ...todos,
                {
                    id: new Date().getTime().toString(),
                    text: todo,
                    // isCompleted: true,
                    isPinned: false,
                    isChecked: false,
                },
            ]);
            setTodo("");
            // setTodos(todos.map((elem)=>{
            //     if (elem.id===cval.id){
            //         return{
            //         ...elem,text:todo}}))
        }
    };
    const handleEdit = (id: string) => {
        const selectedTasks: any = todos.find((item: any) => item.id === id);
        const remainingTasks: any = todos.filter((item: any) => item.id !== id);

        setTodos([...remainingTasks, { ...selectedTasks, text: todo }]);
        setTodo("");
        setIsEdit("");
    };
    const deleteItems = (cval: any): void => {
        console.log("deleted");
        setTodos(todos.filter((item) => item.id != cval.id));
        // setShow(true);
    };
    // const handleEdit = (id: string): void => {
    //     console.log("edit");
    //     const newEditItems: any = todos.find((item) => item.id === id);
    //     setTodo(newEditItems.text);
    // };
    // const handleDone = (id: any) => {
    //     const selectedTasks: any = todos.find((item) => item.id === id);
    //     const remainingTasks: any = todos.filter((item) => item.id !== id);
    //     setTodos([
    //         ...remainingTasks,
    //         { ...selectedTasks, isCompleted: !selectedTasks.isCompleted },
    //     ]);
    // };
    const handlePin = (id: any) => {
        const selectedTasks: any = todos.find((item) => item.id === id);
        const remainingTasks: any = todos.filter((item) => item.id !== id);
        setTodos([
            ...remainingTasks,
            { ...selectedTasks, isPinned: !selectedTasks.isPinned },
        ]);
    };
    console.log(todos);
    return (
        <>
            <div className="App">
                <div className="todo-container">
                    <div className="whole-date">
                        <IoIosArrowBack className="arrow" />
                        <div className="deadline">
                            <div className="days">{myDay}</div>
                            <div className="date">{currDate}</div>
                        </div>
                        <IoIosArrowForward className="arrow" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <FaTasks className="icon" />
                            <input
                                className="todo-input"
                                type="text"
                                value={todo}
                                placeholder="Add a Task..."
                                onChange={handleChange}
                            />

                            <button
                                type="submit"
                                className="plus"
                                style={{ position: "relative", top: "0.5px" }}
                            >
                                <div className="plus-box">
                                    {" "}
                                    <GoPlus
                                        style={{
                                            position: "relative",
                                            top: "2px",
                                        }}
                                    />
                                </div>
                            </button>
                        </div>
                        <div
                            className="pinned-map"
                            style={{ marginTop: "10px" }}
                        >
                            {todos.map((cval, i) => {
                                return (
                                    <>
                                        {cval.isPinned && (
                                            <div>
                                                <SiPinboard className="pinned-icon-top" />
                                                <SingleTask
                                                    className="singletask"
                                                    cval={cval}
                                                    todos={todos}
                                                    setTodos={setTodos}
                                                    setTodo={setTodo}
                                                    isEdit={isEdit}
                                                    setIsEdit={setIsEdit}
                                                />
                                            </div>
                                        )}
                                    </>
                                );
                            })}
                        </div>

                        {todos.map((cval, i) => {
                            return (
                                <>
                                    {!cval.isPinned && (
                                        <SingleTask
                                            cval={cval}
                                            todos={todos}
                                            setTodos={setTodos}
                                            setTodo={setTodo}
                                            isEdit={isEdit}
                                            setIsEdit={setIsEdit}
                                        />
                                    )}
                                </>
                            );
                        })}
                    </form>
                </div>
            </div>
        </>
    );
};
export default App;
