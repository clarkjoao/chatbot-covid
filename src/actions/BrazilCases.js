const Request = require("request");
const moment = require("moment");
moment.locale("pt-BR");
function BrazilCases(client, message) {
  try {
    return Request(
      "https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST?disableRedirect=true",
      function (err, response, body) {
        body = JSON.parse(body);
        let casosConfirmados = body.infected;
        let casosConfirmadosF = casosConfirmados.toLocaleString("pt-BR");
        let casosConfirmadosR = casosConfirmadosF.replace(",", ".");
        let obitos = body.deceased;
        let obitosF = obitos.toLocaleString("pt-BR");
        let obitosR = obitosF.replace(",", ".");
        var atualizado = body.lastUpdatedAtSource;
        var data = moment(atualizado).format("L");
        var hora = moment(atualizado).format("LT");
        client.reply(
          message.from,
          `  Casos de Corona Vírus no *Brasil*  🇧🇷
 
     😷  Confirmados: *${casosConfirmadosR}*.
     ⚰️  Mortes:          *${obitosR}*.
 
 
  _Fonte: *Ministério da Saúde*._
  _Atualizado em *${data} ${hora}*._`,
          message.id
        );
      }
    );
  } catch (error) {
    return client.reply(
      message.from,
      `Infelizmente não consegui encontrar informações sobre o brasil 😞, verifique se o nome do país foi digitado corretamente ou entre em contato com meus desenvoledores para que eles possam me atualizar!`,
      message.id
    );
  }
}

module.exports = BrazilCases;
