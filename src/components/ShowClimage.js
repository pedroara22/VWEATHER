import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


function ShowClimage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const lo = searchParams.get('lo');
    const la = searchParams.get('la');
    const nome = searchParams.get('nome');
    const APIkey = "7916a1aef8405c63004b4fa93b457c59";
    console.log(la,lo)
    
    const [clima, setClima] = useState([]);
    const [nuvens, setNuvens] = useState([]);
    const [humidity, setHumidity] = useState([]);
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lo}&appid=${APIkey}`)
        .then((response) => {
          console.log(response.data)
            setClima([response.data.main.temp]);
            setHumidity([response.data.main.humidity]);
            setNuvens([response.data.clouds.all]);

        });
    }, [lo,la]);
  return (
    <main>
    <h1>{nome}</h1>
    <h1 id='temperatura'>{Math.round(clima-273.15)}°C</h1>
    <div>
      <div>
        <span>Cloudiness</span>
        <span> {nuvens}%</span>
      </div>
      <div>
        <span>Humidity</span><span> {humidity}%</span>
      </div>
    </div>
    </main>
  );
}

export default ShowClimage;
