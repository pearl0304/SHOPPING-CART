import React, { FC } from "react";
import { Button } from "@mui/material";
import { Wrapper } from "../css/cartItems.sytles";
import { IShopItem } from "../interfaces/Items.interface";

type Props = {
  item: IShopItem;
  addToCart: (item: IShopItem) => void;
  removeFromCart: (id: number) => void;
};

export const CartItme: FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
      </div>
      <div className="buttons">
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => {
            removeFromCart(item.id);
          }}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => {
            addToCart(item);
          }}
        >
          +
        </Button>
      </div>
      <img src={item.image} alt={item.title} />
    </Wrapper>
  );
};
