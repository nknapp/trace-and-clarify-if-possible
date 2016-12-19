/*!
 * trace-and-clarify-if-possible <https://github.com/nknapp/trace-and-clarify-if-possible>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

/* global describe */
/* global it */
/* global xdescribe */
// /* global xit */

'use strict'

function oneFunction () {
  return Promise.resolve(2)
    .then(function () {
      // The following line must be line 19
      return anotherFunction()
    })
}

function anotherFunction () {
  // The following line must be line 25
  throw new Error('Testing an Error')
}

var chai = require('chai')
var expect = chai.expect

// Activate trace and clarify
require('../')

describe('trace-and-clarify-if-possible:', function () {
  it('should not break the program', function () {
  })

  /**
   * Test for the correct activation.
   * Disabled for node versions that are too low.
   */
  function testTraceAndClarify () {
    it('trace should be activated', function () {
      return Promise.resolve(2)
        .then(function () {
          return oneFunction()
        })
        .then(function () {
          throw new Error('Code execution should not come across this line due to previous exception')
        })
        .catch(function (err) {
          if (err.message !== 'Testing an Error') {
            throw err
          }
          expect(err.stack).to.match(/main-spec\.js:25/)
          expect(err.stack).to.match(/main-spec\.js:19/)
        })
    })

    it('clarify should be activated', function () {
      return Promise.resolve(2)
        .then(function () {
          return oneFunction()
        })
        .then(function () {
          throw new Error('Code execution should not come across this line due to previous exception')
        })
        .catch(function (err) {
          if (err.message !== 'Testing an Error') {
            throw err
          }
          expect(err.stack).not.to.match(/tryOnImmediate/)
        })
    })
  }

  if (process.version.match(/^v[0123]/)) {
    xdescribe('Skipping actual test due to unsupported version', testTraceAndClarify)
  } else {
    describe('Check for trace and clarify activation', testTraceAndClarify)
  }
})
