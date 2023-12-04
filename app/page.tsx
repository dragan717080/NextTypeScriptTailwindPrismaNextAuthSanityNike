import { Header, CartModal, Footer, Hero, Newest, ShirtPromotionScene } from './(site)/components';

export default function Home() {
  return (
    <>
      <Header />
      <CartModal />
      <main className='-mt-6 bg-white flex-1'>
        <div className="mt-12 ml-0">
          <Hero />
          <ShirtPromotionScene />
          <Newest />
        </div>
      </main>
      <Footer />
    </>
  )
}
