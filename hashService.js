var crypto = require( 'crypto' );

var config = {
  hashBytes: 32,
  saltBytes: 16,
  iterations: 782791
};

// Function that hashes a given plaintext using PBKDF2 from the crypto library.
function hashPlaintext( plaintext ) {
  // Blocking call to generate the salt ( a random string of bytes based on system entropy )
  var salt = crypto.randomBytes( config.saltBytes );
  // Blocking call to generate the hash
  var hash = crypto.pbkdf2Sync( plaintext, salt, config.iterations, config.hashBytes, 'sha512' );

  // Create a new buffer so that we can store the salt with the hash
  var combined = Buffer.allocUnsafe( hash.length + salt.length + 8 );

  // Write the salt length (should be 4 bytes)
  combined.writeUInt32BE( salt.length, 0, true );
  // Write the number of iterations (should be 4 bytes)
  combined.writeUInt32BE( config.iterations, 4, true );
  // Write the salt into the buffer
  salt.copy( combined, 8 );
  // Finally, write the hash into the buffer
  hash.copy( combined, salt.length + 8 );

  //* LOGGING
  console.log( "config.iterations: %s", config.iterations );
  console.log( "salt.length: %s", salt.length );
  console.log( "plaintext: %s", plaintext );
  console.log( "salt: %s", salt.toString( 'hex' ) );
  console.log( "hash: %s", hash.toString( 'hex' ) );
  console.log( "combined: %s", combined.toString( 'hex' ) );
  ///*/

  return combined;
}

// Function that takes a plaintext string and a given combined hash. Params for
// executing the PBKDF2 function are extracted from the combined hash and used
// for hashing the given plaintext. The results of comparing the extracted hash
// from the combined hash and the hashed plaintext are returned.
function verifyPlaintext( plaintext, combined ) {
  // Extract the length of the salt
  var saltBytes = combined.readUInt32BE( 0 );
  // Extract the length of the hash
  var hashBytes = combined.length - saltBytes - 8;
  // Extract the iterations for the PBKDF2 function
  var iterations = combined.readUInt32BE( 4 );
  // Finally, extract the salt and hash themselves
  var salt = combined.slice( 8, saltBytes + 8 );
  var hash = combined.toString( 'binary', saltBytes + 8 );

  //* LOGGING
  console.log( "saltBytes: %s", saltBytes );
  console.log( "hashBytes: %s", hashBytes );
  console.log( "iterations: %s", iterations );
  console.log( "salt: %s", salt.toString('hex') );
  console.log( "hash: %s", combined.toString( 'hex', saltBytes + 8 ) );
  ///*/

  // Run PBKDF2 using the same settings as the first run against the provided plaintext
  var verify = crypto.pbkdf2Sync( plaintext, salt, iterations, hashBytes, 'sha512' );

  // Return whether or not the hashed plaintext matches the stored hash
  return verify.toString( 'binary' ) === hash;
}

// Export our functions
exports.hashPlaintext = hashPlaintext;
exports.verifyPlaintext = verifyPlaintext;
