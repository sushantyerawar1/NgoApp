import { Box, Button, FormControl, TextField, Toolbar, Typography, Select } from "@mui/material";
import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import Header from "../header/header";
import imageCompression from 'browser-image-compression';
import { useNavigate } from "react-router-dom";

export default function Createcertificate(params) {


    const navigate = useNavigate();
    const [content, setcontent] = useState('');
    const [data, setdata] = useState({
        AwardsId: "autogeneted",
        AwardsName: "",
        AwardsDescription: "",
        AwardsPic: ""

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata({ ...data, [name]: value });
    };

    useEffect(() => {
        setdata({ ...data, ['AwardsPic']: content });
    }, [content]);


    const handleClickfun = async () => {
        console.log("->", data);
        await axios
            .post("https://ngoapp01.azurewebsites.net/api/v1/createAwardsProfile", data)
            .then((res) => {
                console.log(res, 'finalupload');
                const { message } = res.data;
                alert(message);
                setdata({
                    AwardsId: "autogeneted",
                    AwardsName: "",
                    AwardsDescription: "",
                    AwardsPic: ""
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
                    Certificate
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
                        Add Certificate
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
                            Certificate Name
                        </Typography>
                        <TextField
                            sx={{ width: "75%" }}
                            placeholder="Certificate Name"
                            name="AwardsName"
                            value={data.AwardsName}
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
                            Certificate Description
                        </Typography>
                        <TextField
                            sx={{ width: "75%" }}
                            placeholder="Write Description"
                            name="AwardsDescription"
                            value={data.AwardsDescription}
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
                            Upload Certificate
                        </Typography>
                        <TextField
                            type="file"
                            sx={{ width: "75%" }}
                            placeholder="Announcement For "
                            name="AwardsPic"
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
                            onClick={() => navigate("/certificate")}
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