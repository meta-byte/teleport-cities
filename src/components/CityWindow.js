import React, { Fragment, useState } from "react";

const CityWindow = () => {
  const [city, setCity] = useState([]);
  const [details, setDetails] = useState([]);
  let [cityName, setCityName] = useState([]);
  const [population, setPopulation] = useState([]);
  const [costLiving, setCostLiving] = useState([]);
  const [rent, setRent] = useState([]);
  const [salarie, setSalarie] = useState([]);
  const [crime, setCrime] = useState([]);
  const [healthcare, setHealthcare] = useState([]);
  const [imageURL, setImageURL] = useState([]);

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
      getImage(cityName);
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
      setCostLiving(parseFloat(jsonData.categories[3].data[0].float_value).toFixed(2) * 100 + "%");
      setRent("$" + jsonData.categories[8].data[1].currency_dollar_value);
      setSalarie(parseFloat(jsonData.categories[10].data[5].float_value).toFixed(2) * 100 + "%");
      setCrime(parseFloat(jsonData.categories[16].data[0].float_value).toFixed(2) * 100 + "%");
      setHealthcare(parseFloat(jsonData.categories[7].data[3].float_value).toFixed(2) * 100 + "%");
    } catch (err) {
      console.error(err.message);
    }
  };

  const getImage = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.teleport.org/api/urban_areas/slug:${cityName}/images`
      );
      const jsonData = await response.json();

      console.log(jsonData);
      setImageURL(jsonData.photos[0].image.web);
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
          <div className="">
            <img src={imageURL} className="card-img-top" alt="..." />
          </div>
          <div className="col">
            <div className="card-body text-center">
              <h3 className="card-title">{city.full_name}</h3>
            </div>
            <div className="row mt-2 mb-2 text-center">
              <div className="col-4">
                <h5 className="card-title">Population Millions</h5>
                <h3 className="card-title">{population}</h3>
              </div>
              <div className="col-4">
                <h5 className="card-title">Cost of Living Score</h5>
                <h3 className="card-title">{costLiving}</h3>
              </div>
              <div className="col-4">
                <h5 className="card-title">Average Rent</h5>
                <h3 className="card-title">{rent}</h3>
              </div>
            </div>
            <div className="row mt-2 mb-2 text-center">
              <div className="col-4">
                <h5 className="card-title">Salaries Score</h5>
                <h3 className="card-title">{salarie}</h3>
              </div>
              <div className="col-4">
                <h5 className="card-title">Crime Score</h5>
                <h3 className="card-title">{crime}</h3>
              </div>
              <div className="col-4">
                <h5 className="card-title">Healthcare Score</h5>
                <h3 className="card-title">{healthcare}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityWindow;
