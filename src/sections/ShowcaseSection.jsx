import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

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
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper p-2">
            <div className="image-wrapper">
              <img src="/images/project1.png" alt="Ryde App Interface" />
            </div>
            <div className="text-content">
              <h2>
                On-Demand Rides Made Simple with a Powerful, User-Friendly App
                called Ryde
              </h2>
              <p className="text-white-50 md:text-xl">
                An app built with React Native, Expo, & TailwindCSS for a fast,
                user-friendly experience.
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden p-2 gap-2  ">
            <div
              className="project holographic-card"
              ref={libraryRef}
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
              ref={ycDirectoryRef}
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
