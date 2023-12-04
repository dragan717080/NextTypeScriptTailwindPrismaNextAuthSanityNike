import { FC, useState, MouseEvent } from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { useProductsMatchingInputStore, useSearchInputStore } from '@/app/store/zustandStore';
import { useShoppingCart } from "use-shopping-cart";
import { useSession } from "next-auth/react";
import { Product } from '@/app/interfaces';

const HeaderSearchMenu: FC = () => {

  const session = useSession();

  const { setSearchInput } = useSearchInputStore();

  const { productsMatchingInput, setProductsMatchingInput } = useProductsMatchingInputStore();

  const { addItem, handleCartClick } = useShoppingCart();

  const getCurrentPrice = (product: Product): number => product.price;

  const handleSelectProduct = (e: MouseEvent<HTMLElement>, product: Product) => {
    setProductsMatchingInput([]);
    setSearchInput('');
    const cartProduct = {
      ...product,
      sku: product.slug,
      price: getCurrentPrice(product),
      currency: 'USD',
      src: product.imageUrl
    }

    addItem(cartProduct as any);
    handleCartClick();
  }

  return (
    <div className={`${!productsMatchingInput.length ? 'hidden' : ''} mt-4`}>
      <div className="row space-x-4 space-y-5 mx-auto w-[fit-content]">
        {productsMatchingInput.map((product) => (
          <div
            className="mx-auto py-2 pl-2 flex flex-col md:row space-y-4 md:space-y-0 md:space-x-0 hover:bg-gray-200 hover:scale-105 active:scale-95 transition transform duration-200 ease-out pointer"
            onClick={(e) => handleSelectProduct(e, product)}
            key={uuidv4()}
          >
            <div className='relative h-16 w-24 mx-auto' >
              <Image fill alt={`${product.name} Image`} src={product.imageUrl ?? ''} className='rounded-xl' sizes='6rem' />
            </div>
            <div className='w-28 md:w-[10rem] overflow-hidden text-ellipsis text-center md:whitespace-nowrap ml-0 space-y-0'>
              {product.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeaderSearchMenu;
