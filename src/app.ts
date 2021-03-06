import dotenv from "dotenv"
dotenv.config();
import http from "http";
import express from "express";
import * as service from "./service/cheerioData"

const app = express();
const server=http.createServer(app);
app.get("/api/provinces", async (req, res) => {
   return res.json(await service.getProvincias())
});

app.get("/api/province/municipio/:municipio",async (req, res) => {
   return res.json(await service.getProvinceByMunicipioName(req.params.municipio))
});

app.get("/api/province/iso/:isoCode",async (req, res) => {
   return res.json( await service.getProvinciaByISOCode(req.params.isoCode))
});

app.get("/api/province/:provinceName",async (req, res) => {
    return res.json(await service.getProvinciaBySelfName(req.params.provinceName))
 });

app.get("/api/municipios",async (req, res) => {
    return res.json(await service.getMunicipios())
});

app.get("/api/municipio/:provinceName",async (req, res) => {
    return res.json(await service.getMunicipiosByProvinceName(req.params.provinceName))
});

app.use((req,res,next)=>{
   return res.json({
       error:"Router not found"
   })
   next();
})

const port =process.env.PORT || 3000
server.listen(port, () =>{
    console.log("server is running on port ",port);
    
});
