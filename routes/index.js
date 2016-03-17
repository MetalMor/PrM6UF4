/* ARREGLAR LA RECUPERACION DEL NOMBRE DEL CANAL VIA ARRAY DE PARAMETROS */

var express = require('express');
var router = express.Router();

// Objeto contenedor de datos globales del usuario
globals = {};
// Constructor de usuarios
var User = function(n) {
    this.name = n;
};
// Constructor de canales
var Channel = function(n, frstMes) {
    this.name = globals.cleanChannelName(n);
    this.users = [];
    this.messages = [];
    this.messages.push(frstMes);
};

// Si no existe un array de canales, lo crea
globals.channels = globals.hasOwnProperty('channels') ?
    window.channels :
    [];

// Funcion para encontrar el indice de un objeto en un array segun uno de sus atributos (validar canales existentes)
globals.findWithAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
};

// En un array, selecciona el primer elemento que exista (para seleccionar el campo del que viene el nombre del canal)
globals.selectChannelName = function(req) {
    console.log('channel: ' + req.query.channel +
               'newChannel: ' + req.query.newChannel);
    if(req.query.newChannel === '') {
        if(req.query.channel === undefined) {
            return 'DefaultChannel';
        } else return req.query.channel;
    }
    return req.query.newChannel;
    /*if(typeof names === 'array') {
        names.forEach(function(name) {
            console.log('iteracio nom: ' + name);
            if(name) return name;
        });
        return 'DefaultChannel';
    }
    console.log('nom: ' + names);
    return names;*/
};

globals.cleanChannelName = function(name) {
    name = name.toString();
    return name.replace(/\W/g, '');
};

/* GET pantalla nuevo usuario. */
router.get('/', function(req, res, next) {
    console.log('pantalla new user');
    // envia la vista con un parametro "title"
  res.render('user', { title: 'JGFxat' });
});

/* POST pantalla escoger canal */
router.post('/', function(req, res, next) {
    globals.user = new User(req.body.name);
    console.log('user name: ' + globals.user.name)
    var render = {
        title: 'Escull canal',
        channels: globals.channels,
        user: globals.user
    };
    res.render('channel', render);
});

/* GET pantalla chat */
router.get('/chat/', function(req, res, next) {
    //console.log('array noms canal: ' + req.query.channel);

    var newChannelName = globals.selectChannelName(req); // selecciona el nombre del canal del array de parametros pasados del formulario
    var reqdChannel = new Channel(newChannelName, 'canal creat: ' + newChannelName); // crea un nuevo objeto canal

    // COMPROBACION DEL CANAL: comprueba si ya existe, si no existe lo inserta en el array de canales
    var channelPos = globals.findWithAttr(globals.channels, 'name', reqdChannel.name); // busca el canal introducido en el array de canales
    if (channelPos >= 0) {
        // Si el canal existe...
        var reqdChannel = globals.channels[channelPos]; // recogelo del array
    } else {
        // Si el canal no existe...
        var length = globals.channels.push(reqdChannel); // inserta el canal en la lista
        var reqdChannel = globals.channels[length-1]; // selecciona el canal requerido
        globals.channels[length-1].messages.push('nou usuari: ' + globals.user.name);
    }

    reqdChannel.users.push(globals.user); // añade al usuario como nuevo miembro del canal
    console.log('usuari: ' + globals.user.name);
    console.log('canal escollit: ' + reqdChannel.name);

    // crea el objeto de respuesta
    var render = {
        title: 'JGFxat',
        channel: reqdChannel,
        user: globals.user
    };
    res.render('chatWindow', render);
});

router.post('/chat/', function(req, res, next) {
    var userData = JSON.parse(request.body);
    console.log(userData);
});

module.exports = router;
