import { Header, CartModal, Footer, Hero, Newest } from './(site)/components';

export default function Home() {
  return (
      <>
      <Header />
      <CartModal />
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
