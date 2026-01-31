import React, { useState, useEffect, useRef } from "react";
import { words } from "../constants";
import Button from "../components/Button";
import HeroExperience from "../components/HeroModels/HeroExperience";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedCounter from "../components/AnimatedCounter";

const Hero = () => {
    const [show3D, setShow3D] = useState(false);
    const roomRef = useRef();
  // Delay the 3D scene initialization to let GSAP run smoothly first
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow3D(true);
    }, 900); // 1-second delay (adjust based on when your animation finishes/stabilizes)

    return () => clearTimeout(timer);
  }, []);

     // 1. Text Animation
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      {
        /* from */
        y: 50,
        /* here +ve means down because it follows the CSS coordinate system where the origin is the top left corner */
        opacity: 0,
      },
      {
        /* to */
        y: 0,
        opacity: 1,
        stagger: 0.2,/* how long after all h1 tags lags like one then second then 3rd  */
        duration: 1,
        ease: "power2.inOut",
      }
    );
  });

    // 2. Room Animation (triggers when show3D becomes true)
  useGSAP(() => {
    if (show3D && roomRef.current) {
      gsap.fromTo(
        roomRef.current,
        {
          x: 50, // Starts 100px to the right
          opacity: 0, // Starts invisible
        },
        {
          x: 0,
          opacity: 1,
          duration: 2.5,
          ease: "power1.inOut", // Smooth deceleration
        }
      );
    }
  }, [show3D]);
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="background" />
      </div>

      <div className="hero-layout">
        {/* LEFT: HERO CONTENT */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5 ">
          <div className="flex flex-col gap-6 ">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, idx) => (
                      <span
                        key={idx}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>
            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi, I'm Nikhil. I love pushing myself as a developer, building<br />
              experiences across Web and Android.
            </p>
            <Button
              className="md:w-80 md:h-16 w-60 h-12"
              id="button"
              text="See my Work"
            />
          </div>
        </header>

        {/* RIGHT: 3D MODEL */}
        <figure>
          <div ref={roomRef} className="hero-3d-layout">
            {show3D && (
               <div className="w-full h-full pointer-events-auto">
                 <HeroExperience />
               </div>
             )}
          </div>
        </figure>
      </div>

             {/* Animated Counter */}

             {/* <AnimatedCounter /> */}



    </section>
  );
};

export default Hero;
