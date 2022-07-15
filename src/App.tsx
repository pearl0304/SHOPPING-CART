import React, { useState } from "react";
import { useQuery } from "react-query";
// Components
import { Item } from "./components/item";
import { Drawer, LinearProgress, Grid } from "@mui/material";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/icons-material/Badge";
// Styles
import { Wrapper, StyledButton } from "./css/App.styles";
// Interface
import { IShopItem } from "./interfaces/shop_Items.interface";

const getProducts = async (): Promise<IShopItem[]> => await (await fetch("https://fakestoreapi.com/products")).json();
export const App = () => {
  const [cartOpen, setCarOpen] = useState(false);
  const [cartItems, setCartItems] = useState<IShopItem[]>([]);

  const { data, isLoading, error } = useQuery<IShopItem[]>("products", getProducts);
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;

  const handleAddToCart = (clickedItem: IShopItem) => null;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCarOpen(false)}>
        Cart goes here
      </Drawer>
      <StyledButton onClick={() => setCarOpen(true)}></StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};
