import { Button } from "@mui/material";
import React from "react";
import { IShopItem } from "../interfaces/Items.interface";
import { Wrapper } from "../css/item.styles";

type Props = {
  item: IShopItem;
  handleAddToCart: (clickedItem: IShopItem) => void;
};

export const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
    </div>
    <Button
      onClick={() => {
        handleAddToCart(item);
      }}
    >
      Add to cart
    </Button>
  </Wrapper>
);
