const Request = require("request");
const moment = require("moment");
moment.locale("pt-BR");
function WordCases(client, message) {
  try {
    return Request("https://covid19.mathdro.id/api/countries", function (
      err,
      response,
      body
    ) {
      body = JSON.parse(body);

      let casosConfirmados = body.confirmed.value;
      let casosConfirmadosF = casosConfirmados.toLocaleString("pt-BR");
      let casosConfirmadosR = casosConfirmadosF.replace(",", ".");
      let obitos = body.deaths.value;
      let obitosF = obitos.toLocaleString("pt-BR");
      let obitosR = obitosF.replace(",", ".");
      var atualizado = body.lastUpdate;
      var data = moment(atualizado).format("L");
      var hora = moment(atualizado).format("LT");
      client.reply(
        message.from,
        `  Casos de Corona Vírus no *Mundo*  🌎
 
     😷  Confirmados: *${casosConfirmadosR}*.
     ⚰️  Mortes:          *${obitosR}*.
 
 
  _Fonte: *WHO e Ministério da Saúde*._
  _Atualizado em *${data} ${hora}*._`,
        message.id
      );
    });
  } catch (error) {
    return client.reply(
      message.from,
      `Infelizmente não consegui encontrar essa informações 😞,tente novamente ou entre em contato com meus desenvoledores para que eles possam me atualizar!`,
      message.id
    );
  }
}

module.exports = WordCases;
