var gAuth = require( './googleAuthService' );

gAuth.getCredentials().then(
  credentials => gAuth.getNewToken( credentials, function() {
    console.log( 'Finished creating new token!' );
  } ),
  function( err ) {
    console.log( 'Error obtaining credentials: ', err );
  }
);
