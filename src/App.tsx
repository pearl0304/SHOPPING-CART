import React, { useState } from "react";
import { useQuery } from "react-query";
// Components
import { Item } from "./components/Item";
import { CartList } from "./components/CartList";
import { Drawer, LinearProgress, Grid } from "@mui/material";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
// Styles
import { Wrapper, StyledButton } from "./css/App.styles";
// Interface
import { IShopItem } from "./interfaces/Items.interface";

const getProducts = async (): Promise<IShopItem[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

export const App = () => {
  const [cartOpen, setCarOpen] = useState(false);
  const [cartList, setCartList] = useState<IShopItem[]>([]);

  const { data, isLoading, error } = useQuery<IShopItem[]>(
    "products",
    getProducts
  );
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;

  const handleAddToCart = (clickedItem: IShopItem): void => {
    setCartList((prev) => {
      // Check the item alread added in the cart
      const isItemInCart = cartList.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [{ ...clickedItem, amount: 1 }, ...prev];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartList((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as IShopItem[])
    );
  };

  const getTotalItems = (items: IShopItem[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCarOpen(false)}>
        <CartList
          cartList={cartList}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCarOpen(true)}>
        <Badge badgeContent={getTotalItems(cartList)} color="error">
          <AddShoppingCart color="action" />
        </Badge>
      </StyledButton>
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
