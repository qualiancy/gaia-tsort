/*!
 * Attach chai to global should
 */

global.chai = require('chai');
global.should = global.chai.should();

/*!
 * Chai Plugins
 */

//global.chai.use(require('chai-spies'));
//global.chai.use(require('chai-http'));

/*!
 * Import project
 */

global.tsort = require('../..');

/*!
 * Helper to load internals for cov unit tests
 */

function req (name) {
  return process.env.tsort_COV
    ? require('../../lib-cov/tsort/' + name)
    : require('../../lib/tsort/' + name);
}

/*!
 * Load unexposed modules for unit tests
 */

global.__tsort = {};
