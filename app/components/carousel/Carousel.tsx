"use client";

import React, { useState } from "react";
import styles from "./carousel.module.scss";
import Image from "next/image";
import project1 from "@/public/projects/project1.png";
import project2 from "@/public/projects/project2.png";
import project3 from "@/public/projects/project3.png";
import DynamicIcon from "../buttons/button-icon/ButtonIcon";
import { motion, Easing } from "framer-motion";

const Carousel = () => {
  // image index state
  const [activeIndex, setActiveIndex] = useState(0);

  // transition direction state
  const [transitionDirection, setTransitionDirection] = useState("next");

  // function to handle next button click
  const handleNext = () => {
    setTransitionDirection("next");
    setActiveIndex((prevIndex) =>
      prevIndex === 2 ? prevIndex : prevIndex + 1
    );
  };

  // function to handle previous button click
  const handlePrevious = () => {
    setTransitionDirection("previous");
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  // Array for titles and descriptions
  const texts = [
    {
      title: "Immersive gaming experience",
      description:
        "adipisicing elit. Iure doloremque aut ratione eos! Laudantium ipsum velit, modi quae repudiandae, in quidem iste cupiditate sequi expedita placeat quam rerum, optio facilis. Officia iure quo illo eligendi. Perspiciatis voluptatibus itaque natus maiores alias vitae, reprehenderit distinctio cupiditate libero fugiat aut architecto ratione?",
    },
    {
      title: "On demand support when you need it",
      description:
        "doloremque aut ratione eos! Laudantium ipsum velit, modi quae repudiandae, in quidem iste cupiditate sequi expedita placeat quam rerum, optio facilis. Officia iure quo illo eligendi. Perspiciatis voluptatibus itaque natus maiores alias vitae, reprehenderit distinctio cupiditate libero fugiat aut architecto ratione?",
    },
    {
      title: "Accessible and inclusive to all",
      description:
        "Laudantium ipsum velit, modi quae repudiandae, in quidem iste cupiditate sequi expedita placeat quam rerum, optio facilis. Officia iure quo illo eligendi. Perspiciatis voluptatibus itaque natus maiores alias vitae, reprehenderit distinctio cupiditate libero fugiat aut architecto ratione?",
    },
  ];

  // defining text animation
  const textVariants = {
    hidden: {
      opacity: 0,
      x: transitionDirection === "next" ? 100 : -100,
      transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] as Easing },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] as Easing },
    },
  };

  // defining stagger text effect
  const textContainerVariant = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className={styles.carouselContainer}>
      <motion.div
        className={styles.contentContainer}
        key={activeIndex}
        variants={textContainerVariant}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.titleContainer}>
          <motion.h1 className={styles.header} variants={textVariants}>
            {texts[activeIndex].title}
          </motion.h1>
        </div>
        <div className={styles.descriptionContainer}>
          <motion.p className={styles.paragraph} variants={textVariants}>
            {texts[activeIndex].description}
          </motion.p>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>Learn more</button>
        </div>
      </motion.div>
      <div className={styles.imagesContainer}>
        <motion.div
          className={styles.firstContainer}
          animate={{
            opacity: activeIndex === 0 ? 1 : 0,
            x: activeIndex === 0 ? "0px" : "96px",
            scale: activeIndex === 0 ? 1 : 1.2,
          }}
          transition={{
            duration: 0.5,
            delay: 0,
            ease: "easeInOut",
          }}
        >
          <Image
            className={styles.first}
            alt="first image"
            src={project1}
          ></Image>
        </motion.div>
        <motion.div
          className={styles.secondContainer}
          animate={{
            opacity: activeIndex === 0 ? 0.66 : activeIndex === 1 ? 1 : 0,
            x: activeIndex === 0 ? "-96px" : activeIndex === 1 ? "0px" : "96px",
            scale: activeIndex === 0 ? 0.8 : activeIndex === 1 ? 1 : 1.2,
          }}
          transition={{
            duration: 0.5,
            delay: 0,
            ease: "easeInOut",
          }}
        >
          <Image
            className={styles.second}
            alt="second image"
            src={project2}
          ></Image>
        </motion.div>
        <motion.div
          className={styles.thirdContainer}
          animate={{
            opacity: activeIndex === 0 ? 0.33 : activeIndex === 1 ? 0.66 : 1,
            x:
              activeIndex === 0
                ? "-196px"
                : activeIndex === 1
                ? "-96px"
                : "0px",
            scale: activeIndex === 0 ? 0.6 : activeIndex === 1 ? 0.8 : 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0,
            ease: "easeInOut",
          }}
        >
          <Image
            className={styles.third}
            alt="third image"
            src={project3}
          ></Image>
        </motion.div>
        <div className={styles.controls}>
          <button
            className={
              activeIndex === 0 ? styles.disabled : styles.previousContainer
            }
            onClick={handlePrevious}
          >
            <DynamicIcon
              name="arrow-left"
              color={activeIndex === 0 ? "gray" : "#eb5757"}
              size={55}
            ></DynamicIcon>
          </button>
          <button
            className={
              activeIndex === 2 ? styles.disabled : styles.nextContainer
            }
            onClick={handleNext}
          >
            <DynamicIcon
              name="arrow-right"
              color={activeIndex === 2 ? "gray" : "#eb5757"}
              size={55}
            ></DynamicIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
