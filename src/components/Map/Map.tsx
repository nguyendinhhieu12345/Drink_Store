import { useCallback, useEffect, useState } from "react";
import {
  Marker,
  NavigationControl,
  ViewportProps,
} from "@goongmaps/goong-map-react";
import MapGL from "@goongmaps/goong-map-react";
import { toast } from "react-toastify";
import { MapPin } from "@phosphor-icons/react";

const navStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
};

interface IMap {
  latitude?: number;
  longitude?: number;
}

function Map(props: IMap) {
  const [viewport, setViewport] = useState<ViewportProps>({
    width: 600,
    height: 400,
    latitude: 0,
    longitude: 0,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  const [marker, setMarker] = useState<{ latitude: number; longitude: number }>(
    {
      latitude: 0,
      longitude: 0,
    }
  );

  const onMarkerDragEnd = useCallback(async (event: { lngLat: number[] }) => {
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
    const addressDetails = await reverseGeocode(
      event.lngLat[1],
      event.lngLat[0]
    );
    toast.success(addressDetails);
  }, []);

  const reverseGeocode = async (latitude: number, longitude: number) => {
    const url = `https://rsapi.goong.io/Geocode?latlng=${latitude},${longitude}&api_key=2tgHvZJswyFkLug62ynzpCrs8RlqMcmzFVtoUjEL`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        return address;
      } else {
        return "Address not found";
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Address not found";
    }
  };

  useEffect(() => {
    setViewport({
      ...viewport,
      latitude: props?.latitude ? props?.latitude : 0,
      longitude: props?.longitude ? props?.longitude : 0,
    });
    setMarker({
      latitude: props?.latitude ? props?.latitude : 0,
      longitude: props?.longitude ? props?.longitude : 0,
    });
    if (props?.latitude === 0 && props?.longitude === 0) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setViewport({
            ...viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setMarker({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      } else {
        toast.error("Geolocation is not supported by this browser.");
      }
    }
  }, [props.latitude, props.longitude]);

  return (
    <MapGL
      {...viewport}
      mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
      onViewportChange={(newViewport: ViewportProps) =>
        setViewport(newViewport)
      }
      goongApiAccessToken="ofDnEVQWUmw9MhoEcNZ89sUfYnwsN6xS1GO56NzE"
    >
      <Marker
        longitude={marker.longitude}
        latitude={marker.latitude}
        offsetTop={-20}
        offsetLeft={-10}
        draggable
        onDragEnd={onMarkerDragEnd}
      >
        <MapPin size={20} color="red" />
      </Marker>

      <div className="nav" style={navStyle}>
        <NavigationControl />
      </div>
    </MapGL>
  );
}

export default Map;
