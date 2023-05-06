import * as React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

//icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import DescriptionIcon from "@mui/icons-material/Description";


export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width: 300,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 300, boxSizing: "border-box" },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        <ListItem sx={{ height: 130, flexDirection: "column" }}>
                            <ListItemIcon>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                    height="64px"
                                    width="60px"
                                    alt="profileImg"
                                />
                                <br></br>
                            </ListItemIcon>
                            <Typography sx={{ fontSize: "14px", color: "#6C7177" }}>
                                Welcome
                            </Typography>
                        </ListItem>

                        <ListItem disablePadding onClick={() => navigate('/home')}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DashboardIcon sx={{ color: "#6945FF" }} />
                                </ListItemIcon>
                                <ListItemText sx={{ fontSize: "14px" }} primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/certificate')}>
                                <ListItemIcon>
                                    <ApartmentIcon sx={{ color: "#6945FF" }} />
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ fontSize: "14px" }}
                                    primary="Certificate"
                                />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/gallery')}>
                                <ListItemIcon>
                                    <ContactPageIcon sx={{ color: "#6945FF" }} />
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ fontSize: "14px" }}
                                    primary="Gallery"
                                />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/trustees')}>
                                <ListItemIcon>
                                    <AccountCircleIcon sx={{ color: "#6945FF" }} />
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ fontSize: "14px" }}
                                    primary="Trustees"
                                />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton >
                                <ListItemIcon>
                                    <AccessTimeIcon sx={{ color: "#6945FF" }} />
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ fontSize: "14px" }}
                                    primary="Services"
                                />
                            </ListItemButton>
                        </ListItem>


                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/announcement')}>
                                <ListItemIcon>
                                    <AttachMoneyIcon sx={{ color: "#6945FF" }} />
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ fontSize: "14px" }}
                                    primary="Announcement"
                                />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/awards')}>
                                <ListItemIcon>
                                    <StarIcon sx={{ color: "#6945FF" }} />
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ fontSize: "14px" }}
                                    primary="Awards" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/reports')}>
                                <ListItemIcon>
                                    <AssignmentLateIcon sx={{ color: "#6945FF" }} />
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ fontSize: "14px" }}
                                    primary="Reports" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/g80_a12_certificate')} >
                                <ListItemIcon>
                                    <DescriptionIcon sx={{ color: "#6945FF" }} />
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ fontSize: "14px" }}
                                    primary="80G/12A Certificate"
                                />
                            </ListItemButton>
                        </ListItem>

                    </List>
                </Box>
            </Drawer>
        </>
    );
}
