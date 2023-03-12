import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createItem, updateItem } from "../actions/items";

const SellForm = ({ setOpen, currentItemId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentItem = useSelector((state) =>
    currentItemId ? state.items.item : null
  );

  // console.log("update d", currentItemId);

  const [itemData, setItemData] = useState({
    title: "",
    price: "",
    description: "",
    pics: "",
  });

  useEffect(() => {
    if (currentItem) {
      setItemData(currentItem);
    }
  }, [currentItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(itemData);
    setOpen(false);
    if (currentItemId) {
      dispatch(updateItem(currentItemId, itemData));
    } else {
      dispatch(createItem(itemData, navigate));
    }
  };

  const clear = () => {
    setItemData({
      title: "",
      price: "",
      description: "",
      pics: "",
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 1,
        p: 1,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        {currentItemId ? "Update Item Details" : "Sell an Item"}
      </Typography>
      <TextField
        sx={{ mt: 2 }}
        name="title"
        variant="outlined"
        label="Title"
        fullWidth
        value={itemData.title}
        onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
      />
      <TextField
        sx={{ mt: 2 }}
        name="price"
        variant="outlined"
        label="Price"
        fullWidth
        value={itemData.price}
        onChange={(e) => setItemData({ ...itemData, price: e.target.value })}
      />
      <TextField
        sx={{ mt: 2 }}
        name="description"
        variant="outlined"
        label="Description"
        fullWidth
        value={itemData.description}
        onChange={(e) =>
          setItemData({ ...itemData, description: e.target.value })
        }
      />
      <div style={{ width: "97%", margin: "10px 0" }}>
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setItemData({ ...itemData, pics: base64 })}
        />
      </div>

      <Button
        sx={{ mb: 2 }}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        fullWidth
      >
        {currentItemId ? "Update" : "Sell"}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={clear}
        fullWidth
      >
        Clear
      </Button>
    </Box>
  );
};

export default SellForm;
