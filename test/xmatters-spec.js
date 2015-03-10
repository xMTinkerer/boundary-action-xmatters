var _expect = require('chai').expect;
var _mockAlarm = require('./mockAlarm').getAlarm();
var _mockAlarm2 = require('./mockAlarm').getAlarm4();
var _nock = require('nock');
var _xmatters = require('../app/xmatters');

// Set this to true to see debug messages in the console output
var consoleOutput = false;

var REST_USER = 'restuser';
var REST_PWD = 'restuserpassword';
var XM_BASE_URL  = 'https://company.dc.xmatters.com';
var XM_FORM_PATH = '/reapi/2015-01-01/forms/UUID/triggers';
var XMREBFORM_URL = XM_BASE_URL + XM_FORM_PATH;

var mockAction1 = {
	configuration: {
		endpointURL: XMREBFORM_URL,
		username: REST_USER,
		password: REST_PWD,
		targetGroupOrUser: 'SMcNall Group',
		priority: 'High'
	}
};

var mockAction2 = {
	configuration: {
		endpointURL: XMREBFORM_URL,
		username: REST_USER,
		password: REST_PWD,
		targetGroupOrUser: 'SMcNall Group',
		priority: 'Medium'
	}
};

var mockAction3 = {
	configuration: {
		endpointURL: XMREBFORM_URL,
		username: REST_USER,
		password: REST_PWD,
		targetGroupOrUser: 'SMcNall Group',
		priority: 'Low'
	}
};

var expectedRequestBody1 = {
	"properties": {
		"entity_id": "ALARM/40506/www-server-1/CPU usage is high",
		"entity_display_name": "CPU usage is high",
		"message_type": "High",
		"monitoring_tool": "Boundary",
		"state_message": "Server www-server-1's avg cpu utilization is 82.5%\n\nview dashboard - https://premium.boundary.com/home/5733/standard?ival=60&marker=1422377400000!network\n\nNOTE: CPU Utilization has exceeded 80% over a 60s duration"
	},
	"recipients": [{ "targetName": "SMcNall Group" }]
};

var expectedRequestBody2 = {
	"properties": {
		"entity_id": "ALARM/40506/www-server-1/CPU usage is high",
		"entity_display_name": "CPU usage is high",
		"message_type": "Medium",
		"monitoring_tool": "Boundary",
		"state_message": "Server www-server-1's avg cpu utilization is 82.5%\n\nview dashboard - https://premium.boundary.com/home/5733/standard?ival=60&marker=1422377400000!network\n\nNOTE: CPU Utilization has exceeded 80% over a 60s duration"
	},
	"recipients": [{ "targetName": "SMcNall Group" }]
};

var expectedRequestBody3 = {
	"properties": {
		"entity_id": "ALARM/40506/www-server-1/CPU usage is high",
		"entity_display_name": "CPU usage is high",
		"message_type": "Low",
		"monitoring_tool": "Boundary",
		"state_message": "Server www-server-1's avg cpu utilization is 82.5%\n\nview dashboard - https://premium.boundary.com/home/5733/standard?ival=60&marker=1422377400000!network\n\nNOTE: CPU Utilization has exceeded 80% over a 60s duration"
	},
	"recipients": [{ "targetName": "SMcNall Group" }]
};

var expectedRequestBody4 = {
	"properties": {
		"entity_id": "ALARM/56791/www-server-1/CPU usage is high",
		"entity_display_name": "CPU usage is high",
		"message_type": "RECOVERY",
		"monitoring_tool": "Boundary",
		"state_message": "Server www-server-1's avg cpu utilization is 68.5%\n\nview dashboard - https://premium.boundary.com/home/5733/standard?ival=60&marker=1422388500000!CPU"
	},
	"recipients": [{ "targetName": "SMcNall Group" }]
};

var expectedStatistics1 = {
	"xmatters_messages": 0,
	"xmatters_errors": 4
};

var expectedStatistics2 = {
	"xmatters_messages": 4,
	"xmatters_errors": 0
};

