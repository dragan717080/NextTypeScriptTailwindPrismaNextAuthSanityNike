"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "@/app/libs/sanity";
import { Cart } from "@/app/interfaces";

export default function CheckoutNow(
  { currency, description, image, name, price, price_id }: Cart) {
  const { checkoutSingleItem } = useShoppingCart();

  const buyNow = (priceId: string) => checkoutSingleItem(priceId);

  const product = { name, description, price, currency, image: urlFor(image).url(), price_id };

  return (
    <Button variant="outline" onClick={() => buyNow(product.price_id) }>
      Checkout Now
    </Button>
  );
}
