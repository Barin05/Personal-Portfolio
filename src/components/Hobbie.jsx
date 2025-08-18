import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// TopoJSON for world countries
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// ISO A3 codes of countries you've visited
const visitedCountries = ["USA", "CAN", "AZE"];

const Hobbie = () => (
  <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
    <h2 style={{ textAlign: "center" }}>Countries I've Visited</h2>
    <ComposableMap projectionConfig={{ scale: 150 }}>
      <Geographies geography={geoUrl} stroke="#DDD" fill="#F5F4F6">
        {({ geographies }) =>
          geographies.map((geo) => {
            const code = geo.properties.ISO_A3;
            const isVisited = visitedCountries.includes(code);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isVisited ? "#FFD700" : "#F5F4F6"}
                style={{
                  default: { outline: "none" },
                  hover: {
                    fill: isVisited ? "#FFC200" : "#E0E0E0",
                    outline: "none",
                  },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  </div>
);

export default Hobbie;