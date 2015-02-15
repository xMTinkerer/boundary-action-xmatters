# Template for Boundary Actions

---

##Description

This project is a derivative of the [boundary-action-template](https://github.com/davidshaevel/boundary-action-template) project and is built to be used against [xMatters](www.xmatters.com). 

The test harness uses the [Nock](https://github.com/pgte/nock "Nock") library to mock HTTP requests to the xMatters REST Endpoint.

**app/xmatters.js**

> The xMatters Action implementation

**test/mockAlarm.js**

> Mock Boundary internal alarm objects

**test/xmatters-spec.js**

> Test harness that executes the Boundary Action

---

##Details

An Action implementation for Boundary Premium has the following characteristics:

1. Exposes a `run(action, alarm, alarmlog, cb)` function:

                module.exports = {
                        run : postmessage
                };

        **Parameters:**

        *action* - has a configuration property which contains the Action configuration
        settings that are exposed in the Boundary Premium UI.

        The xMatters Action configuration property, for example, contains the following
        settings:

        * REST_USER
        * REST_PASSWORD
        * XM_BASE_URL
        * XM_FORM_PATH

        Other Action implementations will use configuration settings that are specific to accessing that Action's endpoint.

        *alarm* - the Boundary Premium internal alarm object. Please refer to `test/mockAlarm.js`
        to see an example of all the properties in an alarm object.

        *alarmlog* - N/A

        *cb* - the callback function, which should have two parameters: *error*, *statistics*

2. Sends a request to the Action's endpoint.

        The xMatters Action, for example, makes an HTTP POST request to a REST Endpoint
        with the following request body:

                {
                    "properties": {
                        "entity_id": "CPU usage is high - www-server-1 (Alarm 40506)",
                        "entity_display_name": "CPU usage is high",
                        "message_type": "CRITICAL",
                        "monitoring_tool": "Boundary",
                        "state_message": "Server www-server-1's avg cpu utilization is 82.5%\n\nview dashboard - https://premium.boundary.com/home/5733/standard?ival=60&marker=1422377400000!network\n\nNOTE: CPU Utilization has exceeded 80% over a 60s duration"
                    },
                    "recipients": [{"targetName": "Group or User Name"}]
                }

3. Returns a statistics object as the the callback function's second parameter.

        The statistics object contains a count of the number of messages successfully sent to the Action's endpoint as well as a count of the number of the messages that resulted in an error when calling the Action's endoint.

        The xMatters statistics object, for example, is initialized as follows:

                var stats = {
                        xmatters_messages: 0,
                        xmatters_errors: 0
               };
               
---

##Usage

Install the development dependencies:

        npm install

Run Grunt, which executes the test harness:

        grunt

Test harness output:
    Running "mochaTest:test" (mochaTest) task
    
    
      xMatters
        Action
          ✓ should define a run() function.
          ✓ should return an error if there is no configuration. (52ms)
          ✓ should return an error if there is no REST User. (49ms)
          ✓ should increment the error stats count when the status code returned from calling xMatters is not a success code. (62ms)
          ✓ should have the correct statistics for an alarm with 4 servers, routing key is present, message type is High. (54ms)
          ✓ should have the correct statistics for an alarm with 4 servers, routing key is not present, message type is High. (51ms)
          ✓ should have the correct statistics for an alarm with 4 servers, routing key is present, message type is Medium. (53ms)
          ✓ should have the correct statistics for an alarm with 4 servers, routing key is not present, message type is Medium. (52ms)
          ✓ should have the correct statistics for an alarm with 4 servers, routing key is present, message type is Low. (53ms)
          ✓ should have the correct statistics for an alarm with 4 servers, routing key is not present, message type is Low. (53ms)
    
    
      10 passing (497ms)
    
    
    Done, without errors.


To view debug messages from the test, edit the following line in `test/xmatters-spec.js` and set the value to `true`:

        // Set this to true to see debug messages in the console output
    var consoleOutput = true;

Execute the test harness again:

        grunt

Test harness output with debug messages:

    Running "mochaTest:test" (mochaTest) task
    
    
      xMatters
        Action
          ✓ should define a run() function.
          ✓ should return an error if there is no configuration. (52ms)
          ✓ should return an error if there is no REST User. (51ms)
          ✓ should increment the error stats count when the status code returned from calling xMatters is not a success code. (62ms)
    
    url ==>https://company.dc.xmatters.com/reapi/2015-01-01/forms/062fb616-93f0-414d-b400-a8c5b28e88a7/triggers<==
    reqBody ==>{
      "properties": {
        "entity_id": "ALARM/40506/www-server-1/CPU usage is high",
        "entity_display_name": "CPU usage is high",
        "message_type": "High",
        "monitoring_tool": "Boundary",
        "state_message": "Server www-server-1's avg cpu utilization is 82.5%\n\nview dashboard - https://premium.boundary.com/home/5733/standard?ival=60&marker=1422377400000!network\n\nNOTE: CPU Utilization has exceeded 80% over a 60s duration"
      },
      "recipients": [
        {
          "targetName": "SMcNall Group"
        }
      ]
    }<==
    
    reqBody ==>{
      "properties": {
        "entity_id": "ALARM/40506/www-server-1/CPU usage is high",
        "entity_display_name": "CPU usage is high",
        "message_type": "High",
        "monitoring_tool": "Boundary",
        "state_message": "Server www-server-1's avg cpu utilization is 82.5%\n\nview dashboard - https://premium.boundary.com/home/5733/standard?ival=60&marker=1422377400000!network\n\nNOTE: CPU Utilization has exceeded 80% over a 60s duration"
      },
      "recipients": [
        {
          "targetName": "SMcNall Group"
        }
      ]
    }<==
    
    reqBody ==>{
      "properties": {
        "entity_id": "ALARM/40506/www-server-1/CPU usage is high",
        "entity_display_name": "CPU usage is high",
        "message_type": "High",
        "monitoring_tool": "Boundary",
        "state_message": "Server www-server-1's avg cpu utilization is 82.5%\n\nview dashboard - https://premium.boundary.com/home/5733/standard?ival=60&marker=1422377400000!network\n\nNOTE: CPU Utilization has exceeded 80% over a 60s duration"
      },
      "recipients": [
        {
          "targetName": "SMcNall Group"
        }
      ]
    }<==
    
    reqBody ==>{
      "properties": {
        "entity_id": "ALARM/40506/www-server-1/CPU usage is high",
        "entity_display_name": "CPU usage is high",
        "message_type": "High",
        "monitoring_tool": "Boundary",
        "state_message": "Server www-server-1's avg cpu utilization is 82.5%\n\nview dashboard - https://premium.boundary.com/home/5733/standard?ival=60&marker=1422377400000!network\n\nNOTE: CPU Utilization has exceeded 80% over a 60s duration"
      },
      "recipients": [
        {
          "targetName": "SMcNall Group"
        }
      ]
    }<==
    
    reqBody ==>{
      "properties": {
        "entity_id": "ALARM/40506/www-server-2/CPU usage is high",
        "entity_display_name": "CPU usage is high",
        "message_type": "High",
        "monitoring_tool": "Boundary",
        "state_message": "Server www-server-2's avg cpu utilization is 92.5%\n\nview dashboard - https://premium.boundary.com/home/5734/standard?ival=60&marker=1422377400000!network\n\nNOTE: CPU Utilization has exceeded 80% over a 60s duration"
      },
      "recipients": [
        {
          "targetName": "SMcNall Group"
        }
      ]
    }<==
    
    reqBody ==>{
      "properties": {
        "entity_id": "ALARM/40506/www-server-2/CPU usage is high",
        "entity_display_name": "CPU usage is high",
        "message_type": "High",
        "monitoring_tool": "Boundary",
        "state_message": "Server www-server-2's avg cpu utilization is 92.5%\n\nview dashboard - https://premium.boundary.com/home/5734/standard?ival=60&marker=1422377400000!network\n\nNOTE: CPU Utilization has exceeded 80% over a 60s duration"
      },
      "recipients": [
        {
          "targetName": "SMcNall Group"
        }
      ]
    }<==

        ...
        ...
        ...

---

