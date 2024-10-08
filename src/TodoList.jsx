import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme

import { AgGridReact } from "ag-grid-react";
import { useState, useRef } from "react";


export default function TodoList() {
    const [todo, setTodo] = useState({ desc: "", priority: "", date: "" });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        { field: 'desc', sortable: false, filter: true },
        {
            field: 'priority', filter: true,
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
        },
        { field: 'date', filter: true }
    ]);

    // Remember to call preventDefault() if using form
    const addTodo = () => {
        setTodos([...todos, todo]);
        setTodo({ desc: "", priority: "", date: "" });
    };

    const handleDeleteTodo = () => {
        const nodes = gridRef.current.getSelectedNodes();
        if (nodes.length > 0) {
            setTodos(todos.filter((_, i) => i != nodes[0].id))
        }
    };

    return (
        <>
            <input
                type="date"
                placeholder="Date"
                onChange={e => setTodo({ ...todo, date: e.target.value })}
                value={todo.date} />
            <input
                placeholder="Description"
                onChange={e => setTodo({ ...todo, desc: e.target.value })}
                value={todo.desc} />
            <input
                placeholder="Priority"
                onChange={e => setTodo({ ...todo, priority: e.target.value })}
                value={todo.priority} />
            <button onClick={addTodo}>Add</button>
            <button onClick={handleDeleteTodo}>Delete</button>
            <div className="ag-theme-material" style={{ width: 700, height: 800 }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowData={todos}
                    columnDefs={columnDefs}
                    rowSelection={{ mode: "singleRow" }}
                />
            </div>
        </>
    );
}