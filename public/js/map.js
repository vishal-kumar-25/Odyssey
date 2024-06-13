	mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: "mapbox://styles/mapbox/streets-v12",  //style URL
        center: listing.geometry.coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });


    // const marker = new mapboxgl.Marker({ color: "red" })
    // .setLngLat(coordinates)  //Listing.geometry,coordinates
    // .addTo(map);

    

    map.on('load', () => {
        console.log('Map loaded');
        const marker = new mapboxgl.Marker({ color: "red" })
            .setLngLat(listing.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({offset: 25 })
            .setHTML(`<h4>${listing.title}</h4><p>You can see exact location after booking</p>`))
            .addTo(map);
    });



    