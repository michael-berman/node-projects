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

  socket.on('joinResult', (result) => {
    myChat.setRoom(result.room);
    myChat.addMessage('Room Changed');
  });

  socket.on('message', (message) => {
    myChat.addMessage(message);
  });

  socket.on('rooms', rooms => {
    myChat.roomList.innerHTML = "";
    rooms.forEach(room => myChat.addRoom(room));
    myChat.roomList.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', (e) => {
        myChat.chat.processCommand(`/join ${li.textContent}`);
        myChat.input.focus();
      });
    });
  });

  setInterval(() => {
    socket.emit('rooms');
  }, 1000);

  myChat.input.focus();
});
