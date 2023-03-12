import React, { useEffect } from "react";
import AccountMenu from "../components/AccountMenu";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemPreview from "../components/ItemPreview";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getItemsBySearch } from "../actions/items";

const SearchItems = () => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const searchQuery = new URLSearchParams(search).get("searchQuery");
  //   console.log(searchQuery);

  const { isLoading, items } = useSelector((state) => state.items);
  useEffect(() => {
    dispatch(getItemsBySearch(searchQuery));
  }, [searchQuery, dispatch]);

  return (
    <>
      <AccountMenu />
      <Box sx={{ flexGrow: 1, padding: "50px", marginLeft: "50px" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          // rowSpacing={1}
          columnSpacing={1}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {isLoading && (
            <CircularProgress
              sx={{ height: "500px", width: "500px" }}
              color="success"
            />
          )}
          {!isLoading && items?.length === 0 && (
            <Typography variant="h2">No Items with the keyword</Typography>
          )}
          {!isLoading &&
            items?.map((item, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <ItemPreview item={item} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default SearchItems;
