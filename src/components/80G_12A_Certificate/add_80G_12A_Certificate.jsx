import { Box, Button, FormControl, TextField, Toolbar, Typography, Select } from "@mui/material";
import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import Header from "../header/header";
import imageCompression from 'browser-image-compression';
import { useNavigate } from "react-router-dom";

export default function ADD_G80_A12_Certificate(params) {


    const navigate = useNavigate();
    const [content, setcontent] = useState('');
    const [data, setdata] = useState({
        "certificate80G12AId": "autogeneted",
        "certificate80G12AName": "",
        "certificate80G12ADescription": "",
        "certificate80G12APic": ""

    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata({ ...data, [name]: value });
    };


    useEffect(() => {
        setdata({ ...data, ['certificate80G12APic']: content });
    }, [content]);


    const handleClickfun = async () => {
        console.log("->", data);
        await axios
            .post("https://ngoapp01.azurewebsites.net/api/v1/createcertificate80G12AProfile", data)
            .then((res) => {
                console.log(res, 'finalupload');
                const { message } = res.data;
                alert(message);
                setdata({
                    "certificate80G12AId": "autogeneted",
                    "certificate80G12AName": "",
                    "certificate80G12ADescription": "",
                    "certificate80G12APic": ""
                })
                setcontent('')
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
                    80G/12A Certificate
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
                        Add 80G/12A Certificate
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
                            80G/12A Certificate Name
                        </Typography>
                        <TextField
                            sx={{ width: "75%" }}
                            placeholder="Enter 80G/12A Certificate Name"
                            name="certificate80G12AName"
                            value={data.certificate80G12AName}
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
                            justifyContent: "space-around",
                        }}
                    >
                        <Typography variant="h6" sx={{ padding: "15px", color: "#4F5256" }}>
                            80G/12A Certificate Description
                        </Typography>
                        <TextField
                            sx={{ width: "75%" }}
                            placeholder="Enter 80G/12A Certificate Description"
                            name="certificate80G12ADescription"
                            value={data.certificate80G12ADescription}
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
                            Upload 80G/12A Certificate
                        </Typography>
                        <TextField
                            type="file"
                            sx={{ width: "75%" }}
                            placeholder="Announcement For "
                            name="certificate80G12APic"
                            onChange={(e) =>
                                setcontent(
                                    'https://avinya01.s3.ap-south-1.amazonaws.com/' +
                                    e.target.files[0].name
                                )
                            }
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
                            onClick={() => navigate("/g80_a12_certificate")}
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