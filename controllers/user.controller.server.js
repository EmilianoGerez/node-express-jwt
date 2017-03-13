const mongoose = require('mongoose');
const User = mongoose.model("User");
const _ = require('lodash');

exports.createUser = function(req, res) {
  const userBody = _.pick(req.body, ['firstname', 'lastname', 'email', 'password', 'role']);
  let user = new User(userBody);
  user.save()
    .then(() => res.send(user))
    .catch((e) => {
      res.status(400).send(e);
    })
}