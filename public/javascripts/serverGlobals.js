module.exports = {
    // Constructor de usuarios
    User: function(n) {
        this.name = n;
    },
    // Constructor de canales
    Channel: function(n, frstMes) {
        this.name = n;
        this.users = [];
        this.messages = [];
        this.messages.push(frstMes);
    },
    // Array de canales del servidor
    channels: [],
    // Funcion para encontrar el indice de un objeto en un array segun uno de sus atributos (validar canales existentes)
    findWithAttr: function(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    },
    // Retorna el nombre del canal segun los parametros de la peticion
    selectChannelName: function(req) {
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
    },
    // Deja solo los caracteres alfanumericos en un string pasado por parametro
    cleanChannelName: function(name) {
        name = name.toString();
        return name.replace(/\W/g, '');
    }
};
