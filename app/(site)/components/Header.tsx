'use client';

import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { MagnifyingGlassIcon, GlobeAltIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Navbar } from '.';
import ArrowIcon from './svgs/ArrowIcon';
import Link from 'next/link';
import { HeaderMenuToolbar } from './navbar-toolbars';
import { useHeaderBurgerMenuStore } from '@/store/zustandStore';

const Header: FC = () => {
  const session = useSession();
  const router = useRouter();

  const { isHeaderBurgerMenuOpen, toggleIsHeaderBurgerMenuOpen } = useHeaderBurgerMenuStore();

  return (
    <header className='sticky top-0 z-40 row-v bg-white shadow-lg py-3 px-4 md:px-10 xl:px-[15rem] 2xl:px-[22rem] text-gray-600'>
      <div
        onClick={() => router.push('/')}
        className="row"
      >
        <div className='relative row-v h-10 w-10 pointer'>
          <Image
            fill
            src='/assets/images/logo.webp'
            objectFit='contain'
            objectPosition='left'
            alt={`logo`}
          />
        </div>
        <Link href="/">
          <h1 className="text-2xl md:text-2xl bold -mt-1.5 ml-2.5">
            Dragan<span className="t-primary">Websites</span>
          </h1>
        </Link>
      </div>
      <Navbar />
      <div className='row-v min-w-[40%] md:min-w-[14rem] xl:min-w-[17rem] 2xl:min-w-[20rem] xs:py-1 pt-2.5 pb-2 xs:border-2 rounded-full md:shadow-sm xs:mx-6'>
        <input
          type="text"
          placeholder='Start your search'
          className='ml-1 pl-4 border-none outline-none bg-transparent flex-grow text-sm placeholder-gray-300'
        />
        <MagnifyingGlassIcon className='h-8 mr-2 p-2 bg-primary rounded-full text-white pointer hidden xs:inline-flex xs:mx-2' />
      </div>
      <div className='flex items-center space-x-4 md:ml-auto semibold'>
        {session.status === 'authenticated'
          ? <div className='inline-flex'>
            <div className='t-red'>{session.data!.user!.name}</div>
            <button className='t-cornflowerblue ml-3' onClick={async () => await signOut()} >Logout</button>
          </div>
          : <div className='md:pl-3 lg:pl-0 md:pr-16 2xl:pr-4 hover:text-primary'><a href='auth'>Login</a></div>
        }
      </div>
      <div
        id="burger-menu-btn"
        className="block md:hidden text-xl ml-auto xs:mr-6 relative"
        onClick={toggleIsHeaderBurgerMenuOpen}>
        <span>{!isHeaderBurgerMenuOpen ? '☰' : 'X'}</span>
        <HeaderMenuToolbar isOpen={isHeaderBurgerMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
