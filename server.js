/**
 * Created by rafael on 07/06/15.
 */
// TODO: refactorizar codigo y usar variables en archivos de configuracion

var AWS = require('aws-sdk'),
  awsRegion = 'us-west-2',
  sqs = {},
  //queueUri = 'https://sqs.us-west-2.amazonaws.com/921644418190/sample';
  Hapi = require('hapi'),
  server = new Hapi.Server();

//server.connection({ host: 'localhost', port: '3000' });
server.connection({ port: '8081' });

/* **** RUTAS ****************************** */
server.route({
  method: 'POST',
  path: '/hola',
  handler: function (request, response) {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: awsRegion
    });

    sqs = new AWS.SQS();

    server.log('response: ', request.payload.name); // payload= {"name":"XXXX"}
    server.log(
      'Starting receive message',
      '...a 200 response should be received.'
    );

    response();

  }
});

/* **** END: RUTAS ************************** */

/* **** MONITORES *************************** */
// lista de reporters en los que saldra el resultado de la monitorizacion
var options = {
  opsInterval: 1000,
  reporters: [{
    reporter: require('good-console'),
    events: { log: '*', response: '*' }
  }]
};

// registro los eventos a los que escucho
server.register({ register: require('good'), options: options }, function (err) {
  if (err) {
    console.error(err); // error al tratar de cargar el plugin Good
  } else {
    server.start(function () {
      server.log('info', 'Servidor worker escuchando en: ' + server.info.uri);
    });
  }
});
/* **** END: MONITORES *********************** */