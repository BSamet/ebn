import * as React from "react";
import {useEffect, useRef, useState} from "react";
import maplibregl, {Marker, Popup} from 'maplibre-gl'
import axios from "axios";

const Maps: React.VFC = ({collectorEtape, consultCollectorEtape, actionSelected}: any) => {

    const mapContainer = useRef();
    const [map, setMap] = useState<maplibregl.Map>();
    const [lng] = useState(7.3388671875);
    const [lat] = useState(47.74708633019698);
    const [zoom] = useState(14);
    const [API_KEY] = useState('z9i6eEaZSiiAANqyLUP4');
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [fetchOnce, setFetchOnce] = useState(false);
    const [etapes, setEtapes] = useState([]);

    useEffect(() => {
        if (actionSelected == 'Organiser') {
            setEtapes(collectorEtape)
            console.log("collecok")
        } else if (actionSelected == 'Consulter') {
            setEtapes(consultCollectorEtape)
            console.log("consultok")
        }
    }, [etapes][actionSelected])

    useEffect(() => {
        if (map) return; //stops map from intializing more than once
        const mapToAdd = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom
        });
        setMap(mapToAdd)
    }, [map]);

    useEffect(() => {

            markers.map(marker => {
                marker.remove()
            })
            setMarkers([])
            //On Parcours la liste d'etape du collecteur
            etapes.map((etape: any) => {
                //On récupère l'adresse du client stockée en base de donnée que l'on stocke dans une variable
                let adress
                if (actionSelected == 'Organiser') {
                    adress = etape.client.adresse;
                } else if (actionSelected == 'Consulter') {
                    adress = etape.client.adresse
                }
                //On formate l'adresse récupérée pour remplacer les espaces par des '+'
                let adressFormat = adress.replaceAll(" ", "+")
                //Requête vers l'API gouvernementale
                axios.get("https://api-adresse.data.gouv.fr/search/?q=" + adressFormat)
                    .then(coords => {
                        //On stock la longitude et la latitude dans une variable séparée
                        let lng = coords.data.features[0].geometry.coordinates[0];
                        let lat = coords.data.features[0].geometry.coordinates[1];
                        //Création du Marker sur la carte
                        const mkStyle = document.createElement('div');
                        mkStyle.className = "marker";
                        mkStyle.innerHTML = (etapes.indexOf(etape) + 1).toString();
                        mkStyle.style.color = "black";
                        mkStyle.style.fontSize = "3em";
                        mkStyle.style.textAlign = "center";
                        let marker = new Marker(mkStyle, {anchor: "bottom"})
                            .setLngLat([lng, lat])
                        setMarkers(markers => [...markers, marker])
                    })
            })
        }, [etapes]
    )

    useEffect(() => {
        markers.map(marker => {
            marker.addTo(map)
        })
    }, [markers])


    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map"/>
        </div>
    )
};

export default Maps;




