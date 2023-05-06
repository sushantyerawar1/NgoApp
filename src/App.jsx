import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Box } from "@mui/material";
import Login from "./components/login/login";
import Home from './components/home/homepage'
import Certificate from "./components/certificate/Certificate";
import Gallery from "./components/gallery/gallery";
import Createcertificate from "./components/certificate/createcertificate";
import CreateGallery from "./components/gallery/creategallery";
import Trustees from "./components/trustees/trustees";
import AddTrustees from "./components/trustees/addtrustees";
import G80_A12_Certificate from "./components/80G_12A_Certificate/80G_12A_Certificate";
import ADD_G80_A12_Certificate from "./components/80G_12A_Certificate/add_80G_12A_Certificate";
import Announcement from "./components/Announcement/announcement";
import CreateAnnouncement from "./components/Announcement/createannouncement";
import Reports from "./components/reports/reports";
import CreateReports from "./components/reports/addreport";
import Awards from "./components/awards/awards";
import AddAwards from "./components/awards/addawards";

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
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/createcertificate" element={<Createcertificate />} />
                        <Route path="/creategallery" element={<CreateGallery />} />
                        <Route path="/trustees" element={<Trustees />} />
                        <Route path="/addtrustees" element={<AddTrustees />} />
                        <Route path="/g80_a12_certificate" element={<G80_A12_Certificate />} />
                        <Route path="/add_g80_a12_certificate" element={<ADD_G80_A12_Certificate />} />
                        <Route path="/announcement" element={<Announcement />} />
                        <Route path="/createnewannouncement" element={<CreateAnnouncement />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/addreport" element={<CreateReports />} />
                        <Route path="/awards" element={<Awards />} />
                        <Route path="/addawards" element={<AddAwards />} />

                    </Routes>
                </BrowserRouter>
            </Box>
        </div>
    );
}

export default App;
