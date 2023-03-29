import React from "react";
import classes from "./Card.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Card = (props) => {
  return (
    <motion.li
      variants={props.variants}
      className={`${classes["card-container"]} ${props.className}`}
    >
      <Link
        style={{ textDecoration: "none" }}
        to={`/detail/${props.dog.id}`}
        dog={props}
      >
        <div className={classes["img-container"]}>
          <img
            className={classes.img}
            src={props.dog.image.url ? props.dog.image.url : props.dog.image}
            alt={props.dog.name}
          />
        </div>
        <h1>{props.dog.name}</h1>
        <p>{props.dog.temperament}</p>
        <p>{props.dog.weight} kg</p>
      </Link>
    </motion.li>
  );
};

export default Card;
