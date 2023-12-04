import { FC } from 'react';
import Image from 'next/image';
import { client, urlFor } from '@/app/libs/sanity';
import Link from 'next/link';
import { HeroMotion } from '.';

async function getData() {
  const query = "*[_type == 'heroImage'][0]";

  return await client.fetch(query);
}

export const dynamic = "force-dynamic";

const Hero: FC = async () => {

  const data = await getData();

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8 min-h-[38rem] mt-28 sm:mt-24 md:mt-0">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16 z-[1] relative">
        <HeroMotion />
        <div />
        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3 md:pt-20 md:ml-10">
          <div className="relative top-12 z-10 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0 min-w-[12rem]">
            <Image
              src={urlFor(data.image1).url()}
              alt="Great Photo"
              className="h-full w-full object-cover object-center"
              priority
              width={500}
              height={500}
            />
          </div>
          <div className="overflow-hidden -ml-16 rounded-lg bg-gray-100 shadow-lg min-w-[15rem]">
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
