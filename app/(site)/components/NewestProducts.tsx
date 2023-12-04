'use client';

import { FC } from 'react';
import { Product } from '@/app/interfaces';
import { useProductsStore } from '@/app/store/zustandStore';
import Link from "next/link";
import Image from "next/image";

const NewestProducts: FC<{allProducts: Product[]}> = ({allProducts}) => {
  const { products, setProducts } = useProductsStore();
  if (!products.length) {
    setProducts(allProducts);
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    {allProducts.slice(0, 4).map((product) => (
      <div key={product._id} className="group relative">
        <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.imageUrl}
              alt={`${product.name} Image`}
              className="w-full h-full object-cover object-center lg:h-full lg:w-full"
              width={300}
              height={300}
            />
          </Link>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700 text-primary">
              <Link href={`/product/${product.slug}`}>
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {product.categoryName}
            </p>
          </div>
          <p className="text-sm font-medium text-gray-900">
            ${product.price}
          </p>
        </div>
      </div>
    ))}
  </div>
  )
}

export default NewestProducts;
