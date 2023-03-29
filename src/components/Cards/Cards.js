import React from "react";
import classes from "./Cards.module.css";
import Card from "../Card/Card";
import missingDog from "../utils/picture_bank/muddy.jpeg";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Cards = ({ allBreeds, loading }) => {
  const [altMessage, setAltMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setAltMessage(
        <div className={classes["alt-message"]}>
          <p>No match was found. Try adding one!</p>
          <img alt="missing dog" src={missingDog}></img>
        </div>
      );
    }, 1000);
  }, [allBreeds]);

  return (
    <div className={classes["lower-box"]}>
      <motion.ul
        className="container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {!loading && allBreeds.length ? (
          <div className={classes.cards}>
            {allBreeds.map((b) => (
              <Card key={b.id} dog={b} className="item" variants={item} />
            ))}
          </div>
        ) : (
          ""
        )}
        {!loading && !allBreeds.length ? altMessage : ""}
      </motion.ul>
    </div>
  );
};

export default Cards;
