import { FC } from 'react';
import { FullProduct } from '@/app/interfaces';
import { client } from '@/app/libs/sanity';
import { ImageGallery, AddToBag, CheckoutNow } from '@/app/(site)/components';
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import { v4 } from "uuid";
import Link from 'next/link';

async function getData(slug: string): Promise<FullProduct> {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
      _id,
      images,
      price,
      name,
      description,
      "slug": slug.current,
      "categoryName": category->name,
      price_id
    }`;

  return await client.fetch(query);
}

export const dynamic = "force-dynamic";

const ProductPage: FC<{ params: { slug: string } }> = async ({ params }) => {

  const data = await getData(params.slug);
  console.log(data);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>
              <span className="text-sm text-gray-500 transition duration-100">
                56 ratings
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">${data.price}</span>
                <span className="mb-0.5 text-red-500 line-through">${data.price + 30}</span>
              </div>
              <span className="text-sm text-gray-500">Incl. Vat plus shipping</span>
            </div>
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>
            <div className="flex gap-2.5">
              <AddToBag
                sku={data.slug}
                currency="USD"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                key={v4()}
              />
            </div>
            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage;
