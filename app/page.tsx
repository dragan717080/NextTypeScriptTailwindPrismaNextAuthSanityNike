import Image from 'next/image';
import { Header, Footer, Hero, Newest } from './(site)/components';

export default function Home() {
  return (
      <>
      <div>
        <Header />
        <section className="col-h justify-between min-w-[100%]">
          <div className='relative'>
            <div id="navbar-portal-root" className='mt-[-6px]'></div>
            <div id="__next"></div>
          </div>
        </section>
      </div>
      <main className='-mt-6 bg-white flex-1'>
        <div className="top-12 left-0">
          <Hero />
          <Newest />
        </div>
      </main>
      <Footer />
    </>
  )
}
