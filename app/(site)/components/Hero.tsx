import { FC } from 'react';
import Image from 'next/image';
import { client, urlFor } from '@/app/libs/sanity';
import Link from 'next/link';

async function getData() {
  const query = "*[_type == 'heroImage'][0]";

  return await client.fetch(query);
}

export const dynamic = "force-dynamic";

const Hero: FC = async () => {

  const data = await getData();

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16 z-[1] relative">
        <div className="mb-6 col-v w-full sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-40">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            Top Fashion for a top price!
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            We sell only the most exclusive and high quality products for you.
            Essentials that are every bit as cozy as they look.
          </p>
        </div>
        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3 md:pt-20">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <Image
              src={urlFor(data.image1).url()}
              alt="Great Photo"
              className="h-full w-full object-cover object-center"
              priority
              width={500}
              height={500}
            />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <Image
              src={urlFor(data.image2).url()}
              alt="Great Photo"
              className="h-full w-full object-cover object-center"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>
      <div className="col-h justify-between gap-8 md:flex-row">
        <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border">
          {["Men", "Women", "Teens"].map((category, index) => (
            <Link
              href={'/' + category}
              className="row w-1/3 text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
              key={index}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero;
