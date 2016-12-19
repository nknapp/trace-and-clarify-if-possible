/*!
 * trace-and-clarify-if-possible <https://github.com/nknapp/trace-and-clarify-if-possible>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

'use strict'

var versionStr = process.version.match(/v(\d+).*/)[1]
var majorVersion = Number(versionStr)
if (majorVersion >= 4) {
  require('trace')
  require('clarify')
  console.log('Trace and clarify activated')
}

