/* ARREGLAR LA RECUPERACION DEL NOMBRE DEL CANAL VIA ARRAY DE PARAMETROS */

var express = require('express');
var router = express.Router();
// Objeto contenedor de datos globales del servidor
var globals = require('../public/javascripts/serverGlobals.js');


/* GET pantalla nuevo usuario. */
router.get('/', function(req, res, next) {
    console.log('pantalla new user');
    // envia la vista con un parametro "title"
  res.render('user', { title: 'JGFxat' });
});

/* POST pantalla escoger canal */
router.post('/', function(req, res, next) {
    var newUser = new globals.User(req.body.name);
    console.log('user name: ' + newUser.name)
    var render = {
        title: 'Escull canal',
        channels: globals.channels,
        user: newUser
    };
    res.render('channel', render);
});

/* GET pantalla chat */
router.get('/chat/:user', function(req, res, next) {
    //console.log('array noms canal: ' + req.query.channel);
    console.log('param user: ' + req.params.user);
    var newUser = new globals.User(req.params.user);
    var newChannelName = globals.cleanChannelName(globals.selectChannelName(req)); // selecciona el nombre del canal del array de parametros pasados del formulario
    var reqdChannel = new globals.Channel(newChannelName, 'canal creat: ' + newChannelName); // crea un nuevo objeto canal

    // COMPROBACION DEL CANAL: comprueba si ya existe, si no existe lo inserta en el array de canales
    var channelPos = globals.findWithAttr(globals.channels, 'name', reqdChannel.name); // busca el canal introducido en el array de canales
    if (channelPos >= 0) {
        // Si el canal existe...
        var reqdChannel = globals.channels[channelPos]; // recogelo del array
    } else {
        // Si el canal no existe...
        var length = globals.channels.push(reqdChannel); // inserta el canal en la lista
        var reqdChannel = globals.channels[length-1]; // selecciona el canal requerido
        globals.channels[length-1].messages.push('nou usuari: ' + newUser.name);
    }

    reqdChannel.users.push(newUser); // añade al usuario como nuevo miembro del canal
    console.log('usuari: ' + newUser.name);
    console.log('canal escollit: ' + reqdChannel.name);

    // crea el objeto de respuesta
    var render = {
        title: 'JGFxat',
        channel: reqdChannel,
        user: newUser,
        scripts: ['static/javascripts/messages.js', 'static/javascripts/ajax.js']
    };
    res.render('chatWindow', render);
});

router.post('/saveMessage/', function(req, res, next) {
    var channelPos = globals.findWithAttr(globals.channels, 'name', req.body.channel);
    globals.channels[channelPos].messages.unshift(req.body.message);
    req.send(200);
});

router.post('/chatWindow/', function(req, res, next) {
    console.log('hola chatwindow')
    var data = JSON.parse(req.body.data);
    var channelPos = globals.findWithAttr(globals.channels, 'name', req.body.data.channel);
    var messages = globals.channels[channelPos].messages;
    console.log(typeOf(messages));
    res.contentType('json');
    res.send({channelMessages: messages});
});

module.exports = router;
