import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Logo from "../images/logo2.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthModal from "./AuthModal";
import SellItemModal from "./SellItemModal";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";

export default function AccountMenu() {
  const { user } = useSelector((state) => state.auth);
  const [localUserData, setLocalUserData] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logoutHandler = useCallback(() => {
    dispatch(authActions.logout());
    setLocalUserData(null);
    navigate("/");
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = localUserData?.token;

    if (token) {
      const decodedToken = jwt_decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logoutHandler();
    }
  }, [localUserData?.token, logoutHandler, location]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // console.log(searchQuery);
    navigate(`/items/search?searchQuery=${searchQuery}`);

    setSearchQuery("");
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          // flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "center",
          backgroundColor: "#353d55",
          padding: "10px",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <img
            alt="logo"
            src={Logo}
            style={{
              height: "40px",
              width: "40px",
              marginLeft: "10px",
            }}
          />
        </Link>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            marginLeft: user ? "300px" : "100px",
            position: "relative",
            left: user && "130px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search any item"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        {!user && <AuthModal />}

        {user && (
          <Link to="/chat" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              sx={{
                minWidth: 100,
                fontSize: "1.25rem",
                position: "relative",
                left: "110px",
                // paddingLeft: "15px",
                // marginLeft: "-40px",
              }}
            >
              <Fab
                variant="extended"
                aria-label="like"
                sx={{ backgroundColor: "lightBlue", height: "35px" }}
              >
                <ChatIcon sx={{ mr: 1 }} />
                Chat
              </Fab>
            </Typography>
          </Link>
        )}

        {user && (
          <Link
            to="/favourites"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              sx={{
                minWidth: 100,
                fontSize: "1.25rem",
                position: "relative",
                left: "80px",
                // paddingLeft: "15px",
                // marginRight: "-160px",
              }}
            >
              <Fab
                variant="extended"
                aria-label="like"
                sx={{ backgroundColor: "pink", height: "35px" }}
              >
                <FavoriteIcon sx={{ mr: 1 }} />
                Favourites
              </Fab>
            </Typography>
          </Link>
        )}

        {user && <SellItemModal />}

        {user && (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="medium"
              sx={{ ml: 2, mr: 1 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {user.name.charAt(0)}
              </Avatar>
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        {/* <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
