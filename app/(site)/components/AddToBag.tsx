"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "@/app/libs/sanity";
import { Cart } from "@/app/interfaces";

export default function AddToBag({ currency, description, image, name, 
  price, price_id }: Cart) {

  const { addItem, handleCartClick } = useShoppingCart();

  const product = { name, description, price, currency, image: urlFor(image).url(), price_id };

  return (
    <Button onClick={() => { addItem(product), handleCartClick() }}>
      Add To Cart
    </Button>
  );
}
