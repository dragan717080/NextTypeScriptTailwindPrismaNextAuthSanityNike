import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/app/libs/sanity";
import { Product } from "@/app/interfaces";
import { Header, Footer, CartModal } from "../components";

async function getData(category: string): Promise<Product[]> {
  const query = `*[_type == "product" && category->name == "${category}"] {
      _id,
      "imageUrl": images[0].asset->url,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name
    }`;

  const data = await client.fetch(query);

  return data;
}

export const dynamic = "force-dynamic";

const CategoryPage: FC<{ params: { category: string } }> = async ({ params }) => {
  const data = await getData(params.category);

  return (
    <div className="col-v min-h-screen">
    <Header />
    <CartModal />
    <main className='bg-white flex-1 mt-12 ml-0'>
      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <div className="row-v justify-between">
          <h2 className="text-2xl bold tracking-tight text-gray-900">
            Our Products for {params.category}
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product, index) => (
            <div key={index} className="group relative">
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
                  <h3 className="text-sm text-gray-700">
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
    </main>
    <Footer />
    </div>
  );
}

export default CategoryPage;
