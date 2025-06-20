import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./App.css";

const App = () => {
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [delayTime, setDelayTime] = useState(0);

  const randomValue = gsap.utils.random(2, 26, 4);

  useGSAP(() => {
    gsap.to(".fly", {
      duration: 0.5,
      x: xValue,
      y: yValue,
      rotate: rotateValue,
      delay: delayTime,
      ease: "elastic",
    });

    gsap.to(".kill", {
      duration: 0.1,
      x: mouseX,
      y: mouseY,
    });
  }, [xValue, yValue, rotateValue, mouseX, mouseY, delayTime]);

  useGSAP(() => {
    gsap.from(".message", {
      opacity: 0,
      duration: 4,
    });

    // 🔥 Hide Message after 2 seconds
    gsap.to(".message", {
      opacity: 0,
      duration: 2,
      delay: 4,
    });
  });

  return (
    <div
      className="container bg-[#1c1c1c] min-w-screen h-screen flex justify-center items-center overflow-hidden relative"
      onMouseMove={(dets) => {
        setMouseX(dets.clientX - 830);
        setMouseY(dets.clientY - 360);
      }}
    >
      <div className="message bg-orange-400 absolute top-10 text-xl rounded-3xl font-semibold text-[#1c1c1c]">
        Click on the fly to kill it!!
      </div>

      <div className="message2 bg-orange-400 absolute top-10 text-xl rounded-3xl font-semibold text-[#1c1c1c]">
        OOPs! you missed!!
      </div>

      <div className="message3 bg-orange-400 absolute top-70 text-xl rounded-3xl font-semibold text-[#1c1c1c]">
        Hooray! you killed it!!
      </div>

      <div className="message4 bg-orange-400 absolute top-90 text-xl rounded-3xl font-semibold text-[#1c1c1c]">
        Game will restart!!
      </div>

      <img
        className="fly h-[80px]"
        src="https://images.vexels.com/media/users/3/242241/isolated/preview/409d95bf597e130c6c1b1d2ac3f5dbf5-side-fly-geometric-color-stroke.png"
        alt=""
        onClick={() => {
          const xVal = gsap.utils.random(-500, 500, 100);
          const yVal = gsap.utils.random(-300, 300, 100);
          const rotateVal = gsap.utils.random(0, 360, 30);
          setXValue(xVal);
          setYValue(yVal);
          setRotateValue(rotateVal);

          setAttempt((prev) => prev + 1);

          // Scale down racket when clicking the fly
          gsap.to(".kill", {
            duration: 0.2,
            scale: 0.8,
            ease: "power2.out",
          });

          // Revert scale back to normal after 0.2s
          gsap.to(".kill", {
            duration: 0.1,
            delay: 0.2,
            scale: 1,
            ease: "power2.out",
          });

          if (randomValue > attempt) {
            gsap.to(".message2", {
              opacity: 1,
              duration: 1,
            });

            // Hide Message2 after 1 seconds
            gsap.to(".message2", {
              opacity: 0,
              duration: 1,
              delay: 1,
            });
          } else {
            setDelayTime(2);

            gsap.to(".kill, .fly", {
              opacity: 0,
            });

            gsap.to(".message3", {
              opacity: 1,
              duration: 1,
            });

            // Hide Message2 after 1 seconds
            gsap.to(".message3", {
              opacity: 0,
              duration: 1,
              delay: 2,
            });

            gsap.to(".message4", {
              opacity: 1,
              duration: 1,
              delay: 2,
            });

            gsap.to(".message4", {
              opacity: 0,
              duration: 1,
              delay: 5,
            });

            setTimeout(() => {
              window.location.reload();
            }, 6000);
          }
        }}
      />

      <img
        className="kill h-[120px]"
        src="https://cdn-icons-png.flaticon.com/256/4881/4881475.png"
        alt=""
      />
    </div>
  );
};

export default App;
