import 'whatwg-fetch';

export function getJSON( url, callback ) {
    // Hit the given URL and send it the body content via POST
    fetch( url, {
      method: 'get',
      headers: new Headers( { 'Content-Type': 'application/json' } )
    } )
      // Parse the response into a JSON object
      .then( response => response.json() )
      // Send the json to our callback function
      .then( json => callback( json ) )
      // Handle errors
      .catch( ex => {
        console.log( 'Failed on GET \'%s\': %o', url, ex );
      } );
  }

export function postJSON( url, body = {}, callback ) {
    // Hit the given URL and send it the body content via POST
    fetch( url, {
      method: 'post',
      headers: new Headers( { 'Content-Type': 'application/json' } ),
      body: JSON.stringify( body )
    } )
      // Parse the response into a JSON object
      .then( response => response.json() )
      // Send the json to our callback function
      .then( json => callback( json ) )
      // Handle errors
      .catch( ex => {
        console.log( 'Failed on POST \'%s\': %o', url, ex );
      } );
}
