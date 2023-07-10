import React, { useEffect, useRef, useState } from "react";
import India from "@svg-maps/india";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import styled from "styled-components";
import MapState from "./MapState";

const MapIndia = () => {
  const [hoveredState, setHoveredState] = useState("");
  const [defaultSelectedState, setDefaultSelectedState] = useState([]);
  const [state, setState] = useState();
  const [tooltipPosition, setTooltipPosition] = useState({
    display: "none",
  });

  const selectedStateColor = [
    "#FF6666",
    "#FF8989",
    "#FCAEAE",
    "#FFEADD",
    "#FF9B9B",
    "#FFD6A5",
    "#FFFEC4",
    "#CBFFA9",
  ];

  // Getting clicked location and changing colour
  function onLocationClick(event) {
    let stateArray = [...defaultSelectedState];
    if (stateArray?.includes(event.target.getAttribute("name"))) {
      stateArray = stateArray?.filter(
        (ele) => ele !== event.target.getAttribute("name")
      );
    } else {
      stateArray.push(event.target.getAttribute("name"));
    }
    setDefaultSelectedState([...stateArray]);
    localStorage.setItem("mapData", JSON.stringify([...stateArray]));
    const stateData = India?.locations?.find(
      (location) => location.id === event.target.id
    );

    if (stateData) {
      setState(stateData);
    }
  }

  // Removing all states from select
  const clearAllFunction = () => {
    setDefaultSelectedState([]);
    localStorage.clear();
  };

  // Showing tooltip on hover
  const handleStateHover = (event) => {
    setHoveredState(event.target.attributes.name.value);
    const tooltipStyle = {
      display: "block",
      top: event.clientY + 10,
      left: event.clientX - 100,
    };
    setTooltipPosition({ ...tooltipStyle });
  };

  // Removing tooltip on mouseout
  const handleLocationMouseOut = () => {
    setHoveredState(null);
    setTooltipPosition({ display: "none" });
  };

  // Setting up by default selected array
  useEffect(() => {
    const mapData = JSON.parse(localStorage.getItem("mapData")) || ["Gujarat"];
    setDefaultSelectedState([...mapData]);
  }, []);

  return (
    <>
      <div className="main-div">
        <article className="examples__block">
          <div className="title">
            <div>
              <h2 className="examples_block_title">India 🗺️</h2>
              <StyledButton onClick={() => clearAllFunction()}>
                Clear all
              </StyledButton>
            </div>
          </div>
          <div className="examples_blockmap examplesblock_map--india">
            <StyledSVGMap
              map={India}
              onLocationClick={onLocationClick}
              $selectedLocations={defaultSelectedState}
              onStateLeave={() => setHoveredState(null)}
              onLocationMouseMove={handleStateHover}
              onLocationMouseOut={handleLocationMouseOut}
              $selectedStateColor={selectedStateColor}
              $defaultSelectedState={defaultSelectedState}
            />
            <div className="examples_blockmap_tooltip" style={tooltipPosition}>
              {hoveredState}
            </div>
          </div>
        </article>
        <div className="mapView">
          <p>{state?.name}</p>
          {/* <p>{state?.id}</p> */}
          {state && <MapState data={state?.path} name={state?.name} />}
        </div>
      </div>
    </>
  );
};

export default MapIndia;

// Styling up main SVG component
const StyledSVGMap = styled(SVGMap)`
  ${({ $defaultSelectedState, $selectedStateColor }) =>
    $defaultSelectedState?.map(
      (state, index) => `
  & [aria-label="${state}"] {
    fill: ${$selectedStateColor[index < 9 ? index : 0]};
  }

  &[aria-label="${state}"]:hover {
    fill: #fff; /* Set the color when hovering */
  }
`
    )}

  width: 70%;
  height: auto;
  stroke: #666;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

// Styling up Button
const StyledButton = styled.button`
  background-color: #e4f0ec;
  padding: 0px 34px;
  border-radius: 17px;
  display: inline-block;
  height: 40px;
  cursor: pointer;
`;
