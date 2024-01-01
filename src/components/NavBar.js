import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NavBar() {
  let i = 0;
  var ready = true
  var started = false;
  let timeout;
  const [scity, setScity] = useState([]);

  const searchCityFunction = () => {
    if (ready) {
      ready = false;
      started = true;

      timeout = setTimeout(() => {
        searchCityFetch();
        ready = true;
        started = false;
      }, 1000);
    } else {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      started = false;
      setTimeout(() => {
        if (started == false) {
          searchCityFunction();
          ready = true;
        }
      }, 500);
    }
  };
  const searchCityFetch = () => {
    const city = document.getElementById("cityInput").value;
    const APIkey = "7916a1aef8405c63004b4fa93b457c59";
    if (city == "") {
      setScity([]);
    } else {
      axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`
        )
        .then(async (response) => {
          if (response.data.length == 0) {
            setScity([]);
          } else {
            setScity([response.data]);
          }
        });
    }
  };
  useEffect(() => {
  }, [scity]);
  return (
    <nav className="navbar">
      <div className="logo">
        <h1 id="logo">VWEATHER</h1>
        <span>
          by <a href="#">Pedro Araujo Costa</a>
        </span>
      </div>
      <div id={scity.length === 0 ? "searchCity" : "searchCity2"}>
        <input
          placeholder="Search for a city"
          id="cityInput"
          className="cityInput"
          onChange={searchCityFunction}
        />
        {
          <div id="searchCityResults">
            {scity!==0?scity[0].map((city) => (
                <Link key={city.lat+city.lon}
                  to={`/?nome=${city.name}&lo=${city.lon}&la=${city.lat}`}
                >
                  <div className="searchCityResult" onClick={()=>{document.getElementById('cityInput').value = ''; setScity('')}}>
                    <span>{city.name}, {city.state},{city.country}</span>
                  </div>
                </Link>
            )):null}
          </div>
        }
      </div>
    </nav>
  );
}

export default NavBar;
