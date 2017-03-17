var google = require( 'googleapis' );
var googleAuth = require( 'google-auth-library' );

// The following are indices that correspond to columns in the survey spreadsheets
var QUESTION_TYPE = 0;
var TYPE_CHOICE = 'choice';
var TYPE_TEXT = 'text';
var QUESTION_TEXT = 1;
var QUESTION_OPTIONS = 2;
var QUESTION_CHOICES_START = 3;

/**
 Extract the survey questions from Google Sheets
 @param {google.auth.OAuth2} oauth2Client The OAuth2 client connected to the Google
 API.
*/
function getQuestions( oauth2Client ) {
  // Assume we are using v4 of the sheets API
  var sheets = google.sheets('v4');

  return new Promise( function( resolve, reject ) {
    sheets.spreadsheets.values.get(
      {
        auth: oauth2Client,
        // TODO: Make this not hardcoded to a specific survey sheet
        spreadsheetId: '1kdpJLyGZ0kMpv0cq9U00scC_op3WxRO1ojiEAR8YJfs',
        range: 'Sheet1!A2:N50',
      },
      function( err, response ) {
        if( err ) {
          console.log( 'The API returned an error: ' + err );
          reject( err );
        }
        var rows = response.values;

        // We shouldn't have 0 rows
        if( rows.length == 0 ) {
          console.log( 'No data found.' );
          reject( err );
        }

        else {
          //console.log( 'We grabbed %s rows.', rows.length );

          var questions = [];

          // Go through the rows
          for( var i = 0; i < rows.length; i++ ) {
            var row = rows[ i ];

            // Extract the choices and assume there will be some empty strings
            var choices = [];
            for( var j = QUESTION_CHOICES_START; j < row.length; j++ ) {
              if( row[ j ].trim() ) {
                choices.push( row[ j ].trim() );
              }
            }

            questions.push( {
              id: i,
              type: row[ QUESTION_TYPE ],
              text: row[ QUESTION_TEXT ],
              choices: choices
            } );
          }

          // Print columns A - N, separating information appropriately
          //console.log( '%s, %s, %s', is_choice, text, choices.toString() );
          //console.log( JSON.stringify( questions ) );

          resolve( { data: questions } );
        }
      }
    );
  } );
}

exports.getQuestions = getQuestions;
