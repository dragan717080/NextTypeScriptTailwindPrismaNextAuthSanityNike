import { FC, memo } from 'react';
import Link from "next/link";
import { client } from "@/app/libs/sanity";
import { ArrowRight } from "lucide-react";
import { Product } from '@/app/interfaces';
import NewestProducts from './NewestProducts';

async function getData(): Promise<Product[]> {
  const query = `*[_type == 'product'][] | order(_createdAt desc) {
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

  const MemoizedNewestProducts = memo(NewestProducts);

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
        <MemoizedNewestProducts allProducts={data} />
      </div>
    </div>
  )
}

export default Newest;
