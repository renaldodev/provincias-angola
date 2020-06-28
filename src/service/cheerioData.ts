import cheerio from "cheerio";
import axios from "axios";

interface IProvincia{
    id?:number;
    provincia?:string;
    id_iso?:string;
    capital?:string;
    area?:string;
    municipios?:number;
    comunas?:number;
}

interface IMunicipio{
    municipio:string;
    provincia:string;
}

function getProvincias():Promise<Array<IProvincia>>{
  return new Promise((resolve)=>{
     axios.get("https://pt.wikipedia.org/wiki/Prov%C3%ADncias_de_Angola").then(html=>{
         const $=cheerio.load(html.data)
         const table=$("table.wikitable tbody").find("tr");
         let provincias:Array<IProvincia>;
         provincias=[]
         table.each((i,tr)=>{

            const tds = $(tr).find("td")
            const provincia:IProvincia={
                id:i+1,
                provincia:$(tds[0]).text().trim(),
                id_iso:$(tds[1]).text().trim(),
                capital:$(tds[2]).text().trim(),
                area:$(tds[3]).text().trim(),
                municipios:parseInt($(tds[5]).text().trim()),
                comunas:parseInt($(tds[6]).text().trim())
            }
            provincias.push(provincia)
         })
         provincias.shift()
         provincias.pop()
         resolve(provincias);
     })
  })
}

function getProvinciaBySelfName(provinceName:string):Promise<IProvincia>{
    return new Promise((resolve)=>{
        const provincia=getProvincias().then(provincias=>provincias.filter(p=>p.provincia?.toLowerCase()===provinceName.toLowerCase()))
        provincia.then(p=>{
            resolve(p[0])
        })
    })
}

function getProvinciaByISOCode(isoCode:string):Promise<IProvincia>{
    return new Promise((resolve)=>{
        const provincia=getProvincias().then(provincia=>provincia.filter(x=>x.id_iso?.toLowerCase()===isoCode.toLowerCase()))
        provincia.then(p=>{
            resolve(p[0])
        })
        
    })
}

function getProvinceByMunicipioName(municipio:string):Promise<IProvincia>{
    return new Promise((resolve)=>{
        const provincia=getMunicipios().then(municipios=>municipios.filter(x=>x.municipio.toLowerCase()===municipio.toLowerCase()))
        provincia.then(p=>{
           resolve(getProvinciaBySelfName(p[0].provincia))
        })
        
    })
}

function getMunicipios():Promise<Array<IMunicipio>>{
    return new Promise((resolve)=>{
       axios.get("https://pt.wikipedia.org/wiki/Lista_de_munic%C3%ADpios_de_Angola_por_ordem_alfab%C3%A9tica").then(html=>{
           const $=cheerio.load(html.data)
           const table=$("table.wikitable tbody").find("tr");
           let municipios:Array<IMunicipio>;
           municipios=[]
           table.each((i,tr)=>{
  
              const tds = $(tr).find("td")
              const municipio:IMunicipio={
                  municipio:$(tds[0]).text().trim(),
                  provincia:$(tds[1]).text().trim(),
              }
              municipios.push(municipio)
           })
           municipios.shift();
           resolve(municipios);
       })
    })
  }
  
function getMunicipiosByProvinceName(provincia:string):Promise<Array<IMunicipio>>{
    return new Promise((resolve)=>{
        const municipios=getMunicipios().then(municipios=>municipios.filter(x=>x.provincia.toLowerCase()===provincia.toLowerCase()))
        resolve(municipios)
    })
}


export{
    getProvincias,
    getMunicipios,
    getMunicipiosByProvinceName,
    getProvinciaByISOCode,
    getProvinceByMunicipioName,
    getProvinciaBySelfName
}
