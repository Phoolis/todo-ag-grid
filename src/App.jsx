import './App.css'

import { useState } from 'react';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import TodoList from './TodoList'
import { Tab, Tabs } from '@mui/material';

function App() {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  }


  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            My Todos
          </Typography>
        </Toolbar>
      </AppBar>

      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="Home" value={0} />
        <Tab label="Todo List" value={1} />
      </Tabs>

      {value === 0 && (
        <div className="ag-theme-material" style={{ width: '100%', maxWidth: 900, height: 800 }}>
          <h1>Welcome to my Simple Todo List App!</h1>
          <p>Select "Todo List" from the menu tab to access it.</p>
        </div>
      )}
      {value === 1 && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TodoList />
        </LocalizationProvider>
      )}
    </Container>
  )
}

export default App;
