const Request = require("request");
const moment = require("moment");
moment.locale("pt-BR");
const countries = require("../services/countries.json");

function retira_acentos(palavra) {
  com_acento = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
  sem_acento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
  nova = "";
  for (i = 0; i < palavra.length; i++) {
    if (com_acento.search(palavra.substr(i, 1)) >= 0) {
      nova += sem_acento.substr(com_acento.search(palavra.substr(i, 1)), 1);
    } else {
      nova += palavra.substr(i, 1);
    }
  }
  return nova;
}

function CountriesCases(client, message) {
  const mesage = retira_acentos(message.body);
  const findCountries = countries.find(
    (country) => country.nomePais.toUpperCase() === mesage.toUpperCase()
  );
  console.log(findCountries);
  if (findCountries !== undefined) {
    let country = findCountries.nomePaisInt.toLocaleLowerCase();
    try {
      let url =
        "https://covid19-brazil-api.now.sh/api/report/v1/" + country + "/";
      return Request(url, function (err, response, body) {
        body = JSON.parse(body);
        let country = findCountries.nomePais;
        let casosConfirmados = body.data.cases;
        let casosConfirmadosF = casosConfirmados.toLocaleString("pt-BR");
        let casosConfirmadosR = casosConfirmadosF.replace(",", ".");
        let obitos = body.data.deaths;
        let obitosF = obitos.toLocaleString("pt-BR");
        let obitosR = obitosF.replace(",", ".");
        var atualizado = body.data.updated_at;
        var data = moment(atualizado).format("L");
        var hora = moment(atualizado).format("LT");
        client.reply(
          message.from,
          `  Casos de Corona Vírus em *${country}*
 
     😷  Confirmados: *${casosConfirmadosR}*.
     ⚰️  Mortes:          *${obitosR}*.
 
 
  _Fonte: *WHO e Ministério da Saúde*._
  _Atualizado em *${data} ${hora}*._`,
          message.id
        );
      });
    } catch (error) {
      client.reply(
        message.from,
        `Infelizmente não consegui encontrar informações sobre esse pais 😞, verifique se o nome do país foi digitado corretamente ou entre em contato com meus desenvoledores para que eles possam me atualizar!`,
        message.id
      );
    }
  } else {
    client.reply(
      message.from,
      `Infelizmente não consegui encontrar informações sobre esse pais 😞, verifique se o nome do país foi digitado corretamente ou entre em contato com meus desenvoledores para que eles possam me atualizar!`,
      message.id
    );
    return console.log(
      `Essa porra ta errado ai irmao da uma olhada ai vlw flw`
    );
  }
}
module.exports = CountriesCases;
