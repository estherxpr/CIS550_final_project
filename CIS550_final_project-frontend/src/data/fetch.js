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

export const getFiresByPark = async(park) =>{
  if (!park) return []; 
  try{  
    const response = await axios.get(`${url}/parks/${park}/fires`);
    if (response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
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

export const getFeaturedSpeciesByParkName = async(name, num) =>{
  try{
    const response = await axios.get(`${url}/parks/${name}/featuredSpecies/${num}`);
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

export const getParkNameByParkCode  = async(code) =>{
  try{
    const response = await axios.get(`${url}/park/${code}`);
    if(response.status === 200){
      return response.data.data;
    }
    return null;
  }catch(err){
    console.log(err);
    return null;
  }
}

export const checkPark = async(park)=>{
  try{
    const result = await axios.get(`${url}/parks/${park}`);
    if(result.status !== 200){
      return {};
    }
    
    return result.data.data;
  }catch(err){
    console.log(err);
    return {};
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

export const getOrdersByCategory = async(category) =>{
  try{
    const response = await axios.get(`${url}/category/${category}/order`);
    if(response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
  }
}

export const getFamilysByOrder = async(order) =>{
  try{
    const response = await axios.get(`${url}/order/${order}/family`);
    if(response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
  }
}

export const getGenusByFamily = async(family) =>{
  try{
    const response = await axios.get(`${url}/family/${family}/genus`);
    if(response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
  }
}

export const getSpeciesByGenus = async(genus) =>{
  try{
    const response = await axios.get(`${url}/genus/${genus}/species`);
    if(response.status === 200){
      return response.data.data;
    }
    return [];
  }catch(err){
    console.log(err);
    return [];
  }
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

export const getUrlName = async (name) => {
  try {
      const response = await axios.get(`${url}/species/${name}`);
      if (response.status === 200) {
          //console.log("url= ", response.data.img);
          return response.data.img;
      }
      return [];
  } catch (err) {
      console.log(err);
      return [];
  }
}

export const getDisName = async (name) => {
  try {
      const response = await axios.get(`${url}/species/${name}`);
      if (response.status === 200) {
          //console.log("url= ", response.data.dis);
          return response.data.dis;
      }
      return [];
  } catch (err) {
      console.log(err);
      return [];
  }
}

