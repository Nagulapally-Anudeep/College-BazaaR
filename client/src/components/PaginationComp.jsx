import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { getItems } from "../actions/items";

export default function PaginationComp() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { numberOfPages } = useSelector((state) => state.items);

  const handleChange = (e, val) => {
    setPage(val);
  };

  useEffect(() => {
    // console.log(page);
    dispatch(getItems(page));
  }, [page, dispatch]);

  return (
    <Pagination
      count={numberOfPages}
      color="primary"
      size="large"
      page={page}
      onChange={handleChange}
      sx={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}
    />
  );
}
