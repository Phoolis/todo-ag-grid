import './App.css'

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

function App() {

  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            My Todos
          </Typography>
        </Toolbar>
      </AppBar>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TodoList />
      </LocalizationProvider>
    </Container>
  )
}

export default App;
