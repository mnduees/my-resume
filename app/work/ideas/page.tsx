"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
const sun2 = "/homepage/computer-sun2.png";
const steam1 = "/homepage/steam_1.png";
const tibia = "/homepage/tibia.jpeg";
const cs16 = "/homepage/cs16.jpeg";
const dota2 = "/homepage/dota2.jpg";
const overwatch = "/homepage/overwatch.jpg";
const htmlcss = "/homepage/html-css.png";
const python = "/homepage/python.png";
const java = "/homepage/java.png";
const datatools = "/homepage/data_tools.png";
import Image from "next/image";
import styles from "./ideas.module.css";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  // Section 1 scroll hook
  const { scrollYProgress: section1ScrollYProgress } = useScroll({
    target: section1Ref,
    offset: ["start end", "end start"],
  });

  // Section 2 scroll hook
  const { scrollYProgress: section2ScrollYProgress } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for section1 background (slower movement)
  const bg1Y = useTransform(section1ScrollYProgress, [0, 1], [0, 0]);

  // Parallax transforms for section2 background (slower movement)
  const bg2Y = useTransform(section2ScrollYProgress, [0, 1], [0, 0]);

  // Card visibility helpers for section1
  // Divide scroll progress into 4 segments for 4 cards
  const game1Opacity = useTransform(section1ScrollYProgress, [0, 0.15], [0, 1]);
  const game1Y = useTransform(section1ScrollYProgress, [0, 0.15], [40, 0]);

  const game2Opacity = useTransform(
    section1ScrollYProgress,
    [0.15, 0.35],
    [0, 1]
  );
  const game2Y = useTransform(section1ScrollYProgress, [0.15, 0.35], [40, 0]);

  const game3Opacity = useTransform(
    section1ScrollYProgress,
    [0.35, 0.55],
    [0, 1]
  );
  const game3Y = useTransform(section1ScrollYProgress, [0.35, 0.55], [40, 0]);

  const game4Opacity = useTransform(
    section1ScrollYProgress,
    [0.55, 0.75],
    [0, 1]
  );
  const game4Y = useTransform(section1ScrollYProgress, [0.55, 0.75], [40, 0]);

  // Card visibility helpers for section2
  const tool1Opacity = useTransform(section2ScrollYProgress, [0, 0.15], [0, 1]);
  const tool1Y = useTransform(section2ScrollYProgress, [0, 0.15], [40, 0]);

  const tool2Opacity = useTransform(
    section2ScrollYProgress,
    [0.15, 0.35],
    [0, 1]
  );
  const tool2Y = useTransform(section2ScrollYProgress, [0.15, 0.35], [40, 0]);

  const tool3Opacity = useTransform(
    section2ScrollYProgress,
    [0.35, 0.55],
    [0, 1]
  );
  const tool3Y = useTransform(section2ScrollYProgress, [0.35, 0.55], [40, 0]);

  const tool4Opacity = useTransform(
    section2ScrollYProgress,
    [0.55, 0.75],
    [0, 1]
  );
  const tool4Y = useTransform(section2ScrollYProgress, [0.55, 0.75], [40, 0]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Section 1: Games */}
      <motion.div ref={section1Ref} className={styles.section} id="section1">
        {/* Parallax Background */}
        <motion.div className={styles.parallaxBg} style={{ y: bg1Y }}>
          <Image
            src={steam1}
            alt="moon background"
            fill
            className={styles.bgImage}
            priority
          />
        </motion.div>

        {/* Content */}
        <div className={styles.sectionContent}>
          {/* Game 1 */}
          <motion.div
            id="game1"
            className={styles.card}
            style={{
              opacity: game1Opacity,
              y: game1Y,
            }}
          >
            <div className={styles.cardText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className={styles.cardImage}>
              <Image src={tibia} alt="tibia" width={600} height={600} />
            </div>
          </motion.div>

          {/* Game 2 */}
          <motion.div
            id="game2"
            className={styles.card}
            style={{
              opacity: game2Opacity,
              y: game2Y,
            }}
          >
            <div className={styles.cardText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className={styles.cardImage}>
              <Image src={cs16} alt="cs 1.6" width={600} height={600} />
            </div>
          </motion.div>

          {/* Game 3 */}
          <motion.div
            id="game3"
            className={styles.card}
            style={{
              opacity: game3Opacity,
              y: game3Y,
            }}
          >
            <div className={styles.cardText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className={styles.cardImage}>
              <Image src={dota2} alt="dota 2" width={600} height={600} />
            </div>
          </motion.div>

          {/* Game 4 */}
          <motion.div
            id="game4"
            className={styles.card}
            style={{
              opacity: game4Opacity,
              y: game4Y,
            }}
          >
            <div className={styles.cardText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className={styles.cardImage}>
              <Image src={overwatch} alt="overwatch" width={600} height={600} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Section 2: Tools */}
      <motion.div ref={section2Ref} className={styles.section} id="section2">
        {/* Parallax Background */}
        <motion.div className={styles.parallaxBg} style={{ y: bg2Y }}>
          <Image
            src={sun2}
            alt="sun background"
            fill
            className={styles.bgImage}
            priority
          />
        </motion.div>

        {/* Content */}
        <div className={styles.sectionContent}>
          {/* Tool 1 */}
          <motion.div
            id="tool1"
            className={styles.card}
            style={{
              opacity: tool1Opacity,
              y: tool1Y,
            }}
          >
            <div className={styles.cardText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className={styles.cardImage}>
              <Image src={htmlcss} alt="html & css" width={600} height={600} />
            </div>
          </motion.div>

          {/* Tool 2 */}
          <motion.div
            id="tool2"
            className={styles.card}
            style={{
              opacity: tool2Opacity,
              y: tool2Y,
            }}
          >
            <div className={styles.cardText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className={styles.cardImage}>
              <Image src={python} alt="python" width={600} height={600} />
            </div>
          </motion.div>

          {/* Tool 3 */}
          <motion.div
            id="tool3"
            className={styles.card}
            style={{
              opacity: tool3Opacity,
              y: tool3Y,
            }}
          >
            <div className={styles.cardText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className={styles.cardImage}>
              <Image src={java} alt="java" width={600} height={600} />
            </div>
          </motion.div>

          {/* Tool 4 */}
          <motion.div
            id="tool4"
            className={styles.card}
            style={{
              opacity: tool4Opacity,
              y: tool4Y,
            }}
          >
            <div className={styles.cardText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className={styles.cardImage}>
              <Image
                src={datatools}
                alt="data tools"
                width={600}
                height={600}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
