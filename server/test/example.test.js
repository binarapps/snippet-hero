// var assert = require('assert');
// var chai = require('chai');
// var db = require('../models');
//
// var expect = chai.expect;
//
// describe('Array', function() {
//   describe('#indexOf()', function () {
//     it('should return -1 when the value is not present', function () {
//       assert.equal(-1, [1,2,3].indexOf(5));
//       assert.equal(-1, [1,2,3].indexOf(0));
//     });
//   });
// });
//
// describe('User', function() {
//   before(function(done) {
//     db.User.sync({ force : true }).then(function () {
//       done();
//     });
//   });
//   describe('#create', function(done) {
//     it('should save model to database', function () {
//       db.User.create({
//         email: 'john@niepodam.pl',
//         name: 'John'
//       }).then(function(user) {
//         expect(user.name).to.equal('John');
//         expect(user.email).to.equal('john@niepodam.pl');
//         done();
//       });
//     });
//   });
// });
