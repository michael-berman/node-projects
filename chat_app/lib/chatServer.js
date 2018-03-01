const io = require('socket.io');


let guestNumber = 1;
let chat;

const nickNames = {};
let namesUsed = [];

const chatServer = {
  assignGuestName (socket, guestNumber, nickNames, namesUsed) {
    const name = `Guest${guestNumber}`;
    nickNames[socket.id] = name;
    socket.emit('nameResult', {
      success: true,
      name
    });
    namesUsed.push(name);
    return guestNumber + 1;
  },
  handleClientDisconnet (socket) {
    socket.on('disconnect', () => {
      const nameIdx = namesUsed.indexOf(nickNames[socket.id]);
      delete nickNames[socket.id];
      namesUsed = [
        ...namesUsed.slice(0, nameIdx),
        ...namesUsed.slice(nameIdx + 1)
      ];
    });
  },
  handleNameChangeAttempts (socket, nickNames, namesUsed) {
    socket.on('nameAttempt', (name) => {
      if (name.toLowerCase().startsWith('guest')) {
        socket.emit('nameResult', {
          success: false,
          message: "Cannot have a name beginning with 'Guest'"
        });
      } else {
        if (!namesUsed.includes(name)) {
          const prevName = nickNames[socket.id];
          const prevNameIdx = namesUsed.indexOf(prevName);
          nickNames[socket.id] = name;
          namesUsed = [
            ...namesUsed.slice(0, prevNameIdx),
            ...namesUsed.slice(prevNameIdx + 1),
            name
          ];
          socket.emit('nameResult', {
            success: true,
            message: 'Name has been changed'
          });
        } else {
          socket.emit('nameResult', {
            success: false,
            message: 'Name has already been taken'
          });
        }
      }
    });
  },
  handleMessageBroadcast (socket, nickNames) {
    socket.on('message', (message) => {
      socket.broadcast.to(message.room).emit('message', {
        text: `${nickNames[socket.id]}: ${message.text}`
      });
    });
  },
  listen (server) {
    chat = io(server);

    chat.on('connection', (socket) => {
      console.log("connected");
      guestNumber = this.assignGuestName(socket, guestNumber,
                                          nickNames, namesUsed);
      this.handleMessageBroadcast(socket, nickNames);
      this.handleNameChangeAttempts(socket, nickNames, namesUsed);
    });
  }
};

module.exports = chatServer;
