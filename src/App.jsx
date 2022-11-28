import { createTheme, NextUIProvider, Text, Container, Button } from '@nextui-org/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import NotesList from './components/NotesList';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ProtectedRoute from './ProtectedRoute';

const theme = createTheme({
    type: 'dark',
});

const App = () => {
    return (
        <NextUIProvider theme={theme}>
            <Container>
                <Navbar />
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<NotesList />} />
                    </Route>
                </Routes>
            </Container>
        </NextUIProvider>
    );
};

export default App;
