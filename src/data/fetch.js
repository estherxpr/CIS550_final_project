import axios from 'axios';
const url = 'http://localhost:8080';



// export const getAllParks = async () => {
//   try {
//     const response = await axios.get(`${url}/parks`);
//     if (!response.data.data) {
//       return {};
//     }
//     return response.data.data;
//   } catch (err) {
//     return {};
//   }
// };

export const getPark = async (param) => {
  try {
    const response = await axios.get(`${url}/parks/${param}`);
    if (!response.data.data) {
      return {};
    }
    return response.data.data;
  } catch (err) {
    return {};
  }
}; 

export const getAllParks = async() =>{
  try{  
  const response = await axios.get(`${url}/parks`);
    if(response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
  }
}

// this also works for by park code
export const getParkByName = async(name) =>{
  try{  
  const response = await axios.get(`${url}/parks/${name}`);
    if (response.status === 200){
      return response.data.data;
    }
    return null;
  }catch(err){
    console.log(err);
    return null;
  }
}

export const getAllSpecies = async() =>{
  try{
    const response = await axios.get(`${url}/species`);
    if(response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
  }
}

export const getSpeciesByFilter = async(query) =>{
  try{
    const response = await axios.get(`${url}/species`, {params: query});
    if(response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
  }
}


export const getSpeciesByName = async(name) =>{
  try{
    const response = await axios.get(`${url}/species/${name}`);
    if(response.status === 200){
      return response.data.data;
    }
    return null;
  }catch(err){
    console.log(err);
    return null;
  }
}

export const getSpeciesByParkName = async(name) =>{
  try{
    const response = await axios.get(`${url}/parks/${name}/species`);
    if(response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
  }
}



export const getTradesBySpecies = async(name) =>{
  try{
    const response = await axios.get(`${url}/trades/${name}`);
    if(response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
  }
}

export const getAllStates = async() =>{
  try{
    const response = await axios.get(`${url}/states`);
    if(response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
  }
}


export const getStateByName = async(name) =>{
  try{
    const response = await axios.get(`${url}/states/${name}`);
    if(response.status === 200){
      return response.data.data;
    }
    return null;
  }catch(err){
    console.log(err);
    return null;
  }
}

export const getParksByState = async(state) =>{
  try{
    const response = await axios.get(`${url}/states/${state}/parks`);
    if(response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
  }
}

export const getSpeciesDistributionByState = async(state) =>{
    const parksRes = await axios.get(`${url}/states/${state}/parks`);
    if(parksRes.status !== 200){
      return [];
    }
    const parks = parksRes.data.data;
    const parksName = parks.map(park => park.Name);
    const result = [];
    for (let i = 0; i < parksName.length; i++){
      const speciesRes = await axios.get(`${url}/parks/${parksName[i]}/species`);
      const speciesDistribution = speciesRes.data.data
      const parkDistribution = {
        parkCode: parks[i].Code,
        parkName: parksName[i],
        speciesNumber: speciesDistribution.length,
        // speciesDistribution: speciesDistribution
      }
      result.push(parkDistribution);
    }
    return result;
}




export const getSpeciesByState = async(name) =>{
  try{
    const response = await axios.get(`${url}/states/${name}/species`);
    if(response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
  }
}

export const getFiresByState = async(name) =>{
  try{
    const response = await axios.get(`${url}/states/${name}/fires`);
    if(response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
  }
}

export const searchParks = async(query) =>{
  try{
    const response = await axios.get(`${url}/search/parks`, {params: query});
    if(response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
  }
}

export const searchSpecies = async(query) =>{
    try{
      const response = await axios.get(`${url}/search/species`, {params: query});
      if(response.status === 200){ 
        return response.data.data;
      }
      return [];
    }catch(err){
      console.log(err);
      return [];
    }
}

