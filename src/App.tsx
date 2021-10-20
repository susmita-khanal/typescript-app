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
import { GoPlus } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { AiFillPushpin } from "react-icons/ai";
import { AiFillFilePdf } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Modal, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

interface TODOI {
    id: string;
    text: string;
    isCompleted: boolean;
    isPinned: boolean;
}

const App: FC = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<TODOI[]>([]);
    const [isEditItem, setIsEditItem] = useState(null);
    const [clicked, setClicked] = useState<boolean>(false);
    const [pinned, setPinned] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTodo(event.target.value);
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
        if (!todo) {
            window.alert("please add the field");
            // } else if (todo) {
            //     setTodos(
            //         todos.map((elem) => {
            //             if (elem.id === isEditItem) {
            //                 return {
            //                     ...elem,
            //                     text: todo,
            //                 };
            //             }
            //         })
            //     );
        } else {
            setTodos([
                ...todos,
                {
                    id: new Date().getTime().toString(),
                    text: todo,
                    isCompleted: false,
                    isPinned: false,
                },
                // { id: todos.length + 1, text: todo, completed: false },
            ]);
            setTodo("");
        }
    };
    const deleteItems = (cval: any): void => {
        console.log("deleted");
        // setShow(true);
        if (cval) {
            setShow(true);
            setTodos(todos.filter((item) => item.id != cval.id));
        } else {
            setTodos(todos);
        }
    };
    const handleEdit = (id: string): void => {
        console.log("edit");
        const newEditItems: any = todos.find((item) => item.id === id);
        setTodo(newEditItems.text);
    };

    const handleDone = (id: any) => {
        const selectedTasks: any = todos.find((item) => item.id === id);
        const remainingTasks: any = todos.filter((item) => item.id !== id);

        setTodos([
            ...remainingTasks,
            { ...selectedTasks, isCompleted: !selectedTasks.isCompleted },
        ]);
    };
    const handlePin = (id: any) => {
        //     setTodos(todos.map((elem) => elem.id === isPinned.id));
        //     setPinned(true);
        // if(pinned){
        //     id:todos.length>0? todos.length===0
        // }
        //     else{
        // setPinned(false)
        // }
        // setTodos(todos.map((elem)=>elem.id > 0 ? setPinned(true) : setPinned(false));
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
                    <Modal
                        show={show}
                        onHide={handleClose}
                        className="delete-modal"
                    >
                        <Modal.Body className="modal-body">
                            Are you sure want to delete this?
                        </Modal.Body>
                        <Modal.Footer className="modal-footer">
                            <button
                                className="yes"
                                // onClick={() => deleteItems(id)}
                            >
                                yes
                            </button>
                            <Button className="no" onClick={handleClose}>
                                No
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="whole-date">
                        <IoIosArrowBack className="arrow" />
                        <div className="deadline">
                            <div className="days">Thrusday</div>
                            <div className="date">march</div>
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
                                <GoPlus
                                    style={{
                                        position: "relative",
                                        top: "2px",
                                    }}
                                />
                            </button>
                        </div>

                        {todos.map((cval, i) => {
                            return (
                                <>
                                    <div key={i} className="map-part">
                                        {" "}
                                        <input
                                            className="input-checkbox"
                                            type="checkbox"
                                            checked={cval.isCompleted}
                                        />
                                        {cval.text}
                                        <span className="dots">
                                            <BsThreeDots
                                                onClick={() =>
                                                    setClicked(!clicked)
                                                }
                                            />
                                        </span>
                                        {clicked ? (
                                            <div className="input-option">
                                                <div className="sub-table">
                                                    <AiFillPushpin className="pin-icon" />
                                                    <option
                                                        onClick={() =>
                                                            handleDone(cval.id)
                                                        }
                                                        className="pin"
                                                    >
                                                        completed
                                                    </option>
                                                </div>
                                                <div className="sub-table">
                                                    <AiFillPushpin className="pin-icon" />
                                                    <option
                                                        onClick={() =>
                                                            handlePin(cval.id)
                                                        }
                                                        className="pin"
                                                    >
                                                        pin to top
                                                    </option>
                                                </div>
                                                <div className="sub-table">
                                                    <AiFillFilePdf className="pin-icon" />
                                                    <option
                                                        className="pin"
                                                        onClick={() =>
                                                            handleEdit(cval.id)
                                                        }
                                                    >
                                                        Edit a memo
                                                    </option>
                                                </div>
                                                <div className="sub-table">
                                                    <RiDeleteBin6Line className="pin-icon" />
                                                    <option
                                                        className="pin"
                                                        onClick={() =>
                                                            deleteItems(cval)
                                                        }
                                                    >
                                                        delete
                                                    </option>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
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
