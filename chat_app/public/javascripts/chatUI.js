const Chat = require('./chat');

class ChatUI {
  constructor (socket) {
  this.chat = new Chat(socket);
  this.form = document.querySelector('form');
  this.msgList = document.querySelector('ul#msg-list');
  this.roomList = document.querySelector('ul#room-list');
  this.input = document.querySelector('input');
  this.room = document.querySelector('#room');
  this.submitHandler();
  }

  getInput () {
    return this.input.value;
  }

  sendMessage () {
    this.chat.sendMessage(this.getInput);
  }

  addMessage (msg) {
    const newMessage = document.createElement('li');
    newMessage.textContent = msg;
    this.msgList.appendChild(newMessage);
  }

  submitHandler(){
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.processUserInput();
      this.input.value = "";
    });
  }

  processUserInput () {
    const msg = this.getInput();
    console.log(msg);
    let response;
    if (msg[0] === '/') {
      response = this.chat.processCommand(msg);
      if (response) {
        this.addMessage(response);
      }
    } else {
      this.sendMessage();
      this.addMessage(msg);
    }
  }

}

module.exports = ChatUI;
