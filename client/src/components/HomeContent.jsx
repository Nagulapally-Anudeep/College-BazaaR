import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemPreview from "./ItemPreview";
import PaginationComp from "./PaginationComp";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

export default function HomeContent({ isFavs }) {
  const { isLoading } = useSelector((state) =>
    isFavs ? { isLoading: false } : state.items
  );

  const items = useSelector((state) =>
    isFavs ? state.auth.favItems : state.items.items
  );
  // console.log(items);

  return (
    <>
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
            <Typography variant="h2">
              No {isFavs && "Favourite"} Items
            </Typography>
          )}
          {!isLoading &&
            items?.map((item, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <ItemPreview item={item} />
              </Grid>
            ))}
        </Grid>
      </Box>
      {!isFavs && <PaginationComp />}
    </>
  );
}
