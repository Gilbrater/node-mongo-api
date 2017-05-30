const {SHA256} = require('crypto-js');
const jwt = require("jsonwebtoken");
//var message = 'I am user number 3';
/*--------------------------------------
   USING JSONWEBTOKENS
---------------------------------------*/
var data = {
    id:10
};
var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log("Decoded",decoded)
/*--------------------------------------
   USING CRYPTO-JS
---------------------------------------*/
//var hash = SHA256(message).toString();
//
//console.log(`${message}`);
//console.log(`${hash}`);
//
//var data = {
//    id:5
//};
//
//var token = {
//    data,
//    hash: SHA256(JSON.stringify(data)+"secretsalt").toString()
//}
//
//token.data.id=4;
//token.hsash = SHA256(JSON.stringify(data)).toString();
//
//var resultHash = SHA256(JSON.stringify(data)+"secretsalt").toString();
//if(resultHash===token.hash){
//    console.log("Data was not changed")
//}else{
//    console.log("Data was changed, do not trust!");
//}

