import React from "react";
import { useCallback } from "react";
import { Typography, Fab } from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import SellForm from "./SellForm";

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

const SellItemModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <Typography
        sx={{
          minWidth: 100,
          fontSize: "1.25rem",
          position: "relative",
          left: "50px",
          // paddingLeft: "15px",
          // marginRight: "-160px",
        }}
        onClick={handleOpen}
      >
        <Fab
          variant="extended"
          sx={{ height: "35px", backgroundColor: "#a8d587" }}
        >
          <SellIcon sx={{ mr: 1 }} />
          Sell
        </Fab>
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SellForm setOpen={setOpen} />
        </Box>
      </Modal>
    </>
  );
};

export default SellItemModal;
