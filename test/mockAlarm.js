var mockReferenceAlarm = {
	// this information is subject to change as it is all internal to boundary, this is not something that we normally expose
	// to the customer

	// fields from the alarm
	"id": 30404,
	"cubeId": 1709391,
	"cubeInterval": 60,
	"cubeName": "ni_5738.s60",
	"triggerPredicate": {
		"agg": "sum",
		"op": "gt",
		"val": 104857600
	},
	"note": "auto generated",
	"name": "Inbound Network Traffic is high",
	"isDisabled": 0,
	"notifySet": 1,
	"notifyClear": 1,
	"setTime": null,
	"triggerDetail": {},
	"hosts": [],
	"perHostNotify": 0,
	"hostgroupId": null,
	"cubePredicate": [
		{
			"left": "type",
			"op": "=",
			"right": "NETRB"
		}
	],

	// metadata added for actions
	"_meta": {

		// was this the first time the alarm fired?
		// if there are multiple servers in an alarm, this was the first instance of the alarm being fired, so create the incident
		"fFirst": true,

		// are all of the servers in the alarm now under the threshold?
		// if all of the servers are under the threshold, then close the incident
		"fLast": false,

		// Links back to premium for each server in the alarm
		"alarmLinks": [
			{
				// is the server over the threshold?
				"isSet": true,
				// servers name
				"serverName": "www-wak-1",
				// preformatted text pushed to chatrooms or in an email
				"labelHTML": "Server <strong>www-wak-1</strong>'s sum network in has returned to the acceptable <strong style=\"color:#090\">100mb</strong>",
				"labelText": "Server www-wak-1's sum network in has returned to the acceptable 100mb",
				// link back to premium for that metric at that point in time
				"link": "https://premium.boundary.com/home/5733/standard?ival=60&marker=1422377400000!network"
			}
		],

		// list of servers in the group that are now back under the threshold
		"clearServers": {
			"www-wak-1": {
				"isSet": false,
				"hostname": "www-wak-1",
				"aggregate": "sum",
				"metric": "network in",
				"value": 104684577,
				"threshold": 104857600,
				"time": 1422377400000,
				"text": {
					"isSet": false,
					"serverName": "www-wak-1",
					"labelHTML": "Server <strong>www-wak-1</strong>'s sum network in has returned to the acceptable <strong style=\"color:#090\">100mb</strong>",
					"labelText": "Server www-wak-1's sum network in has returned to the acceptable 100mb",
					"link": "https://premium.boundary.com/home/5733/standard?ival=60&marker=1422377400000!network"
				}
			}
		},

		// list of servers in the group that are now over the threshold
		"setServers": {},

		// list of servers in the group that have not changed in status from the last call
		"sustainServers": {},

		// formatted title of the alarm used in email
		"title": "RESOLVED - Inbound Network Traffic is high - network in sum greater than 100mb after 3.0m",

		// meta data on the metric
		"metric": {
			"id": "network",
			"name": "network in",
			"type": "bytecount"
		},

		// pretty printed threshold
		"threshold": "100mb"
	}
};

var mockAlarm = {
	// fields from the alarm
	"id": 40506,
	"note": "CPU Utilization has exceeded 80% over a 60s duration",
	"name": "CPU usage is high",
	"perHostNotify": 1,

	// metadata added for actions
	"_meta": {
		// was this the first time the alarm fired?
		// if there are multiple servers in an alarm, this was the first instance of the alarm being fired, so create the incident
		"fFirst": false,

		// are all of the servers in the alarm now under the threshold?
		// if all of the servers are under the threshold, then close the incident
		"fLast": false,

		// Links back to premium for each server in the alarm
		"alarmLinks": [
			{
				// is the server over the threshold?
				"isSet": true,
				// servers name
				"serverName": "www-server-1",
				// preformatted text pushed to chatrooms or in an email
				"labelHTML": "Server <strong>www-server-1</strong>'s avg cpu utilization is <strong style=\"color:#090\">82.5%</strong>",
				"labelText": "Server www-server-1's avg cpu utilization is 82.5%",
				// link back to premium for that metric at that point in time
				"link": "https://premium.boundary.com/home/5733/standard?ival=60&marker=1422377400000!network"
			},
			{
				// is the server over the threshold?
				"isSet": true,
				// servers name
				"serverName": "www-server-2",
				// preformatted text pushed to chatrooms or in an email
				"labelHTML": "Server <strong>www-server-2</strong>'s avg cpu utilization is <strong style=\"color:#090\">92.5%</strong>",
				"labelText": "Server www-server-2's avg cpu utilization is 92.5%",
				// link back to premium for that metric at that point in time
				"link": "https://premium.boundary.com/home/5734/standard?ival=60&marker=1422377400000!network"
			},
			{
				// is the server over the threshold?
				"isSet": false,
				// servers name
				"serverName": "www-server-3",
				// preformatted text pushed to chatrooms or in an email
				"labelHTML": "Server <strong>www-server-3</strong>'s avg cpu utilization is <strong style=\"color:#090\">22.5%</strong>",
				"labelText": "Server www-server-3's avg cpu utilization is 22.5%",
				// link back to premium for that metric at that point in time
				"link": "https://premium.boundary.com/home/5735/standard?ival=60&marker=1422377400000!network"
			},
			{
				// is the server over the threshold?
				"isSet": true,
				// servers name
				"serverName": "www-server-4",
				// preformatted text pushed to chatrooms or in an email
				"labelHTML": "Server <strong>www-server-4</strong>'s avg cpu utilization is <strong style=\"color:#090\">87.5%</strong>",
				"labelText": "Server www-server-4's avg cpu utilization is 87.5%",
				// link back to premium for that metric at that point in time
				"link": "https://premium.boundary.com/home/5736/standard?ival=60&marker=1422377400000!network"
			}
		],

		// formatted title of the alarm used in email
		"title": "avg cpu utilization is is greater than the threshold of 80.0%"
	}
};

function getMockReferenceAlarm() {
	return mockReferenceAlarm;
}

function getMockAlarm() {
	return mockAlarm;
}

module.exports = {
	getReferenceAlarm: getMockReferenceAlarm,
	getAlarm : getMockAlarm
};
