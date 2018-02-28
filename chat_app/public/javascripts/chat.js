class Chat {
  constructor (socket) {
    this.socket = socket;
  }

  sendMessage (msg) {
    this.socket.emit('message', {text: msg});
  }

  processCommand (command) {
    const words = command.split(' ');
    const parsedCmd = words[0].substring(1, words[0].length).toLowerCase();
    let message = false;

    switch (parsedCmd) {
      case 'nick':
        words.shift();
        const name = words.join();
        this.socket.emit('nameAttempt', name);
        break;
      default:
        message = 'Unrecognized command';
        break;
    }

    return message;
  }

}

module.exports = Chat;
