'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'mahuel';

exports.createToken = function(user){
    var payload = {
        sub: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix()
    }

    return jwt.encode(payload, secret);
}