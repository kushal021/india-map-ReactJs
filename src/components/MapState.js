import React from "react";

const MapState = ({ data, name }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 612 696"
      className="sc-hKwBBi ezlnGP"
      role="none"
      aria-label={`Map of ${name}`}
    >
      <path
        id="wb"
        name={name}
        d={data}
        className="svg-map__location"
        tabIndex="0"
        role="none"
        aria-label={name}
      ></path>
    </svg>
  );
};

export default MapState;
