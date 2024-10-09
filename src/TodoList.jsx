import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme

import { AgGridReact } from "ag-grid-react";
import { useState, useRef } from "react";

import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { MenuItem, useMediaQuery } from "@mui/material";


export default function TodoList() {

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const [todo, setTodo] = useState({ desc: "", priority: "Med", date: dayjs().format("DD/MM/YYYY"), isDone: false });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        { field: 'desc', filter: false, flex: 2, minWidth: 120 },
        {
            field: 'priority', filter: false, flex: 1, minWidth: 60,
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
        },
        { field: 'date', filter: false, flex: 1, minWidth: 100 },
        {
            headerName: "",
            checkboxSelection: true,
            pinned: 'right',
            width: isSmallScreen ? 20 : 70,
        }
    ]);

    const addTodo = () => {
        setTodos([...todos, todo]);
        setTodo({ desc: "", priority: "Med", date: dayjs().format("DD/MM/YYYY"), isDone: false });
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

    const markDone = () => {
        const nodes = gridRef.current.getSelectedNodes();
        if (nodes.length > 0) {
            const updatedTodos = todos.map((todo, i) => {
                if (i == nodes[0].id) {
                    console.log(i, todo);
                    return { ...todo, isDone: true };
                }
                return todo;
            });

            setTodos(updatedTodos);
            console.log(updatedTodos);
            gridRef.current.refreshCells();
        }
    };

    const getRowClass = (params) => {
        return params.data.isDone ? 'done-row' : undefined;
    };

    return (
        <>
            <Stack
                mt={1}
                direction={isSmallScreen ? "column" : "row"}
                spacing={1}
                justifyContent="center"
                alignItems={isSmallScreen ? "stretch" : "center"}
                sx={{ width: isSmallScreen ? '100%' : 'auto', maxWidth: '900px' }}>
                <TextField
                    label="Description"
                    onChange={e => setTodo({ ...todo, desc: e.target.value })}
                    value={todo.desc}
                    fullWidth={isSmallScreen} />
                <Stack
                    direction="row">
                    <DatePicker
                        label="Date"
                        value={dayjs(todo.date, "DD/MM/YYYY")}
                        onChange={newValue => pickDateFunc(newValue)}
                        fullWidth={isSmallScreen} />
                    <TextField
                        label="Priority"
                        onChange={e => setTodo({ ...todo, priority: e.target.value })}
                        value={todo.priority}
                        fullWidth={isSmallScreen}
                        select
                    >
                        <MenuItem value={"Low"}>Low</MenuItem>
                        <MenuItem value={"Med"}>Med</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                    </TextField>
                </Stack>
                <Stack
                    direction="row"
                    spacing={1}>
                    <Button variant="contained" onClick={addTodo} fullWidth={isSmallScreen}>Add</Button>
                    <Button variant="contained" color="success" onClick={markDone} fullWidth={isSmallScreen}>Done</Button>
                    <Button variant="outlined" color="error" onClick={handleDeleteTodo} fullWidth={isSmallScreen}>Delete</Button>
                </Stack>

            </Stack>
            <div className="ag-theme-material" style={{ width: "100%", maxWidth: 900, height: 800 }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => {
                        gridRef.current = params.api;
                        params.api.sizeColumnsToFit();
                    }}
                    rowData={todos}
                    columnDefs={columnDefs}
                    getRowClass={getRowClass}
                    domLayout="autoHeight"
                />
            </div>
        </>
    );
}