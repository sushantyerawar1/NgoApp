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

export default function Gallery({ setview }) {
    const Navigate = useNavigate();
    const [Data, setData] = useState([]);
    const handleView = (user) => {
        setview(user);
        Navigate('/Blogview')
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
    const confirmEdit = (data) => {
        const { BlogId, DateCreated, Title, CreatedBy } = data;
        const finaldata = {
            BlogId,
            DateCreated,
            Title,
            CreatedBy,
        };

        axios
            .post(
                "https://avinyasale.azurewebsites.net/api/v1/updateBlogDetails",
                finaldata
            )
            .then((res) => {
                alert(res.data.message);
                setEditOpen(false);
                getData();
            });
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
                console.log(data, 'dtata')
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
                                            {gallery.createdAt}
                                        </TableCell>
                                        <TableCell align="center">{gallery.Name}</TableCell>
                                        <TableCell align="center">{gallery.galaryPic}</TableCell>
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

                        <DialogContentText>CreatedBy:</DialogContentText>
                        <TextField
                            name="CreatedBy"
                            value={EditData.CreatedBy}
                            onChange={(e) => handleChange(e)}
                            type="text"
                            sx={{ mb: 2 }}
                        />
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
