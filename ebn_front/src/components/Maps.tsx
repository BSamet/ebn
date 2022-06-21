// export default Maps;
/*
 * Copyright 2021 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
// import { createRoot } from "react-dom/client";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./Map"
import Marker from "./Marker"
import Geocode from "react-geocode";


const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const Maps: React.VFC = ({collectorEtape}: any) => {
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(15); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 47.74708633019698,
    lng: 7.3388671875,
  });

  function getLongLatFromAdress(){
    collectorEtape.map((etape: any) => {
    Geocode.setApiKey("AIzaSyDaZBte_ogmCrXVJ4cAy5E1bN5lQu8wnIw")
    Geocode.fromAddress(etape.Client.adresse).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const latLng = new google.maps.LatLng(lat, lng)
            setClicks([...clicks, latLng]);
            console.log(clicks)
          
        
      })
    })
  }

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    >
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      />
      <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
      {clicks.map((latLng, i) => (
        <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}
      <button onClick={() => setClicks([])}>Clear</button>
    </div>
  );

  return (
    <>
    <div>
      <h1>Carte</h1>
    <div style={{ display: "flex", height: "83%", width: "100%" }}>
      <Wrapper apiKey={"AIzaSyDaZBte_ogmCrXVJ4cAy5E1bN5lQu8wnIw"} render={render}>
        <Map
          center={center}
          onClick={getLongLatFromAdress}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%", marginLeft: '-10px' }}
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}
    </div><div>
        {/* {form} */}
      </div>
      </div>
    </>
  );
};

export default Maps;




