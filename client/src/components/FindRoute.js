import React, { useMemo } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { div, IconButton } from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

const FindRoute = (props) => {
  const {
    destinationRef,
    originRef,
    map,
    calculateRoute,
    clearRoute,
    distance,
    duration,
  } = props;
  const center = useMemo(() => ({ lat: 44.4396, lng: 26.1521 }), []);

  const onBtnClick = (evt) => {
    calculateRoute();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "600px",
        height: "150px",
        backgroundColor: "white",
        position: "absolute",
        top: "0",
        fontFamily: "JetBrains Mono",
        borderRadius: "20px",
        marginTop: "10px",
        paddingTop: "4px",
        boxShadow: "0 5px 15px",
      }}>
      <div
        style={{
          display: "flex",
          padding: "4px",
          margin: "4px",
          bgColor: "white",
          width: "100",
          height: "100",
          flexDirection: "row",
        }}>
        <Autocomplete>
          <input
            type='text'
            placeholder='Origin'
            ref={originRef}
            style={{
              border: "2px solid #A273B3",
              padding: "8px",
              margin: "8px",
              borderRadius: "10px",
              padding: "10px",
            }}
          />
        </Autocomplete>

        <Autocomplete>
          <input
            type='text'
            placeholder='Destination'
            ref={destinationRef}
            style={{
              border: "2px solid #A273B3",
              padding: "8px",
              margin: "8px",
              borderRadius: "10px",
              padding: "10px",
            }}
          />
        </Autocomplete>

        <div>
          <button
            type='submit'
            onClick={onBtnClick}
            style={{
              backgroundColor: "#A273B3",
              padding: "10px 16px",
              margin: "4px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "0",
              boxSizing: "border-box",
              cursor: "pointer",
              fontFamily: "JetBrains Mono",
              color: "white",
            }}>
            Calculate Route
          </button>
          <IconButton
            style={{
              // backgroundColor: "#A273B3",
              padding: "10px 16px",
              margin: "4px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "0",
              boxSizing: "border-box",
              cursor: "pointer",
              fontFamily: "JetBrains Mono",
              color: "white",
            }}
            aria-label='center back'
            icon={<FaTimes />}
            onClick={clearRoute}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ padding: "10px", alignItems: "flex-start" }}>
          Distance: {distance}{" "}
        </div>
        <div style={{ padding: "10px" }}>Duration: {duration} </div>
        <IconButton
          style={{
            // backgroundColor: "#A273B3",
            padding: "10px 16px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "0",
            boxSizing: "border-box",
            cursor: "pointer",
            fontFamily: "JetBrains Mono",
            color: "white",
          }}
          aria-label='center back'
          icon={<FaLocationArrow />}
          isRound
          onClick={() => {
            map.panTo(center);
            map.setZoom(15);
          }}
        />
      </div>
    </div>
  );
};

export default FindRoute;
