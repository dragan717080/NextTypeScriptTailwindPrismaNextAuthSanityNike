"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "@/app/libs/sanity";
import { Cart } from "@/app/interfaces";

export default function CheckoutNow(
  { currency, description, image, name, price, sku }: Cart) {
  const { checkoutSingleItem } = useShoppingCart();

  const buyNow = (sku: string) => checkoutSingleItem(sku);

  const product = { name, description, price, currency, image: urlFor(image).url(), sku };

  return (
    <Button variant="outline" onClick={() => buyNow(product.sku) }>
      Checkout Now
    </Button>
  );
}
