// Se optiene el token para todas las lp Outh
const axios = require('axios');
const URLS = getConstants(obj, res);

(async () => {
try{
     const url = URLS.UrlAPI + "/Api/token";
      const data = new URLSearchParams();
      data.append("grant_type", "password");
      data.append("username", "admintoken@similadordnc.com");
      data.append("password", "Bogota.2026@tokenizacionlp");
      const config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      const response = await axios.post(url, data, config);
      let token_Bearer = `Bearer ${response.data.access_token}`; 
      return res.status(200).json(token_Bearer);
}catch(error){
     const detalle = error.response?.data ? JSON.stringify(error.response.data) : error.message;
     throw new Error(`No se pudo obtener el token: ${detalle}`);
}
})()
