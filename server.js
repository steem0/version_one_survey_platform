var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var app = express();
var path = require( 'path' );

// Include our hashing functions
var hash = require( './hashService' );

// Include our google sheet auth services
var googleAuth = require( './googleAuthService.js' );

// Include our survey question services
var surveyService = require( './surveyService.js' );

// Expose our static assets, but do not serve up 'index.html' by
// default. That will be handled below.
app.use( express.static( path.join( __dirname + '/build' ), { index: false } ) );

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded( { extended: false } );
// Create application/json parser
var jsonParser = bodyParser.json();

// Capture our main app
app.get( '/', function( req, res ) {
  console.log( '[GET]: /' );
  res.sendFile( path.join( __dirname + '/build/index.html' ) );
} );

// Serve up our questions
// TODO: pull this information from a database or flatfiles
app.get( '/questions', function( req, res ) {
  console.log( '[GET]: /questions' );

  // Ensure we are authorized with Google API.
  googleAuth.getAuthClient().then(
    // We are authorized and have a client
    auth => {
      // Do an async call to get the questions
      surveyService.getQuestions( auth ).then(
        questions => {
          //console.log( JSON.stringify( questions ) );
          // Send those questions back!
          res.setHeader( 'Content-Type', 'application/json' );
          res.send( JSON.stringify( questions ) );
        },
        // We could not for some reason get the questions from the sheet
        function( err ) {
          console.log( 'Error getting questions! ', err );
          handleSendError( 'SERVER ERROR Q2: Could not retrieve survey questions. Please contact administrator.' );
        }
      );
    },
    // For some reason, we were not authorized. This could be because an access token was revoked or never created.
    // In this instance, try running createGoogleAuthToken.js from the CLI.
    function( err ) {
      console.log( 'Error getting auth client! ', err );
      handleSendError( 'SERVER ERROR Q1: Could not retrieve survey questions. Please contact administrator.' );
    }
  );

} );

// Generate a key from a given email address
app.post( '/key', jsonParser, function( req, res ) {
  console.log( '[POST]: /key -> ' );
  console.log( req.body );

  // Get the key for the given email
  var key = hash.hashPlaintext( req.body.email );
  console.log( "key: %s", key.toString( 'hex' ) );

  var verify = hash.verifyPlaintext( req.body.email, key );
  console.log( "verified: %s", verify );

  res.setHeader( 'Content-Type', 'application/json' );
  res.send( JSON.stringify( {
    data: { hash: 'pizza' }
  } ) );

} );

function handleSendError( err, code ) {
  if( code ) {
    res.statusCode = code;
  } else {
    res.statusCode = 500;
  }
  res.setHeader( 'Content-Type', 'application/json' );
  res.send( JSON.stringify( { message: err } ) );
}


app.listen( 3000, function() {
  console.log( 'SERVER STARTED: http://localhost:3000/' );
} );
