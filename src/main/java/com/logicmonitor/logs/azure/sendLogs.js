const { EventHubProducerClient } = require("@azure/event-hubs");

const connectionString = "Endpoint=sb://lm-logs-qauat03-centralindia.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SgVhQymvZfd6j4sZjue2V3xY98mClMJ1aIkKnAAw2bg=";
const eventHubName = "log-hub";

async function main() {

  // Create a producer client to send messages to the event hub.
  const producer = new EventHubProducerClient(connectionString, eventHubName);

  // Prepare a batch of three events.
  const batch = await producer.createBatch();
  batch.tryAdd({ body: {"records":[{"correlationId":"b86daa66-0a45-495b-89cc-45941475ff10","eventDataId":"2f9bb39a-09cd-4d97-86f4-18924f6cff43","resourceId":"/subscriptions/318382e3-a165-4f0d-8906-01fb4cd06b74/resourceGroups/lm-logs-lmparagfulzele-eastus-group/providers/Microsoft.Batch/batchAccounts/paragfbatchaccount","operationName":"Microsoft.Advisor/recommendations/available/action","resultType":"Active","location":"eastus","level":"Informational","category":"Recommendation","operationVersion":"2017-03-31","resultSignature":"Succeeded","resultDescription":"A new recommendation is available.","durationMs":10,"callerIpAddress":"0.0.0.0","identity":{"claims":{"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress":"Microsoft.Advisor"}}}]}});
 // batch.tryAdd({ body: {"records":[{"msg": "Generating example log message 31687", "_lm.resourceId":{"system.azure.resourceid": "/subscriptions/318382e3-a165-4f0d-8906-01fb4cd06b74/resourceGroups/lm-logs-lmpoojachoudhary-us/providers/Microsoft.Web/sites/lm-logs-lmpoojachoudhary-eastus"}}]} });
  //batch.tryAdd({ body: "Third event" });

  // Send the batch to the event hub.
  await producer.sendBatch(batch);

  // Close the producer client.
  await producer.close();

  console.log("A batch of one event have been sent to the event hub");
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});