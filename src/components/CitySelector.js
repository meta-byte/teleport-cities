import React, { Fragment, useState, useEffect } from "react";

const CitySelector = () => {
  const [cities, setCities] = useState([]);

  const getCities = async () => {
    try {
      const response = await fetch("https://api.teleport.org/api/urban_areas/");
      const jsonData = await response.json();

      setCities(jsonData._links["ua:item"]);
      console.log(cities);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <tbody>
          {cities.map((city) => (
            <tr key={city.name}>
              <td>{city.name}</td>
              <td>
                <button className="btn" onClick={""}>
                  select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default CitySelector;
