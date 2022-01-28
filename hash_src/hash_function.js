const SHA256 = require( 'crypto-js/sha256');

//console.log(SHA256("apple").toString());

function calculateHash()
{
    return SHA256("apple").toString();

}

console.log(calculateHash());