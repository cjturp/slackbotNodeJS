const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-193138890758-397241907985-DSXyEDeQAfgDLZl2RTEKBd2i',
  name: 'shawarmashorty'
});


// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  }

  bot.postMessageToChannel(
    'general',
    'Get Ready To Laugh with @Shawarmashorty !',
    params
  );
});

// Error Handler
bot.on('error', (err) => console.log(err));

//Message Handler
bot.on('message', (data) => {
  if(data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});

// Response to Data
function handleMessage(message) {
  if(message.includes(' chucknorris')) {
    chuckJoke();
  } else if(message.includes(' yomomma')) {
    yoMommaJoke();
  } else if (message.includes(' random')) {
    randomJoke();
  } else if (message.includes(' help')) {
    runHelp();
  }
}

// Tell a Chuck Norris Joke
function chuckJoke() {
  axios.get('http://api.icndb.com/jokes/random')
  .then(res => {
    const joke = res.data.value.joke;

    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel(
      'general',
      `Chuck Norris: ${joke}`,
      params
    );
  })
}

// Tell a Yo Mama Joke
function yoMommaJoke() {
  axios.get('http://api.yomomma.info/').then(res => {
    const joke = res.data.joke;

    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel(
      'general',
      'Yo Momma: ${joke}',
      params);
  });
}

// Tell a Random Joke
function randomJoke() {
  const rand = Math.floor(Math.random() * 2) + 1;
  if (rand === 1) {
    chuckJoke();
  } else if (rand === 2) {
    yoMommaJoke();
  }
}

// Show Help text
function runHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel(
    'general',
    `Type @shawarmashorty with either 'chucknorris', 'yomomma', or 'random' to get a joke`,
     params
   );
}
