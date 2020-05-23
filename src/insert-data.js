const { Client } = require("@elastic/elasticsearch");
const fs = require("fs");
const { clusterUrl, apiKey, keyId } = require("./config");

const esClient = new Client({
  node: clusterUrl,
  auth: {
    apiKey: Buffer.from(keyId + ":" + apiKey).toString("base64"),
  },
});

async function main() {
  const reviewsStr = fs.readFileSync("src/data/reviews.json");
  const reviews = JSON.parse(reviewsStr);
  const body = reviews.flatMap((doc) => {
    delete doc._id;
    doc.date = new Date(doc.date);
    return [{ index: { _index: "reviews" } }, doc];
  });
  const { body: bulkResponse } = await esClient.bulk({ refresh: true, body });

  console.log(bulkResponse);
}

main().catch(console.error);
