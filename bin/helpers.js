const axios = require("axios");

const getBoolean = () =>  Math.random() > 0.5;

const getRandomInt = (max)  => Math.floor(Math.random() * (max + 1));

const getSentimentType = async (text) => {
  try {
    const options = {
      method: 'POST',
      url: 'https://textprobe.p.rapidapi.com/feelings',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': '0f84a83cf0msh6f3c04cc6df73bcp1ded07jsnc5edb4b68a4c',
        'x-rapidapi-host': 'textprobe.p.rapidapi.com'
      },
      data: {
        lang: 'en',
        text
      }
    };

    const { data } = await axios.request(options);

    return {
      scores: data.sentiment_scores,
      prediction: data.sentiment_scores,
      error: false
    }
  } catch {
    return { error: true };
  }
}

module.exports = { getBoolean, getRandomInt, getSentimentType };