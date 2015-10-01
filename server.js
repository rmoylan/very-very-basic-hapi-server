var Hapi = require('hapi');

var Server = new Hapi.Server({});

Server.connection({'host':'0.0.0.0', 'port':'9999'});

Server.register(require('inert'), function (err) {

    if (err) {
        throw err;
    }

    // path to static assets
    Server.route({
        method: 'GET',
        path: '/{p*}',
        handler: {
            directory: {
                path: './app/', // change app to the directory where all files are
                listing: true,
                defaultExtension:'html'
            }
        }
    });

    Server.start(function (err) {

        if (err) {
            throw err;
        }

        console.log('Server running at:', Server.info.uri);
    });
});