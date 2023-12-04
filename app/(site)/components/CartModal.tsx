"use client";

import { FC, MouseEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from 'react-hot-toast';
import { Cart } from "@/app/interfaces";

const CartModal = () => {
  const { cartCount, shouldDisplayCart, handleCartClick,
    cartDetails, removeItem, totalPrice, redirectToCheckout, clearCart, setItemQuantity } = useShoppingCart();

  const [quantity, setQuantity] = useState<number>(1);

  async function handleCheckoutClick(event: any) {
    event.preventDefault();

    if (!cartCount) {
      return;
    }

    try {
      toast.success(`You bought ${cartCount} item${cartCount > 1 ? 's' : ''}!`);
      clearCart();
    } catch (error) {
      console.error(error);
    }
  }

  const clearAll = (e: MouseEvent) => clearCart();

  const handleSetQuantity = (quantity: number, entry: Cart) => {
    setItemQuantity(entry.sku, quantity);
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader className="flex flex-row mt-6">
          <SheetTitle className="mt-auto mb-auto">Shopping Cart</SheetTitle>
          <Button className='bg-primary text-white ml-auto' onClick={(e) => clearAll(e)}>Clear All</Button>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">You don&apos;t have any items</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry, index) => (
                    <li key={index} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={entry.src as string}
                          alt="Product image"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{entry.name}</h3>
                            <p className="ml-4">${entry.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>
                        <div className="flex flex-1 items-center text-sm mt-4">
                          <p className="text-gray-500">QTY: </p>
                          <Select
                            defaultValue={entry.quantity as unknown as string}
                            onValueChange={(e) => handleSetQuantity(e as unknown as number, entry as unknown as Cart)}
                          >
                            <SelectTrigger className="w-20 ml-4">
                              <SelectValue className="w-20" />
                            </SelectTrigger>
                            <SelectContent className="w-20">
                              {Array.from({ length: 100 }).map((_, index) => (
                                <SelectItem
                                  value={(index + 1) as unknown as string}
                                  key={index}
                                >
                                  {index + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <button
                            type="button"
                            onClick={() => removeItem(entry.id)}
                            className="font-medium text-primary hover:text-primary/80 ml-auto pr-1"
                          >
                            Clear All
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes are calculated at checkout.
            </p>
            <div className="mt-6">
              <Button onClick={handleCheckoutClick} className="w-full">
                Checkout
              </Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                OR{" "}
                <button
                  onClick={() => handleCartClick()}
                  className=" font-medium text-primary hover:text-primary/80"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CartModal;
