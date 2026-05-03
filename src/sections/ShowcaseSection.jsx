import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const sashRef = useRef(null);
  const mackbookRef = useRef(null);
  const parallaxRef = useRef(null);

    useGSAP(() => {
      // Main section animation removed for debugging

    // Animations for each app showcase
    const cards = [sashRef.current, mackbookRef.current, parallaxRef.current];

    cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.2*index, // Stagger the animations
            ease: 'linear',
            scrollTrigger: {
              trigger: card,
              start: "top bottom -=200",
            },
          }
        );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <a
            ref={sashRef}
            className="first-project-wrapper p-2"
            href="https://github.com/Nikhil135246/SASH-Social-And-Sharing-Hub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="image-wrapper">
              <img src="/images/project1.2.png" alt="Ryde App Interface" />
            </div>
            <div className="text-content">
              <h2>
                SASH - Simple and Secure Hub where every Post is a Memory that tell your story
              </h2>
              <p className="text-white-50 md:text-xl">
                An app built with React Native, Expo, & Supabase for a fast,
                user-friendly experience.
              </p>
            </div>
          </a>

          <div className="project-list-wrapper overflow-hidden p-2 gap-2  ">
            <div
              className="project holographic-card"
              ref={mackbookRef}
              style={{ "--holo-color": "#d770fa" }} // Blue/Cyan
            >
              <div className="image-wrapper bg-[#]">
                {/* Project:1 */}
                <a
                  href="https://gsap-mackbook-landing-1.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/project2.png"
                    alt="Mackbook Pro Landing Page"
                    className="cursor-pointer transition-transform hover:scale-110"
                  />
                </a>
              </div>
              <h2>Mackbook Pro Landing Page</h2>
            </div>

            <div
              className="project holographic-card"
              ref={parallaxRef}
              style={{ "--holo-color": "#25f7bf" }} // Pink/Magenta
            >
              <div className="image-wrapper bg-[#]">
                <a
                  href="https://project-parallax-website.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/image.png"
                    alt="Parallax Website"
                    className="cursor-pointer transition-transform hover:scale-110"
                  />
                </a>
              </div>
              <h2>Feel the tropical vibes with our Parallax Website</h2>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
