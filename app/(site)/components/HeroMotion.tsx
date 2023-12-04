/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Link from 'next/link';
import React, { FC, useRef, useEffect } from 'react';

const HeroMotion: FC = () => {
  const elts = {
    text1: useRef<HTMLSpanElement>(null!),
    text2: useRef<HTMLSpanElement>(null!),
  };

  if (typeof (window) === 'undefined' || window.innerWidth < 850) {
    return <></>;
  }

  const texts = [
    "Essentials",
    "That",
    "Are",
    "As",
    "Bit",
    "Cozy",
    "As",
    "They",
    "Look.",
  ];

  let textIndex = texts.length - 1;
  let time = new Date();
  let morph = 0;
  let appearanceCooldown = 3.5;
  let disappearanceCooldown = 0.25;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const doMorph = () => {
      morph -= disappearanceCooldown;
      disappearanceCooldown = 0;

      let fraction = morph / 1;

      if (fraction > 1) {
        disappearanceCooldown = 0.1;
        fraction = 1;
      }

      setMorph(fraction);
    };

    const setMorph = (fraction: number) => {
      if (!elts.text2.current) {
        return;
      }

      elts.text2.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text2.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      fraction = 1 - fraction;
      elts.text1.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text1.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      // Uncomment to also write previous line
      /* elts.text1.current.textContent = texts[textIndex % texts.length]; */
      elts.text2.current.textContent = texts[(textIndex + 1) % texts.length];
    };

    const doCooldown = () => {
      morph = 0;

      if (!elts.text2.current) {
        return;
      }

      elts.text2.current.style.filter = "";
      elts.text2.current.style.opacity = "100%";

      elts.text1.current.style.filter = "";
      elts.text1.current.style.opacity = "0%";
    };

    const animate = () => {
      requestAnimationFrame(animate);

      let newTime = new Date();
      let shouldIncrementIndex = disappearanceCooldown > 0;
      let dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      
      disappearanceCooldown -= dt;

      if (disappearanceCooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
        }

        doMorph();
      } else {
        doCooldown();
      }
    };

    animate();
  }, []);

  return (
    <div>
      <div className="absolute top-[30%] text-7xl font-extrabold">
        <div className="ml-4">
          <span id="text1" ref={elts.text1}></span>
          <span id="text2" ref={elts.text2}></span>
        </div>
        <div className='bold mt-20'>
          <div className='auto-link auto-link-tkr'>
            <span className='auto-link-name gradient-title-name'>DRAGAN</span> <span className='auto-link-subtext mt-6 bold'>Welcome to my website</span>
          </div>
        </div>
        <div className='mt-[10rem] ml-4 text-xl font-poppins'>
          See my portfolio <span className='auto-link-name gradient-title-name'><Link href='https://three-portfolio-seven.vercel.app/'>here.</Link></span>
        </div>
      </div>
    </div>
  );
};

export default HeroMotion;
