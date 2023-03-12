const apikey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlMThlM2M4MC03MjVmLTAxM2ItN2JlYS00ZDU4ZWM4MjRkNjUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjczMjc3OTc1LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InB1YmctcmV2aWV3cyJ9.bG-SEigI2Gxl_92wBfNzW4nzy-RrkJrk-K8szPQL4Cs"
var playerName = "PitufoDead"
let plataform = "steam"
let plataform_region = "North America"
var seasonId = "season"

const temporadas = async() =>{
  try {
    const season = await fetch(`https://api.pubg.com/shards/steam/seasons`, {
      headers: {
        accept: "application/vnd.api+json",
        Authorization: `Bearer ${apikey}`,
      },
    });
    console.log(season);

    //si la respuesta es correcta
    if(season.status === 200){
      const datos = await season.json();
      console.log(datos.data);
    } else if(season.status === 401){
      console.log('Clave de API inválida o faltante');
    } else if(season.status === 404){
      console.log('No se encontró el recurso especificado');
    } else if(season.status === 415){
      console.log('Tipo de contenido incorrecto o no especificado');
    } else if(season.status === 429){
      console.log('Demasiadas solicitudes');
    }else{
      console.log('Error inesperado')
    }

  } catch (error) {
    console.log(error);
  }

}

temporadas();

  const cargar = async() =>{
    try {
      const ING = await fetch(`https://api.pubg.com/shards/${plataform}/players?filter[playerNames]=${playerName}`, {
        headers: {
          accept: "application/vnd.api+json",
          Authorization: `Bearer ${apikey}`,
        },
      });
      console.log(ING);

      //si la respuesta es correcta
      if(ING.status === 200){
        const datos = await ING.json();
        console.log(datos.data);
      } else if(ING.status === 401){
        console.log('Clave de API inválida o faltante');
      } else if(ING.status === 404){
        console.log('No se encontró el recurso especificado');
      } else if(ING.status === 415){
        console.log('Tipo de contenido incorrecto o no especificado');
      } else if(ING.status === 429){
        console.log('Demasiadas solicitudes');
      }else{
        console.log('Error inesperado')
      }

    } catch (error) {
      console.log(error);
    }

  }

  cargar();