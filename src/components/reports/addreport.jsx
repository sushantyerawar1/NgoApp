import { Box, Button, FormControl, TextField, Toolbar, Typography, Select } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import Header from "../header/header";
import imageCompression from 'browser-image-compression';
import { useNavigate } from "react-router-dom";

export default function CreateReports(params) {


    const navigate = useNavigate();
    const [data, setdata] = useState({
        galaryId: "autogeneted",
        Name: "",
        galaryPic: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata({ ...data, [name]: value });
    };


    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            }

            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const uploadImage = async (e) => {

        const { name, files } = e.target;
        const file = e.target.files[0];
        // console.log(file, 'filessssssss')
        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 960,
            useWebWorker: true
        }
        const compressedFile = await imageCompression(file, options);
        const convertedFile = await convertBase64(compressedFile);
        console.log(typeof (convertedFile), 'converted')
        // setdata({ ...data, [name]: convertedFile });
    }


    const handleClickfun = async () => {
        console.log("->", data);
        await axios
            .post("https://ngoapp01.azurewebsites.net/api/v1/createAwardsProfile", data)
            .then((res) => {
                console.log(res, 'finalupload');
                const { message } = res.data;
                alert(message);
                setdata({
                    galaryId: "autogeneted",
                    Name: "",
                    galaryPic: ""
                })
            });
    };

    return (
        <>
            <Header />
            <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#F5F5F5" }}>
                <Toolbar />
                <Typography
                    variant="h4"
                    sx={{ fontSize: "30px", color: "#E56757", textAlign: "center" }}
                >
                    Report
                </Typography>

                <Box
                    sx={{
                        marginLeft: "50px",
                        marginRight: "50px",
                        width: "auto",
                        height: "auto",
                        marginTop: "20px",
                        background: "#FFFFFF",
                    }}
                >

                    <Typography
                        sx={{ width: "100%", border: "1px solid #F0F0F0" }}
                    ></Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            padding: "20px",
                            color: "#4F5256",
                            fontSize: "20px",
                            fontWeight: 700,
                            textAlign: 'center'
                        }}
                    >
                        Add Report
                    </Typography>
                    <Typography
                        sx={{ width: "100%", border: "1px solid #F0F0F0" }}
                    ></Typography>

                    <FormControl
                        sx={{
                            paddingLeft: "50px",
                            paddingRight: "50px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        <Typography variant="h6" sx={{ padding: "15px", color: "#4F5256" }}>
                            Report Name
                        </Typography>
                        <TextField
                            sx={{ width: "75%" }}
                            placeholder="Enter Report Name"
                            name="Name"
                            value={data.Name}
                            onChange={(e) => handleChange(e)}
                        ></TextField>
                    </FormControl>

                    <FormControl
                        sx={{
                            paddingLeft: "40px",
                            paddingRight: "50px",
                            paddingTop: "50px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around"
                        }}
                    >
                        <Typography variant="h6" sx={{ padding: "15px", color: "#4F5256" }}>
                            Upload Report
                        </Typography>
                        <TextField
                            type="file"
                            sx={{ width: "75%" }}
                            placeholder="Announcement For "
                            name="galaryPic"
                            value={data.galaryPic}
                            onChange={(e) => uploadImage(e)}
                        ></TextField>
                    </FormControl>



                    <br />
                    <br />



                    <FormControl
                        sx={{
                            padding: "50px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            size="large"
                            variant="outlined"
                            sx={{ bgcolor: "#fff", marginRight: "10px", color: "#000" }}
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate("/reports")}
                        >
                            Back
                        </Button>
                        <Button
                            size="large"
                            variant="outlined"
                            sx={{ color: "#E56757" }}
                            startIcon={<CheckIcon />}
                            onClick={() => handleClickfun()}
                        >
                            Submit
                        </Button>
                    </FormControl>
                </Box>
            </Box>
        </>
    );
};