var expectedStatistics3 = {
	"xmatters_messages": 1,
	"xmatters_errors": 0
};

function setupNock(urlPath, expectedRequestBody, debug) {
	if (debug) {
		console.log('\nurl ==>' + XMREBFORM_URL + '<==');
	}

	// Set up nock...

	// www-server-1
	_nock( XM_BASE_URL )
		.filteringRequestBody(
		function(reqBody) {
			var reqBodyObj = JSON.parse(reqBody);
			var reqBodyString = JSON.stringify(reqBodyObj, null, 2);
			_expect(reqBodyString).to.equal(JSON.stringify(expectedRequestBody, null, 2));
			if (debug) {
				console.log('reqBody ==>' + reqBodyString + '<==\n');
			}
		}
	)
		.post(urlPath)
		.reply(200, {
			result: 'success',
			entity_id: 'ALARM/40506/www-server-1/CPU usage is high'
		});

	// www-server-2
	_nock( XM_BASE_URL )
		.filteringRequestBody(
		function(reqBody) {
			var reqBodyObj = JSON.parse(reqBody);
			var reqBodyString = JSON.stringify(reqBodyObj, null, 2);
			if (debug) {
				console.log('reqBody ==>' + reqBodyString + '<==\n');
			}
		}
	)
		.post(urlPath)
		.reply(200, {
			result: 'success',
			entity_id: 'ALARM/40506/www-server-2/CPU usage is high'
		});

	// www-server-3
	_nock( XM_BASE_URL )
		.filteringRequestBody(
		function(reqBody) {
			var reqBodyObj = JSON.parse(reqBody);
			var reqBodyString = JSON.stringify(reqBodyObj, null, 2);
			if (debug) {
				console.log('reqBody ==>' + reqBodyString + '<==\n');
			}
		}
	)
		.post(urlPath)
		.reply(200, {
			result: 'success',
			entity_id: 'ALARM/40506/www-server-3/CPU usage is high'
		});

	// www-server-4
	_nock( XM_BASE_URL )
		.filteringRequestBody(
		function(reqBody) {
			var reqBodyObj = JSON.parse(reqBody);
			var reqBodyString = JSON.stringify(reqBodyObj, null, 2);
			if (debug) {
				console.log('reqBody ==>' + reqBodyString + '<==\n');
			}
		}
	)
		.post(urlPath)
		.reply(200, {
			result: 'success',
			entity_id: 'ALARM/40506/www-server-4/CPU usage is high'
		});
}

afterEach(function() {
	_nock.cleanAll();
});

