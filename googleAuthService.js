var fs = require( 'fs' );
var readline = require( 'readline' );
var google = require( 'googleapis' );
var googleAuth = require( 'google-auth-library' );

var SCOPES = [ 'https://www.googleapis.com/auth/spreadsheets.readonly' ];
//var TOKEN_DIR = ( process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE ) + '/.credentials/';
var TOKEN_DIR = __dirname + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-version-one-survey-platform.json';

/**
Read in the client secret and ID from on disk and extract those values into an object.
*/
function getCredentials() {
  return new Promise( function( resolve, reject ) {
    // Load the client secret for accessing our project
    fs.readFile( 'client_secret.json', function processClientSecrets( err, content ) {
      if( err ) {
        console.log( 'Error loading client secret file: ' + err );
        reject( err );
      } else {
        //console.log( 'content: ', JSON.stringify( JSON.parse( content ) ) );
        // Hand back the credentials we have currently
        resolve( JSON.parse( content ) );
      }
    } );
  } );
}

/**
Create an OAuth2 client with given creds and then fire the given callback.
@param {Object} credentials The authorized client creds.
@param {function} callback The callback function afte the async
*/
function authorize( credentials, callback ) {
  // Extract client credential information
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  // Create our auth client
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2( clientId, clientSecret, redirectUrl );

  return new Promise( function( resolve, reject ) {

    // Hopefully we have already created a token to use for authentication
    fs.readFile( TOKEN_PATH, function( err, token ) {
      // This implies that the client was not pre-authorized.
      if( err ) {
        //getNewToken( oauth2Client, callback );
        console.log( '!!! Error opening existing auth token. Try re-authorizing on the CLI.' );
        reject( err );
      }

      // No problems here - return the auth client
      else {
        // Store the pre-authorized token credentials in our client and return it
        oauth2Client.credentials = JSON.parse( token );
        resolve( oauth2Client );
      }
    } );

  } );
}

/**
Get and store new token after prompting for user auth, and then execute given
callback with given OAuth2 client.

@param {google.auth.OAuth2} oauth2Client The OAuMth2 client to get token for.
@param {getEventsCallback} callback The callback to call with the auth'd client.
*/
function getNewToken( credentials, callback ) {
  // Extract client credential information
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  // Create our auth client
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2( clientId, clientSecret, redirectUrl );

  var authUrl = oauth2Client.generateAuthUrl( {
    access_type: 'offline',
    scope: SCOPES
  } );

  console.log( 'Authorize this app by visiting this url: ', authUrl );
  var rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout
  } );

  rl.question( 'Enter the code from that page here: ', function( code ) {
    rl.close();
    oauth2Client.getToken( code, function( err, token ) {
      if( err ) {
        console.log( 'Error while trying to retrieve access token ', err );
        return;
      }

      oauth2Client.credentials = token;
      storeToken( token );
      callback( oauth2Client );
    } )
  } );
}

/**
Store the token to disk to be used in later program executions.

@param {Object} token The token to store on disk.
*/
function storeToken( token ) {
  // Try to make the new directory for credentials (if it doesn't exist)
  try {
    fs.mkdirSync( TOKEN_DIR );
  } catch( err ) {
    if( err.code != 'EEXIST' ) {
      console.log( 'Error creating director!', err );
      throw err;
    }
  }

  fs.writeFile( TOKEN_PATH, JSON.stringify( token ) );
  console.log( 'Token written to: ' + TOKEN_PATH );
}

/**
Wrapper function to expose publicly for verifying there are valid credentials
that can be authorized (OAuth2) with the Google API. A Promise for the auth client
will be returned.
*/
function getAuthClient() {
  // Get our credentials (or a Promise that we will have them)
  return getCredentials().then(
    credentials => authorize( credentials ),
    function( err ) { console.log( 'Error getting credentials! ', err ); }
  );
}

exports.getAuthClient = getAuthClient;
exports.storeToken = storeToken;
exports.getNewToken = getNewToken;
exports.getCredentials = getCredentials;
