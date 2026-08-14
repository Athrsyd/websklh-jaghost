import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AestheticDigitCounter({ targetNumber, suffix = '+' }) {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const counterObj = { val: 0 };
    const counterAnim = gsap.to(counterObj, {
      val: targetNumber,
      duration: 1.8,
      ease: 'power2.out',
      delay: 0.4,
      onUpdate: () => {
        setDisplayValue(Math.floor(counterObj.val));
      },
    });

    const digits = containerRef.current.querySelectorAll('.digit-span');
    digits.forEach((digit, idx) => {
      const fromTop = idx % 2 === 0;
      gsap.fromTo(
        digit,
        {
          y: fromTop ? -18 : 18,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.4 + idx * 0.08,
          ease: 'power3.out',
        }
      );
    });

    const suffixSpan = containerRef.current.querySelector('.suffix-span');
    if (suffixSpan) {
      gsap.fromTo(
        suffixSpan,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          delay: 0.8,
          ease: 'back.out(1.7)',
        }
      );
    }

    return () => {
      counterAnim.kill();
    };
  }, [targetNumber]);

  const formattedStr = displayValue.toString();

  return (
    <div ref={containerRef} className="flex items-center justify-center space-x-[1px] sm:space-x-[2px] select-none">
      {formattedStr.split('').map((char, index) => (
        <span
          key={index}
          className="digit-span inline-block text-base xs:text-xl sm:text-3xl font-black tracking-tight leading-none text-white drop-shadow-sm"
        >
          {char}
        </span>
      ))}
      <span className="suffix-span inline-block text-base xs:text-xl sm:text-3xl font-black tracking-tight leading-none text-orange-200 ml-0.5">
        {suffix}
      </span>
    </div>
  );
}
