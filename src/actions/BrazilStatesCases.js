const Request = require("request");
const moment = require("moment");
moment.locale("pt-BR");
const states = require("../services/states.json");
function BrazilStatesCases(client, message) {
  const findState = states.find(
    (state) => state.sigla === message.body.toUpperCase()
  );
  if (findState.sigla) {
    try {
      let url =
        "https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/" +
        findState.sigla +
        "/";
      return Request(url, function (err, response, body) {
        body = JSON.parse(body);
        let estado = body.state;
        let casosConfirmados = body.cases;
        let casosConfirmadosF = casosConfirmados.toLocaleString("pt-BR");
        let casosConfirmadosR = casosConfirmadosF.replace(",", ".");
        let obitos = body.deaths;
        let obitosF = obitos.toLocaleString("pt-BR");
        let obitosR = obitosF.replace(",", ".");
        var atualizado = body.datetime;
        var data = moment(atualizado).format("L");
        var hora = moment(atualizado).format("LT");
        client.reply(
          message.from,
          `  Casos de Corona Vírus em *${estado}*
 
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
        `Infelizmente não consegui encontrar informações sobre esse estado 😞, verifique se o nome do país foi digitado corretamente ou entre em contato com meus desenvoledores para que eles possam me atualizar!`,
        message.id
      );
    }
  } else {
    return client.reply(
      message.from,
      `Infelizmente não consegui encontrar informações sobre esse estado 😞, verifique se o nome do país foi digitado corretamente ou entre em contato com meus desenvoledores para que eles possam me atualizar!`,
      message.id
    );
  }
}
module.exports = BrazilStatesCases;
