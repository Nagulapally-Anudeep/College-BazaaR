import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountMenu from "../components/AccountMenu";
import { getItem } from "../actions/items";
import ItemContent from "../components/ItemContent";
import CircularProgress from "@mui/material/CircularProgress";

const Item = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const { item, isLoading } = useSelector((state) => state.items);
  // console.log(item);

  useEffect(() => {
    dispatch(getItem(itemId));
  }, [itemId, dispatch]);

  if (!item && !isLoading) {
    return (
      <>
        <AccountMenu />
        <h1>Item Not Found</h1>
      </>
    );
  }

  return (
    <>
      <AccountMenu />
      {isLoading ? (
        <CircularProgress
          sx={{
            height: "500px",
            width: "500px",
            display: "flex",
          }}
          color="success"
        />
      ) : (
        <ItemContent item={item} />
      )}
    </>
  );
};

export default Item;
