class Chat {
  constructor (socket) {
    this.socket = socket;
  }

  sendMessage (msg) {
    this.socket.emit('message', {text: msg});
  }

  processCommand (command) {
    let message = false;

    switch (command) {
      case 'nick':
        this.socket.emit('nameAttempt', command);
        break;
      default:
        message = 'Unrecognized command';
        break;
    }

    return message;
  }

}

module.exports = Chat;
