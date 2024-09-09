import React from "react";
import "./Loader.css";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="loader">
      <Spinner animation="grow" className="spinner" />
    </div>
  );
};

export default Loader;
