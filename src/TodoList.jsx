import { useState } from "react";

import TodoTable from "./TodoTable";

export default function TodoList() {
    const [descDate, setDescDate] = useState({description: "", date: ""});
    const [todos, setTodos] = useState([]);

 
    const handleChange = (event) => {
        setDescDate({ ...descDate, [event.target.name]: event.target.value});
    };

    // Remember to call preventDefault() if using form
    const addTodo = () => {
        if (!descDate) {
            alert("Write a description for the todo item");
            return;
        } else {
        setTodos([...todos, descDate]);
        setDescDate({description: "", date: ""});
        }
    };

    const handleDeleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return(
        <>
        <div id="todo_title">
            <h1>Simple Todolist</h1>
        </div>
        <div id="todo_input">
            <fieldset>
                <legend>Add Todo:</legend>
                Description: <input name="description" placeholder="Description" onChange={handleChange} value={descDate.description} />
                Date: <input name="date" placeholder="Date" onChange={handleChange} value={descDate.date}/>
                <button id="add_button" onClick={addTodo}>Add</button>
            </fieldset>
        </div>
            <TodoTable todos={todos} onDelete={handleDeleteTodo} />
        </>
    );
}