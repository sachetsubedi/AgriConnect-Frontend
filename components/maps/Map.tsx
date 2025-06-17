import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

// Dynamically import MapContainer with ssr: false to disable SSR rendering
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

// Dynamically import MapContents with ssr: false to ensure client-side rendering only
const MapContents = dynamic(() => import("./MapContents"), { ssr: false });

const Map: FC<{ form: UseFormReturn<any> }> = ({ form }) => {
  return (
    <div className="h-[55vh] w-full ">
      <MapContainer
        className="w-full h-full z-10"
        center={[27.7103, 85.3222]}
        zoom={13}
        // scrollWheelZoom={false}
      >
        <MapContents form={form} />
      </MapContainer>
    </div>
  );
};

export default Map;
