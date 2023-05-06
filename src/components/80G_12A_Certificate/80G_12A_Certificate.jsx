import React, { useEffect, useState } from "react";
import {
    Box,
    Toolbar,
    Typography,
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//icons
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import Header from "../header/header";
import { useNavigate } from "react-router-dom";

function G80_A12_Certificate({ setview }) {
    const [Data, setData] = useState([]);
    const navigate = useNavigate();
    const handleView = (user) => {
        setview(user);
        navigate('/homeview');
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
        const {
            EnquiryId,
            Name,
            Email,
            Mobile,
            Country,
            City,
            InterestedIn,
            PurchaseFor,
            Date,
            EnquiryCreatedBy,
            EnquiryStatus
        } = data;
        const finaldata = {
            EnquiryId,
            Name,
            Email,
            Mobile,
            Country,
            City,
            InterestedIn,
            PurchaseFor,
            Date,
            EnquiryCreatedBy,
            EnquiryStatus
        };

        axios
            .post(
                "https://avinyasale.azurewebsites.net/api/v1/updateEnquiryDetails",
                finaldata
            )
            .then((res) => {
                alert(res.data.message);
                setEditOpen(false);
                getData();
            });
    };

    // ---delete Code---
    const [open, setOpen] = React.useState(false);
    const [deleteitem, setdeleteitem] = React.useState("");

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (id) => {
        setOpen(true);
        setdeleteitem(id);
    };

    const confirmDelete = async (id) => {
        await axios
            .delete(
                `https://ngoapp01.azurewebsites.net/api/v1/Deletecertificate80G12A/${id}`
            )
            .then(() => {
                handleClose();
                getData();
            });
    };
    const getData = async () => {
        await axios
            .get("https://ngoapp01.azurewebsites.net/api/v1/getAllcertificate80G12As")
            .then((res) => {
                const { data } = res.data;
                setData(data);
            });
    };
    useEffect(() => {
        getData();
    }, []);
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
                    80G/12A Certificate
                </Typography>

                <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        {/* // first Row */}
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    colSpan={17}
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "24px",
                                        fontWeight: 600,
                                        lineHeight: "30px",
                                        letterSpacing: "0em",
                                        textAlign: "center",
                                    }}
                                >
                                    List 80G/12A Certificate
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {/* //second row */}
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    colSpan={14}
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
                                        onClick={() => navigate("/add_g80_a12_certificate")}
                                        sx={{
                                            bgcolor: "#E56757",
                                            width: "200px",
                                            height: "50px",
                                            textTransform: "capitalize",
                                            fontSize: "13px",
                                        }}
                                    // startIcon={<Add />}
                                    >
                                        Add 80G/12A Certificate
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
                                    Certificate Name
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
                                    Certificate Image
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

                        {Data.map((certificate) => {
                            return (
                                <TableBody key={certificate._id}>
                                    <TableRow>
                                        <TableCell align="center" sx={{ width: "150px" }}>
                                            {certificate.createdAt}
                                        </TableCell>
                                        <TableCell align="center">{certificate.certificate80G12AName}</TableCell>
                                        <TableCell align="center">{certificate.certificate80G12APic}</TableCell>
                                        <TableCell align="center">
                                            <VisibilityIcon className="ViewIcon" onClick={() => handleView(certificate)} />
                                        </TableCell>
                                        <TableCell align="center">
                                            <EditIcon
                                                className="EditIcon"
                                                onClick={() => handleEdit(certificate)}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <DeleteIcon
                                                className="DeleteIcon"
                                                onClick={() => handleDelete(certificate.certificate80G12AId)}
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
                    <DialogTitle id="alert-dialog-title">
                        Update List Enqiure
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>Certificate Name:</DialogContentText>

                        <TextField
                            name="Name"
                            value={EditData.certificate80G12AName}
                            onChange={(e) => handleChange(e)}
                            type="text"
                            sx={{ mb: 2 }}
                        />

                        <DialogContentText>Certificate Description:</DialogContentText>

                        <TextField
                            name="certificate80G12AName"
                            value={EditData.certificate80G12ADescription}
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
}

export default G80_A12_Certificate