"use client";

import { FC, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from 'react-hot-toast';

const CartModal = () => {
  const { cartCount, shouldDisplayCart, handleCartClick, 
    cartDetails, removeItem, totalPrice, redirectToCheckout, clearCart } = useShoppingCart();

  async function handleCheckoutClick(event: any) {
    event.preventDefault();
    try {
      toast.success(`You bought ${cartCount} items!`);
      clearCart();
    } catch (error) {
      console.error(error);
    }
  }

  const clearAll = (e: MouseEvent) => clearCart();

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader className="flex flex-row mt-6">
          <SheetTitle className="mt-auto mb-auto">Shopping Cart</SheetTitle>
          <Button className='bg-primary text-white ml-auto' onClick={(e) => clearAll(e)}>Clear All</Button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default CartModal;
