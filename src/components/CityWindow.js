import React, { Fragment, useState } from "react";

const CityWindow = () => {
  const [city, setCity] = useState([]);
  const [details, setDetails] = useState([]);
  let [cityName, setCityName] = useState([]);
  const [population, setPopulation] = useState([]);
  // const [population, setPopulation] = useState([]);
  // const [population, setPopulation] = useState([]);
  // const [population, setPopulation] = useState([]);
  // const [population, setPopulation] = useState([]);
  // const [population, setPopulation] = useState([]);

  const getCity = async (e) => {
    e.preventDefault();
    cityName = cityName.trim();
    cityName = cityName.replace(/\s+/g, "-").toLowerCase();
    try {
      const response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityName}/`);
      const jsonData = await response.json();

      setCity(jsonData);
      console.log(jsonData);

      getDetails(cityName);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getDetails = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.teleport.org/api/urban_areas/slug:${cityName}/details`
      );
      const jsonData = await response.json();

      console.log(jsonData.categories);
      setPopulation(parseFloat(jsonData.categories[1].data[0].float_value).toFixed(2));

      console.log(population);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mb-3 bg-light" style={{ flex: 0.8 }}>
        <div className="row g-0">
          <form className="d-flex" id="citySearch" onSubmit={getCity}>
            <input
              className="form-control m-2"
              type="text"
              onChange={(e) => setCityName(e.target.value)}
              placeholder="Search Cities"
              defaultValue={""}
            />
            <button className="btn btn-outline-success m-2">Search</button>
          </form>
          <div className="col-md-4">
            <img src="..." className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">{city.name}</h3>
            </div>
            <div className="row g-0">
              {" "}
              <div className="col-md-8">
                <h5 className="card-title">Population Millions</h5>
                <h5 className="card-title">{population}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityWindow;
