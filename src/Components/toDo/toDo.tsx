
import React, { useContext, useState, useCallback } from "react";
import { useGlobalState, useDispatch } from "../App"
import './toDo.scss';

// interface Props {

// }
const ToDo: React.FunctionComponent = (
    // props: Props
  ): React.ReactElement => {
    const dispatch = useDispatch();
    const activeToDo = useGlobalState("activeToDo");
    const completedToDo = useGlobalState("completedToDo");

    // interface typeName {
    //     type: "CurrentHistory" | "PreviousHistory" | "ActiveToDo"
    // }
    // type ReadingTypes = "setCurrentHistory" | "setPreviousHistory" | "setActiveToDo";
    // const setCompletedToDo = useCallback((data) => dispatch({ type: "setCompletedToDo", completedToDo: data }), [dispatch]);

    const setActiveToDo = useCallback((data) => dispatch({ type: "setActiveToDo", activeToDo: data }), [dispatch]);
    const removeActiveToDo = useCallback((data, i) => dispatch({ type: "removeActiveToDo", activeToDo: data, index: i }), [dispatch]);
    const moveToActiveToDo = useCallback((data, i) => dispatch({ type: "moveToActive", moveToActive: data, index: i }), [dispatch]);
    const removeCompletedToDo = useCallback((data, i) => dispatch({ type: "removeCompletedToDo", completedToDo: data, index: i }), [dispatch]);
    const moveToCompletedToDo = useCallback((data, i) => dispatch({ type: "moveToCompleted", moveToCompleted: data, index: i }), [dispatch]);

    const resetToDos = useCallback(() => dispatch({ type: "resetToDos" }), [dispatch]);

    // const setSelects = useCallback((selectType, identifier, data) => dispatch({ type: selectType, [identifier]: data }), [dispatch]);

    const submitForm = (e:any) => {
        e.preventDefault();
        const el = document.getElementsByName("todo_item")[0] as HTMLInputElement
        setActiveToDo(el.value)
    }

    const clearContent = () => {
        const el = document.getElementById("toDoForm") as HTMLFormElement;
        el && el.reset();
    }
    // console.log("active", activeToDo)
    return (
        <div className="toDo-container">
        <h2>Lets do ToDo's</h2>
        <form id="toDoForm" className="form">
            {/* <div className="input-container"> */}
            <input type="text" name="todo_item" placeholder="Enter your To Do's!"
                className="to-do-input-field"
                required />
            {/* </div> */}
            <div className="active-tasks">there are currently {activeToDo.length} active tasks remaining</div>
            <div className="main-button-container">
            <button className="main-button" type="submit" onClick={(e) => {submitForm(e); clearContent();}} >
            Submit
            </button>
            <button className="main-button" onClick={() => { resetToDos(); }}>
                Delete All
            </button>
            </div>
        </form>
        <div className="render-buttons">
            <button className="show-button" onClick={() => {
            let activeElement = document.getElementById("active-items");
            activeElement && activeElement.classList.remove("hidden");
            activeElement = document.getElementById("completed-items");
            activeElement && activeElement.classList.remove("hidden");
            }}>
            Show All To Do's
            </button>
            <button className="show-button" onClick={() => {
            let activeElement = document.getElementById("active-items");
            activeElement && activeElement.classList.remove("hidden");
            activeElement = document.getElementById("completed-items");
            activeElement && activeElement.classList.add("hidden");
            }}>
            Show Only Active
            </button>
            <button className="show-button" onClick={() => {
            let activeElement = document.getElementById("active-items");
            activeElement && activeElement.classList.add("hidden");
            activeElement = document.getElementById("completed-items");
            activeElement && activeElement.classList.remove("hidden");
            }}>
            Show Only Completed
            </button>
        </div>

        <div className="border-line"/>

        <div className="desc-container">
            <div className="desc">
                <div className="desc-title">
                    Active To-Do's.
                </div>
                <div id="active-items" className="desc-content">
                {
                    activeToDo.length ?
                    (activeToDo.map((todo: any, i: any) => {
                        return (
                        <div key={i} className="to-do-items" >
                        <p className="todo">{todo}</p>
                        <div>
                            <button className="to-do-status-btn" onClick={() => { moveToCompletedToDo(todo, i); }}>
                                set to complete
                            </button>
                            <button className="to-do-delete-btn" onClick={(e) => { removeActiveToDo(todo, i); }}> X </button>
                        </div>
                        </div>
                        )
                    })) : null
                }
                </div>

            </div>

            <div className="desc">
                <div className="desc-title">
                    Completed To-Do's.
                </div>
                <div id="completed-items" className="desc-content">
                {
                    completedToDo.length ?
                    (completedToDo.map((todo: any, i: any) => {
                        return (
                            <div key={i} className="to-do-items" >
                            <p className="todo">{todo}</p>
                            <div>
                                <button className="to-do-status-btn" onClick={() => { moveToActiveToDo(todo, i); }}>
                                    set to active
                                </button>
                                <button className="to-do-delete-btn" onClick={(e) => { removeCompletedToDo(todo, i); }}> X </button>
                            </div>
                            </div>
                        )
                    })) : null
                }
                </div>
            </div>
        </div>

        <div className="team-desc">
            Made by Joe Stephens
        </div>

        </div>
    );
};

export default ToDo;