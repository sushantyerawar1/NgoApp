import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Box } from "@mui/material";
import Login from "./components/login/login";
import Home from './components/home/homepage'
import Certificate from "./components/awards/Certificate";

function App() {



    const [user, setUser] = useState([]);
    const [view, setview] = useState([]);

    return (
        <div className="App">
            <Box sx={{ display: "flex" }}>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Login setUser={setUser} />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/certificate" element={<Certificate />} />
                    </Routes>
                </BrowserRouter>
            </Box>
        </div>
    );
}

export default App;
