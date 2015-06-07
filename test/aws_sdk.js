var should = require ('should'),
  AWS = require ('aws-sdk'),
  awsRegion = "us-west-2";

describe ( 'Cuando pruebes esta aplicacion en AWS,', function () {

  it (
    'deberias tener definida una variable de entorno para AWS_ACCESS_KEY_ID',
    function () {
      process.env.AWS_ACCESS_KEY_ID.should.exist;
  });

  it (
    'deberias tener definida una variable de entorno para AWS_SECRET_KEY',
    function () {
      process.env.AWS_SECRET_ACCESS_KEY.should.exist;
  });

  //compruebo que las variables de entorno se asignen a la config del objeto AWS
  before(function () {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: awsRegion});
  });

  it('deberias tener definida AWS Access Key en la AWS config', function () {
    var config = AWS.config;
    config.credentials.accessKeyId.should.equal(process.env.AWS_ACCESS_KEY_ID);
    config.credentials.secretAccessKey.should.equal(
        process.env.AWS_SECRET_ACCESS_KEY
    );
  });

  it('deberias tener definida us-west-2 como region en AWS', function () {
    AWS.config.region.should.equal(awsRegion);
  });

});