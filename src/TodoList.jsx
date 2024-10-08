import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme

import { AgGridReact } from "ag-grid-react";
import { useState, useRef } from "react";

import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";


export default function TodoList() {
    const [todo, setTodo] = useState({ desc: "", priority: "", date: dayjs().format("DD/MM/YYYY") });
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

    const addTodo = () => {
        setTodos([...todos, todo]);
        setTodo({ desc: "", priority: "", date: dayjs().format("DD/MM/YYYY") });
    };

    const pickDateFunc = (newDate) => {
        if (newDate && dayjs(newDate).isValid()) {
            setTodo({ ...todo, date: dayjs(newDate).format("DD/MM/YYYY") })
        }
    };

    const handleDeleteTodo = () => {
        const nodes = gridRef.current.getSelectedNodes();
        if (nodes.length > 0) {
            setTodos(todos.filter((_, i) => i != nodes[0].id))
        }
    };

    return (
        <>
            <Stack
                mt={2}
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center">
                <DatePicker
                    label="Date"
                    value={dayjs(todo.date, "DD/MM/YYYY")}
                    onChange={newValue => pickDateFunc(newValue)} />
                <TextField
                    label="Description"
                    onChange={e => setTodo({ ...todo, desc: e.target.value })}
                    value={todo.desc} />
                <TextField
                    label="Priority"
                    onChange={e => setTodo({ ...todo, priority: e.target.value })}
                    value={todo.priority} />
                <Button variant="contained" onClick={addTodo}>Add</Button>
                <Button variant="outlined" color="error" onClick={handleDeleteTodo}>Delete</Button>
            </Stack>
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