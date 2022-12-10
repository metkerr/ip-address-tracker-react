import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import patternBg from "./images/pattern-bg.png";
import "leaflet/dist/leaflet.css";
import searchArrow from "./images/icon-arrow.svg";
import markerIcon from "./images/icon-location.svg";
import Leaflet from "leaflet";
import axios from "axios";
import isValidDomain from "./utils/isValidDomain";

function App() {
  const [ipData, setIpData] = useState({});
  const [searchIP, setSearchIP] = useState("");
  const [latlang, setLatlang] = useState([-6.1752, 106.8272]);

  useEffect(() => {
    //this web app is built for learning & experimenting purposes, therefore this kind of API request is strongly NOT recommended due to exposing the API key to the client, please consider using a server-side request for an API request that requires an API KEY.

    //set timout to prevent trigger api everytime use type
    const timer = setTimeout(() => {
      axios(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${
          process.env.REACT_APP_KEY
        }&${
          searchIP && isValidDomain(searchIP)
            ? `domain=${searchIP}`
            : `ipAddress=${searchIP}`
        }`
      ).then((res) => {
        setIpData(res.data);
        setLatlang([res.data.location?.lat, res.data.location?.lng]);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchIP]);

  const HandleMapChange = ({ position }) => {
    const map = useMap();
    if (position) map.panTo(position, 14, { animate: true, duration: 1.5 });
    return null;
  };

  //create marker custom icon
  const markerCustomIcon = new Leaflet.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new Leaflet.Point(47, 56),
    className: "bg-blend-color-burn",
  });

  return (
    <div id="App">
      <header
        className="h-76 bg-cover bg-center flex container"
        style={{ backgroundImage: `url(${patternBg})` }}
      >
        <div
          id="header-wrapper"
          className="m-auto mt-7 flex flex-col w-full mx-6"
        >
          <h1 className="text-white text-2.5xl font-medium tracking-wide mx-auto mb-7">
            IP Adress Tracker
          </h1>
          <div
            id="search-input-wrapper"
            className="bg-white rounded-2xl w-full flex"
          >
            <input
              type="search"
              className="grow rounded-2xl px-6 text-lg"
              placeholder="Search for any IP address or domain"
              value={searchIP}
              onChange={(e) => setSearchIP(e.target.value)}
            />
            <button className="font-bold h-full bg-black text-white px-6 py-5.5 rounded-r-2xl text-xl">
              <img src={searchArrow} alt="search arrow button" />
            </button>
          </div>
          <div
            id="details-wrapper"
            className="rounded-2xl flex bg-white mt-6 shadow-md"
            style={{ zIndex: 9999 }}
          >
            <div
              id="details"
              className="rounded-2xl bg-white p-7  flex flex-col mx-auto text-center gap-3.5 font-semibold text-very-dark-gray tracking-wide"
            >
              <div id="ip-address-wrapper">
                <h3 className="text-2xs  text-dark-gray tracking-x-wide pb-1.5">
                  IP ADDRESS
                </h3>
                <div className="text-xl" id="ip-address">
                  {ipData?.ip || "Unknown"}
                </div>
              </div>
              <div id="location-wrapper">
                <h3 className="text-2xs text-dark-gray tracking-x-wide pb-1.5">
                  LOCATION
                </h3>
                <div className="text-xl" id="location">
                  {`${ipData?.location?.city || ""} ${
                    ipData.location?.country ? "," : ""
                  } ${ipData?.location?.country || "Unknown"} ${
                    ipData?.location?.postalCode || ""
                  }`}
                </div>
              </div>
              <div id="timezone-wrapper">
                <h3 className="text-2xs text-dark-gray tracking-x-wide pb-1.5">
                  TIMEZONE
                </h3>
                <div className="text-xl" id="timezone">
                  {ipData.location?.timezone
                    ? `UTC${ipData.location.timezone}`
                    : "Unknown"}
                </div>
              </div>
              <div id="isp-wrapper">
                <h3 className="text-2xs text-dark-gray tracking-x-wide pb-1.5">
                  ISP
                </h3>
                <div className="text-xl" id="isp">
                  {ipData.isp ? ipData.isp : "Unknown"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div id="map-wrapper">
          <div id="map" className="overflow-auto h-full">
            {latlang && (
              <MapContainer
                center={latlang}
                zoom={13}
                scrollWheelZoom={true}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={latlang} icon={markerCustomIcon} />
                <HandleMapChange position={latlang} />
              </MapContainer>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
