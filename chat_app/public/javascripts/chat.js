
class Chat {
  constructor (socket) {
    this.socket = socket;
  }

  sendMessage (msg) {
    this.socket.emit('message', {text: msg});
  }
}

module.exports = Chat;
