var express = require('express');
var router = express.Router();

var User = function(n) {
    this.name = n;
};

express.channels = express.hasOwnProperty('channels') ?
    window.channels :
    [];

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('pantalla new user');
    // envia la vista con un parametro "title"
  res.render('user', { title: 'JGFxat' });
});

router.post('/', function(req, res, next) {
    console.log('pantalla channel')
    express.newUser = new User(req.query.name);
    var render = {
        title: 'Escull canal',
        channels: express.channels
    };
    res.render('channel', render);
});

router.get('/chat/:channel', function(req, res, next) {
    console.log('finestra chat');
    var channelPos = express.channels.indexOf(req.query.channel);
    if (channelPos >= 0) {
        // Si el canal existe...
        var reqdChannel = express.channels[channelPos]; // recogelo del array
        reqdChannel.users.push(express.newUser); // añade un nuevo miembro
    } else {
        // Si el canal no existe...
        var length = express.channels.push(new Channel(req.query.channel)); // crea e inserta el canal en la lista
        var reqdChannel = express.channels[length-1]; // selecciona el canal requerido
        reqdChannel.users.push(express.newUser); // añade un nuevo miembro
    }

    console.log('canal escollit: ' + reqdChannel);

    // crea el objeto de respuesta
    var render = {
        title: 'JGFxat',
        channel: reqdChannel,
        user: express.newUser
    };

    res.render('chatWindow', render);
});

module.exports = router;
