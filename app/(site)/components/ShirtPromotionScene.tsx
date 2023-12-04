'use client';

import React, { FC, useEffect } from 'react';
import { ShirtCanvas } from '.';
import { motion, AnimatePresence } from 'framer-motion';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '@/app/config/motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const ShirtPromotionScene: FC = () => {

  const getThreshold = () => {
    if (typeof(window) === 'undefined') {
      return;
    }

    return window.innerWidth > 1280 ? 0.6 : window.innerWidth > 770 ? 0.6 : window.innerWidth > 500 ? 0.3 : 0.15;
  }

  const [inViewRef, inView] = useInView({
    threshold: getThreshold()
  });

  return (
    <section
      className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'
      ref={inViewRef}
    >
      <div className="row flex-col md:flex-row gap-10 h-[28rem] xl:h-[30rem] 2xl:h-[32rem]">
        {inView && (
          <AnimatePresence>
            <motion.div className="Picker h-full mt-12" {...slideAnimation('left')}>
              <motion.div className="Picker-content" {...headContainerAnimation}>
                <motion.div {...headTextAnimation}>
                  <h1 className="head-text">
                    LET&apos;S <br className="xl:block hidden" /> DO IT.
                  </h1>
                </motion.div>
                <motion.div
                  {...headContentAnimation}
                  className="flex flex-col gap-5"
                >
                  <p className="max-w-md font-normal text-gray-600 text-base pl-2">
                    Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
                  </p>
                </motion.div>
              </motion.div>
              <motion.div {...headTextAnimation} className='mx-auto md:mx-0 mt-6 mb-4 md:mt-4'>
                <Link href='/shirt'>
                  <div className="row-h md:block">
                    <button className="bg-primary text-white px-10 py-3 shadow-md rounded-full bold my-3 hover:shadow-xl active:scale-90 transition duration-150 mt-5">
                      Customize T-Shirt
                    </button>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
        <div className="-my-[2rem] h-full min-w-[28rem] 2xl:w-[32rem] relative w-full">
          <ShirtCanvas />
        </div>
      </div>
    </section>
  )
}

export default ShirtPromotionScene;
