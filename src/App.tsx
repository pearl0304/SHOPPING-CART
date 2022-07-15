import React, { useState } from "react";
import { useQuery } from "react-query";
import { Drawer, LinearProgress, Grid } from "@mui/material";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/icons-material/Badge";
import { Wrapper } from "./App.styles";
import { IShopItem } from "./interfaces/shop_Items.interface";

const getProducts = async (): Promise<IShopItem[]> => await (await fetch("https://fakestoreapi.com/products")).json();
export const App = () => {
  const { data, isLoading, error } = useQuery<IShopItem[]>("products", getProducts);
  if (isLoading) return <LinearProgress />;
  return <div className="App"></div>;
};
