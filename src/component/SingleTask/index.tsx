import React, { useState } from "react";
// import "./App.css";
import { BsThreeDots } from "react-icons/bs";
import { AiFillPushpin } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Modal, Button } from "react-bootstrap";

const SingleTask = ({
    isEdit,
    setIsEdit,
    cval,
    todos,
    setTodos,
    setTodo,
    isChecked,
    setIsChecked,
}: any) => {
    const [clicked, setClicked] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const handleEdit = (id: string): void => {
        console.log("edit");
        const newEditItems: any = todos.find((item: any) => item.id === id);
        setTodo(newEditItems.text);
        setIsEdit(newEditItems.id);
    };

    const handleDone = (id: any) => {
        const selectedTasks: any = todos.find((item: any) => item.id === id);
        const remainingTasks: any = todos.filter((item: any) => item.id !== id);

        setTodos([
            ...remainingTasks,
            { ...selectedTasks, isChecked: !selectedTasks.isChecked },
        ]);
    };
    const handlePin = (id: any) => {
        const selectedTasks: any = todos.find((item: any) => item.id === id);
        const remainingTasks: any = todos.filter((item: any) => item.id !== id);

        setTodos([
            ...remainingTasks,
            { ...selectedTasks, isPinned: !selectedTasks.isPinned },
        ]);
    };

    const deleteItems = (cval: any): void => {
        console.log("deleted");
        if (cval) {
            setShow(true);
            setTodos(todos.filter((item: any) => item.id != cval.id));
        } else {
            setTodos(todos);
        }
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose} className="delete-modal">
                <Modal.Body className="modal-body">
                    Are you sure want to delete this?
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button className="yes" onClick={() => deleteItems(cval)}>
                        yes
                    </button>
                    <Button className="no" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="map-part">
                {/* <div className="input-box"> */}
                <input
                    className="input-checkbox"
                    type="checkbox"
                    // checked={cval.isCompleted}
                    checked={cval.isChecked}
                    onClick={() => handleDone(cval.id)}
                />

                <div
                    style={{
                        textDecoration: cval.isChecked
                            ? "line-through"
                            : "none",
                        color: "#ffffffa2",
                        fontWeight: 400,
                        fontSize: "16px",
                        fontFamily: "Roboto",
                    }}
                >
                    {cval.text}
                </div>

                <span className="dots">
                    <BsThreeDots onClick={() => setClicked(!clicked)} />
                </span>
                {clicked ? (
                    <div className="input-option">
                        {/* <div className="sub-table">
                            <AiFillPushpin className="pin-icon" />
                            <option
                                onClick={() => handleDone(cval.id)}
                                className="pin"
                            >
                                completed
                            </option>
                        </div> */}
                        <div className="sub-table">
                            <AiFillPushpin className="pin-icon" />
                            <option
                                onClick={() => handlePin(cval.id)}
                                className="pin"
                            >
                                pin to top
                            </option>
                        </div>
                        <div className="sub-table">
                            <AiFillEdit className="pin-icon" />
                            <option
                                className="pin"
                                onClick={() => handleEdit(cval.id)}
                            >
                                Edit a memo
                            </option>
                        </div>
                        <div className="sub-table">
                            <RiDeleteBin6Line className="pin-icon" />
                            <option className="pin" onClick={handleShow}>
                                delete
                            </option>
                        </div>
                    </div>
                ) : null}
            </div>
            {/* </div> */}
        </>
    );
};

export default SingleTask;
