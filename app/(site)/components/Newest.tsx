import { FC } from 'react';
import Link from "next/link";
import { client } from "@/app/libs/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Product } from '@/app/interfaces';

async function getData(): Promise<Product[]> {
  const query = `*[_type == 'product'][0..3] | order(_createdAt desc) {
    _id,
    name,
    price,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url,
  }`;

  return await client.fetch(query);
}

const Newest: FC = async () => {

  const data = await getData();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="row-v justify-between">
          <h2 className="text-2xl bold tracking-tight text-gray-900">
            Our Newest products
          </h2>
          <Link className="text-primary row-v gap-x-1" href="/all">
            See All{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.imageUrl}
                    alt="Product image"
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
      </div>
    </div>
  )
}

export default Newest;
