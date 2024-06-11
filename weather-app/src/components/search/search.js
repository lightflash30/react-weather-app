import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { geoapioptions } from "../../api";
import { geoapiurl } from "../../api";

const Search = ({ onsearchchange }) => {

  const [search, setsearch] = useState(null);

  const handleOnChange = (searchdata) => {
    setsearch(searchdata);
    onsearchchange(searchdata);
  }

  const loadOptions = (inputValue) => {
    return fetch(`${geoapiurl}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoapioptions)
      .then((response) => response.json())
      .then((response) => {
        
        return {
          options: response.data.map((city)=>{
            return{
              value:`${city.latitude} ${city.longitude}`,
              label:`${city.name},${city.countryCode}`
            }
          })
        }
      })
      .catch((err) => console.error(err))
  }

  return (<AsyncPaginate
    placeholder="Search for City"
    debounceTimeout={600}
    value={search}
    onChange={handleOnChange}
    loadOptions={loadOptions}
  />)
}

export default Search;