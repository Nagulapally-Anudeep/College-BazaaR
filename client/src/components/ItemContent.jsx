import React, { useCallback } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ChatIcon from "@mui/icons-material/Chat";
import Fab from "@mui/material/Fab";
import Modal from "@mui/material/Modal";
import SellForm from "./SellForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../actions/items";
import { useNavigate } from "react-router-dom";
import { accessChat } from "../actions/chat";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CardStyle = {
  maxWidth: 350,
  margin: "10px",
};

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

export default function ItemContent({ item }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = useCallback(() => setOpen(false), []);
  // console.log(item?._id);
  const currentUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteItem(item._id, navigate));
  };

  const handleChatWithUser = () => {
    // console.log(item.seller._id);
    dispatch(accessChat(item.seller._id));
    navigate("/chat");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ margin: "15px" }}>
        <Grid item xs={6} md={7}>
          <Item>
            <img
              src={item?.pics}
              alt={item?.title}
              style={{ width: "840px", height: "500px" }}
            />
          </Item>
        </Grid>
        <Grid
          item
          container
          direction="column"
          spacing={2}
          xs={6}
          md={4}
          sx={{ marginLeft: "60px", padding: "20px" }}
        >
          <Grid item>
            <Item>
              <Typography variant="h4">{item?.title}</Typography>

              <Typography variant="h5">₹ {item?.price}</Typography>
              <Typography variant="h7">posted a day ago</Typography>

              <Stack
                sx={{ marginTop: "10px", marginBottom: "10px" }}
                direction="row"
                justifyContent="space-evenly"
                spacing={2}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleOpen}
                  disabled={currentUser?._id !== item?.seller._id}
                >
                  Update Item
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  disabled={currentUser?._id !== item?.seller._id}
                  onClick={handleDelete}
                >
                  Delete Item
                </Button>
              </Stack>
            </Item>
          </Grid>
          <Grid item>
            <Card sx={CardStyle}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="owner">
                    {item?.seller.name.charAt(0)}
                  </Avatar>
                }
                title={item?.seller.name}
                subheader={`joined ${4 + 5} days ago`}
              />

              <CardContent>
                <Typography
                  sx={{
                    minWidth: 100,
                    fontSize: "1.25rem",
                  }}
                >
                  <Fab
                    variant="extended"
                    aria-label="like"
                    sx={{ backgroundColor: "violet", height: "35px" }}
                    disabled={
                      !currentUser || currentUser?._id === item?.seller._id
                    }
                    onClick={handleChatWithUser}
                  >
                    <ChatIcon sx={{ mr: 1 }} />
                    Chat with seller
                  </Fab>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={6} md={7}>
          <Item sx={{ textAlign: "start" }}>
            <h3 style={{ fontFamily: "monospace" }}>{item?.description}</h3>
          </Item>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SellForm setOpen={setOpen} currentItemId={item?._id} />
        </Box>
      </Modal>
    </Box>
  );
}
