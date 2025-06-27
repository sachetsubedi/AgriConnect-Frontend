"use client";
import { Icon, LatLngTuple } from "leaflet";
import { FC, useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Marker, TileLayer, useMap } from "react-leaflet";

const MapContents: FC<{
  form: UseFormReturn<any>;
}> = ({ form }) => {
  const [position, setPosition] = useState<LatLngTuple>([27.7103, 85.3222]);
  const [isLocating, setIsLocating] = useState(false); // New state to control location finding

  const isMounted = useRef(false);

  const map = useMap();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    form.setValue("location", position);
  }, [position]);

  // Trigger location-finding manually, not on component load
  const findMyLocation = () => {
    setIsLocating(true);
    map.locate().on("locationfound", (e) => {
      map.flyTo(e.latlng);
      setPosition([e.latlng.lat, e.latlng.lng]);
      setIsLocating(false); // Reset locating state once done
    });
  };

  useEffect(() => {
    findMyLocation();
  }, []);

  // Map's click event handler
  map.on("click", (e) => {
    if (isMounted.current) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    }
  });

  const customIcon = new Icon({
    iconUrl: "/location.png",
    iconSize: [20, 30],
  });

  return (
    <div>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={position}
        riseOnHover
        draggable
        icon={customIcon}
      ></Marker>
    </div>
  );
};

export default MapContents;
