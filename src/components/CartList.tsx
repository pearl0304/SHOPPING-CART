import React, { FC } from "react";
import { CartItme } from "./CartItem";
import { Wrapper } from "../css/cartList.styles";
import { IShopItem } from "../interfaces/Items.interface";

type Props = {
  cartList: IShopItem[];
  addToCart: (clickedItem: IShopItem) => void;
  removeFromCart: (id: number) => void;
};

export const CartList: FC<Props> = ({
  cartList,
  addToCart,
  removeFromCart,
}) => {
  const calucalteTotal = (itmes: IShopItem[]) =>
    itmes.reduce((ack, item) => ack + item.amount * item.price, 0);
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartList.length < 0 ? <p>No items in cart.</p> : null}
      {cartList.map((item) => (
        <CartItme
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calucalteTotal(cartList).toFixed(2)}</h2>
    </Wrapper>
  );
};
