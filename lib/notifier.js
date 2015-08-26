module.exports = {
  sender: null,
  init: function(sender) {
    this.sender = sender;
  },
  send: function(receiver, message) {
    this.sender.send(receiver, message);
  }
};
