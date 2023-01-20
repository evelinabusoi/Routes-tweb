import React, { useState, useRef } from "react";
import { GoogleMap, MarkerF, DirectionsRenderer } from "@react-google-maps/api";
import { useMemo } from "react";
import FindRoute from "./FindRoute";
import routeStore from "../store/RouteStore";

const MapPage = () => {
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();
  const center = useMemo(() => ({ lat: 44.4396, lng: 26.1521 }), []);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const findRoute = (route) => {
    routeStore.addRoute(route);
    console.log(route);
  };

  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [directionsResponse, setDirectionsResponse] = useState(null);

  async function calculateRoute() {
    console.log(originRef.current.value);
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    const route = {
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
    };
    findRoute(route);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <div
      style={{
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: "0",
          top: "0",
        }}>
        <GoogleMap
          zoom={15}
          center={center}
          mapContainerStyle={{ width: "100%", height: "100vh" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}>
          <MarkerF position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
      <div style={{ zIndex: "1" }}>
        <FindRoute
          destinationRef={destiantionRef}
          originRef={originRef}
          map={map}
          calculateRoute={calculateRoute}
          clearRoute={clearRoute}
          distance={distance}
          duration={duration}
        />
      </div>
    </div>
  );
};

export default MapPage;
