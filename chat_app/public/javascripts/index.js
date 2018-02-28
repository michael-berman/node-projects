document.addEventListener('DOMContentLoaded', () => {

  const socket = require('socket.io-client')();
  const chatUI = require('./chatUI');
  const myChat = new chatUI(socket);

  socket.on('nameResult', (result) => {
    let msg;
    if (result.success) {
      msg = `Name changed to ${result.name}`;
    } else {
      msg = result.message;
    }
    myChat.addMessage(msg);
  });

  socket.on('message', (message) => {
    myChat.addMessage(message);
  });

});