describe('xMatters', function() {

	describe('Action', function() {

		it('should define a run() function.', function() {
			_expect(_xmatters.run).to.not.be.undefined;
		});

		it('should return an error if there is no configuration.', function(done) {
			var action = {};
			var alarm = {};
			var alarmlog = {};
			var cb = function(err, statistics) {
				_expect(err).to.equal('xMatters Action::No configuration found.');
			};

			_xmatters.run(action, alarm, alarmlog, cb);

			setTimeout(function() {
				done();
			}, 50);
		});

		it('should return an error if there is no Endpoint URL.', function(done) {
			var action = {
				configuration : {
					"username": "username",
					"password": "password"
				}
			};
			var alarm = {};
			var alarmlog = {};
			var cb = function(err, statistics) {
				_expect(err).to.equal('xMatters Action::No Endpoint URL found.');
			};

			_xmatters.run(action, alarm, alarmlog, cb);

			setTimeout(function() {
				done();
			}, 50);
		});

		it('should return an error if there is no REST Username.', function(done) {
			var action = {
				configuration : {
					"endpointURL": XMREBFORM_URL,
					"password": "password"
				}
			};
			var alarm = {};
			var alarmlog = {};
			var cb = function(err, statistics) {
				_expect(err).to.equal('xMatters Action::No REST Username found.');
			};

			_xmatters.run(action, alarm, alarmlog, cb);

			setTimeout(function() {
				done();
			}, 50);
		});

		it('should return an error if there is no REST Password.', function(done) {
			var action = {
				configuration : {
					"endpointURL": XMREBFORM_URL,
					"username": "username"
				}
			};
			var alarm = {};
			var alarmlog = {};
			var cb = function(err, statistics) {
				_expect(err).to.equal('xMatters Action::No REST Password found.');
			};

			_xmatters.run(action, alarm, alarmlog, cb);

			setTimeout(function() {
				done();
			}, 50);
		});

		it('should increment the error stats count when the status code returned from calling xMatters is not a success code.', function(done) {
			_nock( XM_BASE_URL )
				.post( XM_FORM_PATH )
				.reply(500, {});

			var action = mockAction1;
			var alarm = _mockAlarm;
			var alarmlog = {};
			var cb = function(err, statistics) {
				_expect(err, 'Error parameter to callback should be null').to.be.null;
				var statsString = JSON.stringify(statistics, null, 2);
				_expect(statsString).to.equal(JSON.stringify(expectedStatistics1, null, 2), 'Statistics parameter to callback is not correct.');
			};

			_xmatters.run(action, alarm, alarmlog, cb);

			setTimeout(function() {
				done();
			}, 50);
		});

		it('should have the correct statistics for an alarm with 4 servers, message type is High.', function(done) {
			setupNock( XM_FORM_PATH, expectedRequestBody1, consoleOutput);

			var action = mockAction1;
			var alarm = _mockAlarm;
			var alarmlog = {};
			var cb = function(err, statistics) {
				_expect(err, 'Error parameter to callback should be null').to.be.null;
				var statsString = JSON.stringify(statistics, null, 2);
				_expect(statsString).to.equal(JSON.stringify(expectedStatistics2, null, 2), 'Statistics parameter to callback is not correct.');
			};

			_xmatters.run(action, alarm, alarmlog, cb);

			setTimeout(function() {
				done();
			}, 50);
		});

		it('should have the correct statistics for an alarm with 4 servers, message type is Medium.', function(done) {
			setupNock( XM_FORM_PATH, expectedRequestBody2, consoleOutput);

			var action = mockAction2;
			var alarm = _mockAlarm;
			var alarmlog = {};
			var cb = function(err, statistics) {
				_expect(err, 'Error parameter to callback should be null').to.be.null;
				var statsString = JSON.stringify(statistics, null, 2);
				_expect(statsString).to.equal(JSON.stringify(expectedStatistics2, null, 2), 'Statistics parameter to callback is not correct.');
			};

			_xmatters.run(action, alarm, alarmlog, cb);

			setTimeout(function() {
				done();
			}, 50);
		});

		it('should have the correct statistics for an alarm with 4 servers, message type is Low.', function(done) {
			setupNock( XM_FORM_PATH, expectedRequestBody3, consoleOutput);

			var action = mockAction3;
			var alarm = _mockAlarm;
			var alarmlog = {};
			var cb = function(err, statistics) {
				_expect(err, 'Error parameter to callback should be null').to.be.null;
				var statsString = JSON.stringify(statistics, null, 2);
				_expect(statsString).to.equal(JSON.stringify(expectedStatistics2, null, 2), 'Statistics parameter to callback is not correct.');
			};

			_xmatters.run(action, alarm, alarmlog, cb);

			setTimeout(function() {
				done();
			}, 50);
		});

		it('should have the correct statistics for an alarm with 1 server, message type is RECOVERY.', function(done) {
			setupNock( XM_FORM_PATH, expectedRequestBody4, consoleOutput);

			var action = mockAction1;
			var alarm = _mockAlarm2;
			var alarmlog = {};
			var cb = function(err, statistics) {
				_expect(err, 'Error parameter to callback should be null').to.be.null;
				var statsString = JSON.stringify(statistics, null, 2);
				_expect(statsString).to.equal(JSON.stringify(expectedStatistics3, null, 2), 'Statistics parameter to callback is not correct.');
			};

			_xmatters.run(action, alarm, alarmlog, cb);

			setTimeout(function() {
				done();
			}, 50);
		});

	});
});


