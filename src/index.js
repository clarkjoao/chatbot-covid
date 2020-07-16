const sulla = require("sulla");
const moment = require("moment");
moment.locale("pt-BR");

const WordCases = require("./actions/WordCases");
const BrazilCases = require("./actions/BrazilCases");
const BrazilStatesCases = require("./actions/BrazilStatesCases");
const CountriesCases = require("./actions/CountriesCases");

const sessions = [];

function getUserById(id) {
  return sessions.find((index) => index.id == id);
}

function removeSession(user) {
  const userIndex = sessions.indexOf(user);
  if (userIndex != -1) {
    sessions.splice(userIndex, 1);
    console.log("remove session");
  }
}

function checkSession(client, user, type) {
  setTimeout(() => {
    if (user.type == type) {
      type == 0;
    }
  }, 1200000);
}

async function createSession(message) {
  return await new Promise((resolve) => {
    let user = getUserById(message.from);
    if (!user) {
      user = {
        id: message.from,
        type: 0,
        lastMessage: message.body,
      };
      sessions.push(user);
      console.log(`Add session: ${message.from} message:${message.body}`);
    }
    resolve(user);
  });
}

const start = async (client) => {
  console.log("Bot On =)");
  client.onMessage(async (message) => {
    console.log("IsGroup:" + message.isGroupMsg + " Id:" + message.from);
    if (message.isGroupMsg) {
      console.log("Não é possivel mandar mensagem em grupos...");
      return;
    }
    const user = await createSession(message);

    if (user.type === 0) {
      if (
        message.body.toLowerCase() == 0 ||
        message.body.toLowerCase() == "zero" ||
        message.body.toLowerCase() == "0️⃣"
      ) {
        await client.sendText(
          message.from,
          `
            Fique à vontade para entrar em contato conosco:

            👨‍💻 - Luis Clark
            📱 - 82 993942322
            💻 - https://www.linkedin.com/in/joaoluisclark/

            👨‍💻 - Matheus Henrique
            💻 - https://linkedin.com/in/m4theusdev/

            👨‍💻 - Erik Vinicius
            💻 - https://www.linkedin.com/in/erikvinicius/
 `
          //     👨‍💻 - Osh Technology
          //     💻 - http://www.oshtechnology.com.br/
          //     `
        );
        removeSession(user);
      } else if (
        message.body.toLowerCase() == 1 ||
        message.body.toLowerCase() == "um" ||
        message.body.toLowerCase() == "1️⃣"
      ) {
        await BrazilCases(client, message);
        removeSession(user);
      } else if (
        message.body.toLowerCase() == 2 ||
        message.body.toLowerCase() == "dois" ||
        message.body.toLowerCase() == "2️⃣"
      ) {
        await client.sendText(
          message.from,
          `Digite a sigla de um estado, por exemplo: AL`
        );
        checkSession(client, user, user.type);
        user.type = 1;
        checkSession(client, user, user.type);
        return;
      } else if (
        message.body.toLowerCase() == 3 ||
        message.body.toLowerCase() == "tres" ||
        message.body.toLowerCase() == "três" ||
        message.body.toLowerCase() == "3️⃣"
      ) {
        await WordCases(client, message);
        removeSession(user);
      } else if (
        message.body.toLowerCase() == 4 ||
        message.body.toLowerCase() == "quatro" ||
        message.body.toLowerCase() == "4️⃣"
      ) {
        await client.sendText(
          message.from,
          `Digite o nome de um pais por exemplo: Italia`
        );
        checkSession(client, user, user.type);
        user.type = 2;
        checkSession(client, user, user.type);
        return;
      } else if (
        message.body.toLowerCase() == 5 ||
        message.body.toLowerCase() == "cinco" ||
        message.body.toLowerCase() == "5️⃣"
      ) {
        await client.sendText(
          message.from,
          `
          ✳️*Como Previnir??*
          `
        );
        await client.sendText(
          message.from,
          ` 
➡ Lavagem das mãos com sabão, sabonetes várias vezes ao dia..
➡ Não levar as mãos ao rosto, olhos, boca e nariz.
➡ Usar álcool gel (se possível) ao pegar um elevador, ir ao mercado ou farmácia.
➡ Isolamento Social: Manter distância de pessoas infectadas ou possivelmente infectadas de 1 a 2 metros, se possível.
          `
        );
        await client.sendText(
          message.from,
          `
          ✳️*Sinais e Sintomas*.
          `
        );
        await client.sendText(
          message.from,
          `
➡ Febre (acima de 37,8ºC).
➡ Tosse seca
➡ Dificuldade para respirar
➡ Coriza e dor de garganta podem ocorrer
            `
        );

        await client.sendText(
          message.from,
          `
          ✳️*Sinais de gravidade?*
          `
        );

        await client.sendText(
          message.from,
          `
➡ Os sintomas geralmente se parecem muito com uma gripe normal, porém pode haver sintomas graves como falta de ar e febre por mais de 48 horas (acima de 37.8ºC) e ocorrer o óbito..
            `
        );
        removeSession(user);
      } else if (
        message.body.toLowerCase() == 6 ||
        message.body.toLowerCase() == "seis" ||
        message.body.toLowerCase() == "6️⃣"
      ) {
        await client.sendText(
          message.from,
          `
          Para informações adicionais, entrar em contato com o CIEVS (Centro de Informações Estratégicas de Vigilância em Saúde)/AL: Por telefone: (82) 3315-2059/0800-284-5415 (Horário comercial – todos os dias) e (82) 98882-9752 (24hs).Por e-mail: notifica@saude.al.gov.br.
          `
        );
        removeSession(user);
      } else {
        await client.sendText(
          message.from,
          `Olá 👋 *${message.sender.pushname}*, tudo bem?`
        );
        await client.sendText(
          message.from,
          `Sou o Carlito 🤖 um bot especializado sobre a pandemia do *coronavírus* e
estou aqui para tirar todas suas dúvida! 🤗`
        );
        await client.sendText(
          message.from,
          `Vamos começar? escolha uma das opções abaixo e *RESPONDA COM UM NÚMERO* :

1️⃣ - *Casos no Brasil.*
2️⃣ - *Casos nos Estados Brasileiros.*

3️⃣ - *Casos no Mundo.*
4️⃣ - *Casos em outros Países.*

5️⃣ - *Sobre o Coronavírus.*
6️⃣ - *Números de Emergência.*

0️⃣ - *Entre em contato com o suporte.*`
        );
        checkSession(client, user, user.type);
      }
    } else if (user.type === 1) {
      await BrazilStatesCases(client, message);
      removeSession(user);
    } else if (user.type === 2) {
      await CountriesCases(client, message);
      removeSession(user);
    }
  });

  client.onAddedToGroup(async (chatEvent) => {
    try {
      client.startTyping(chatEvent.id);
      setTimeout(() => {
        client.sendText(
          chatEvent.id,
          `Olá 👋👋,
          infelizmente ainda não fui treinado para funcionar em grupos,
          se alguma informação, me chame no particular adorarei tirar suas duvidas 😄`
        );
      }, 5000);
      setTimeout(() => {
        client.stopTyping(chatEvent.id);
      }, 7000);
      setTimeout(() => {
        client.leaveGroup(chatEvent.id);
      }, 8500);
    } catch (e) {
      console.log("\n\nErro:" + e);
    }
  });
};

sulla
  .create("session-marketing", undefined, {
    headless: true,
    devtools: false,
    useChrome: true,
    debug: false,
    qr: false,
  })
  .then((client) => start(client));
