// ============
// xMatters Alarm Action
// ============
// Send an alert to xMatters
// ------------

var _ = require('underscore');
var _async = require('async');
var _format = require('util').format;
var _request = require('request');

function getOptions(REST_USER, REST_PWD, XMREBFORM_URL, messageId, messageName, messageType, priority, messageBody, targetGroupOrUser) {

    // If a targetGroupOrUser is available, use that, otherwise empty array. 
    recipients = targetGroupOrUser ? [{ "targetName": targetGroupOrUser	}] : [];
            
	return {
		uri: _format(XMREBFORM_URL),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + new Buffer( REST_USER + ':' + REST_PWD ).toString( "base64" )
		},
		json: {
			"properties": {
			  'entity_id':           messageId,
			  'entity_display_name': messageName,
			  'message_type':        messageType,
			  'monitoring_tool':    'Boundary',
			  'state_message':       messageBody
			},
			"recipients": recipients
		}
	};
}


// This function is exposed as "run", and is called
// when the action is fired. 
// alarmlog is apparently not used for anything. 
function postmessage(action, alarm, alarmlog, cb) {
	var stats = {
		xmatters_messages: 0,
		xmatters_errors: 0
	};

	function handleRequest(err, resp, body, cb) {
		if (err || resp.statusCode < 200 || resp.statusCode >= 300) {
			stats.xmatters_errors++;
			//console.log( "ERROR: " + err + '. RESP: ' + JSON.stringify( resp ) );
		}
		else {
			stats.xmatters_messages++;
		}

		cb(null, stats);
	}

	var config = action && action.configuration && action.configuration || undefined;
	if (!config) {
		return cb('xMatters Action::No configuration found.');
	}

	if (!config.REST_USER) {
		return cb('xMatters Action::No REST User found.');
	}

	var meta = alarm._meta;
	var links = meta.alarmLinks || [];
	var note = alarm.note ? '\n\nNOTE: ' + alarm.note : '';
	var type = 'High'; // Default value is High

	// Valid priorities: High, Medium, Low
	if (config.priority && (config.priority === 'High' || config.priority === 'Medium' || config.priority === 'Low')) {
		type = config.priority;
	}

	var alertFuncs = [];

	_.each(links, function(server) {
		var messageId = _format('ALARM/%s/%s/%s', alarm.id, server.serverName, alarm.name);
		var messageName = alarm.name;
		var priority = server.isSet === false ? 'RECOVERY' : type;
		var messageBody = _format("%s\n\nview dashboard - %s%s", server.labelText, server.link, note);

		var opts = getOptions(config.REST_USER, config.REST_PWD, config.XMREBFORM_URL, messageId, messageName, type, priority, messageBody, config.targetGroupOrUser);

		function alertFunction(innercb) {
			_request.post(opts, function(err, resp, body) {
				handleRequest(err, resp, body, innercb);
			});
		}

		alertFuncs.push(alertFunction);
	});

	_async.series(alertFuncs, function(err, results) {
		cb(null, stats);
	});

}

module.exports = {
	run : postmessage
};

