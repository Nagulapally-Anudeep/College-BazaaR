import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LockIcon from "@mui/icons-material/Lock";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    dispatch(authActions.clearError());
    setOpen(true);
  };
  const handleClose = useCallback(() => setOpen(false), []);
  const [isSignIn, setIsSignIn] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      handleClose();
      // console.log("hi");
    }
  }, [user, handleClose]);

  const changeSignInUp = (val) => {
    dispatch(authActions.clearError());
    setIsSignIn(val);
  };

  return (
    <div>
      <Typography
        sx={{
          minWidth: 100,
          fontSize: "1.25rem",
          paddingLeft: "15px",
          marginRight: "10px",
        }}
        onClick={handleOpen}
      >
        <Fab
          variant="extended"
          sx={{ backgroundColor: "skyBlue", height: "35px" }}
        >
          <LockIcon sx={{ mr: 1 }} />
          Sign In
        </Fab>
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isSignIn && <SignIn changeSignInUp={changeSignInUp} />}
          {!isSignIn && <SignUp changeSignInUp={changeSignInUp} />}
        </Box>
      </Modal>
    </div>
  );
}
