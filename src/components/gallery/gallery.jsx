import React, { useEffect, useState } from "react";
import { Box, Toolbar, Typography, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Header from "../header/header";
import { useNavigate } from "react-router-dom";
import imageCompression from 'browser-image-compression';

export default function Gallery({ setview }) {
    const Navigate = useNavigate();
    const [Data, setData] = useState([]);
    const handleView = (gallery) => {
        setview(gallery);
        // Navigate('/Blogview')
    }
    //  ---edit Code---
    const [EditOpen, setEditOpen] = React.useState(false);
    const [EditData, setEditData] = React.useState([]);
    const handleeditclose = () => {
        setEditOpen(false);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...EditData, [name]: value });
    };

    const handleEdit = (user) => {
        setEditOpen(true);
        setEditData(user);
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

    const [imageName, setImageName] = useState("");
    const [content, setcontent] = useState('');


    const uploadImage = async (e) => {
        const files = e.target.files;

        const file = e.target.files[0];
        const fullFileName = file.name;

        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 960,
            useWebWorker: true
        }
        const compressedFile = await imageCompression(file, options);

        const convertedFile = await convertBase64(compressedFile);
        setcontent(convertedFile)

        setImageName(fullFileName);
    }

    let objectDate = new Date();

    let day = objectDate.getDate();
    let month = (objectDate.getMonth() + 1);
    let year = objectDate.getFullYear();

    const confirmEdit = (data) => {

        const finaldata = {
            "galaryId": data.galaryId,
            "Name": data.Name,
            "Date": day + '-' + month + '-' + year,
            "galaryPicName": imageName,
            "galaryPic": content
        };

        if (content && data.Name) {
            axios
                .post(
                    "https://ngoapp01.azurewebsites.net/api/v1/UpdategalaryProfile",
                    finaldata
                )
                .then((res) => {
                    if (res.status == 200) {
                        alert("Gallery Updated Successfully");
                    }
                    else {
                        alert("Gallery Unable to update");
                    }
                    setEditOpen(false);
                    setcontent('');
                    setImageName('');
                    getData();
                });
        }
        else {
            alert("All Fields are Mandatory");
            setEditOpen(false);
            setcontent('');
            setImageName('');
            getData();
        }

    };

    const [open, setOpen] = React.useState(false);
    const [deleteitem, setdeleteitem] = React.useState("");

    const handleClose = () => {
        setOpen(false);
    };

    const getData = async () => {
        await axios
            .get(
                "https://ngoapp01.azurewebsites.net/api/v1/getAllgalarys"
            )
            .then((res) => {
                const { data } = res.data;
                setData(data);
            });
    };
    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (id) => {
        setOpen(true);
        setdeleteitem(id);
    };

    const confirmDelete = async (id) => {
        await axios
            .delete(
                `https://ngoapp01.azurewebsites.net/api/v1/Deletegalary/${id}`
            )
            .then(() => {
                handleClose();
                getData();
            });
    };

    return (
        <>
            <Header />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, bgcolor: "#F5F5F5", height: "97vh" }}
            >
                <Toolbar />

                <Typography
                    variant="h4"
                    sx={{ fontSize: "20px", color: "#E56757", textAlign: "center" }}
                >
                    Gallery
                </Typography>


                <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        {/* // first Row */}
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    colSpan={14}
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "24px",
                                        fontWeight: 600,
                                        lineHeight: "30px",
                                        letterSpacing: "0em",
                                        textAlign: "center",
                                    }}
                                >
                                    List Gallery
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {/* //second row */}
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "20px",
                                        fontWeight: 600,
                                        lineHeight: "0px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        sx={{ m: 1, width: "25ch" }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        placeholder="Search Here..."
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => Navigate("/creategallery")}
                                        sx={{
                                            bgcolor: "#E56757",
                                            width: "90px",
                                            height: "50px",
                                            textTransform: "capitalize",
                                            fontSize: "13px",
                                        }}
                                    // startIcon={<Add />}
                                    >
                                        Add Image
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        {/* // Thrid row */}
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Date
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Gallery Name
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Gallery Images
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    View
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Edit
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        {Data.map((gallery) => {
                            return (
                                <TableBody key={gallery._id}>
                                    <TableRow>
                                        <TableCell align="center" sx={{ width: "150px" }}>
                                            {gallery.createdAt.split('T')[0]}
                                        </TableCell>
                                        <TableCell align="center">{gallery.Name}</TableCell>
                                        <TableCell align="center">{gallery.galaryPic.split('/')[3]}</TableCell>
                                        <TableCell align="center">
                                            <VisibilityIcon className="ViewIcon" onClick={() => handleView(gallery)} />
                                        </TableCell>
                                        <TableCell align="center">
                                            <EditIcon
                                                className="EditIcon"
                                                onClick={() => handleEdit(gallery)}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <DeleteIcon
                                                className="DeleteIcon"
                                                onClick={() => handleDelete(gallery.galaryId)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            );
                        })}
                    </Table>
                </TableContainer>

                <Dialog
                    open={EditOpen}
                    onClose={handleeditclose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Update List Enqiure</DialogTitle>

                    <DialogContent>

                        <DialogContentText>Name:</DialogContentText>
                        <TextField
                            name="Name"
                            value={EditData.Name}
                            onChange={(e) => handleChange(e)}
                            type="text"
                            sx={{ mb: 2 }}
                        />

                        <DialogContentText>Upload Image:</DialogContentText>
                        <TextField
                            type="file"
                            sx={{ width: "75%" }}
                            name="galaryPic"
                            accept="image/*"
                            onChange={(e) => {
                                uploadImage(e);
                            }}
                        ></TextField>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setEditOpen(false)}>Cancle</Button>
                        <Button onClick={() => confirmEdit(EditData)} autoFocus>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Are you sure ?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Your will not be able to recover this imaginary file!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>cancle</Button>
                        <Button onClick={() => confirmDelete(deleteitem)} autoFocus>
                            Yes, delete it!
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );

};
