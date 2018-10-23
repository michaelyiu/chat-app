let moment = require('moment');

// let date = moment();
// date.add(1, 'year');
// console.log(date.format('MMM Do, YYYY'));

let someTimestamp = moment().valueOf();


let createdAt = 1234;
let date = moment(createdAt);
console.log(date.format('h:mm a'));

//10:35 am