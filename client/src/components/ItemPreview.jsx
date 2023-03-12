import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateFavItems } from "../actions/user";

const CardStyle = {
  maxWidth: 355,
  margin: "10px",
};

export default function ItemPreview({ item }) {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.user);
  const currentFavItems = useSelector((state) => state.auth.favItems);
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate(`/items/${item._id}`);
  };

  const handleFavs = () => {
    dispatch(updateFavItems(item?._id));
  };

  let isItemFav = currentFavItems.filter((it) => it._id === item._id);

  return (
    <Card sx={CardStyle}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="owner">
            {item.seller.name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="add to favorites"
            disabled={!currentUser}
            onClick={handleFavs}
            sx={{ color: isItemFav.length > 0 && "red" }}
          >
            <FavoriteIcon />
          </IconButton>
        }
        title={item.seller.name}
        subheader="September 14, 2016"
      />
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="194"
          image={item.pics}
          alt={item.title}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            ₹ {item.price}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {item.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
