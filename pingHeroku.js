const axios = require('axios');

const pingHeroku = async () => {

  if (new Date().getHours() > 7) {
    await axios.get('https://loosamax59.herokuapp.com/')
    return
  }
};

pingHeroku()