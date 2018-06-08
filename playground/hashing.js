const {SHA256, AES} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var token = jwt.sign(data, '123asd');
console.log(token);

var decoded = jwt.verify(token, 'a23asd');
// console.log('decode : ', decoded);
// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecrect').toString()
// };

// // token.data.id =5;

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecrect').toString();

// if ( resultHash === token.hash ) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed, do not trust');
// }
// console.log(token.hash);
// console.log(resultHash.toString());