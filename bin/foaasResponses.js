const axios = require("axios");
const helpers = require('./helpers');

const errorMessage = 'Something went wrong, fuck off';

const fetchSentence = async (endpoint) => {
  try {
    return await axios(`http://foaas.com/${endpoint}`);
  } catch {
    return errorMessage;
  }
}

const getIdea = (from) => {
  return fetchSentence(`idea/${from}`).then(res => {
    if(res.status === 200) return res.data.message;

    return errorMessage;
  });
}

const getDotWantToTalk = (name, from) => {
  const options = [`ing/${name}/${from}`, `holygrail/${from}`, `diabetes/${from}`];

  return fetchSentence(options[helpers.getRandomInt(options.length - 1)]).then(res => {
    if(res.status === 200) return res.data.message;

    return errorMessage;
  });
}

const getDontCare = (from) => {
  return fetchSentence(helpers.getBoolean() ? `cup/${from}` : `give/${from}`).then(res => {
    if(res.status === 200) return res.data.message;

    return errorMessage;
  });
}

const getCoolAnswer = (from) => {
  const options = [`dumbledore/${from}`];

  return fetchSentence(options[helpers.getRandomInt(options.length - 1)]).then(res => {
    if (res.status === 200) return res.data.message;

    return errorMessage;
  });
}

const getCheer = (name, from, problem) => {
  const options = [`king/${name}/${from}`, `madison/${name}/${from}`, `absolutely/${problem}/${from}`];

  return fetchSentence(options[helpers.getRandomInt(options.length - 1)]).then(res => {
    if (res.status === 200) return res.data.message;

    return errorMessage;
  });
}

const getNoHope = (name, from) => {
  const options = [`nugget/${name}/${from}`, `outside/${name}/${from}`];

  return fetchSentence(options[helpers.getRandomInt(options.length - 1)]).then(res => {
    if (res.status === 200) return res.data.message;

    return errorMessage;
  });
}

module.exports = {
  getCheer,
  getCoolAnswer,
  getIdea,
  getDontCare,
  getDotWantToTalk,
  getNoHope,
};