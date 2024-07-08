const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const GRAPHQL_ENDPOINT = "https://www.sandbox9.1sb.pp.ua/graphql/1/listing";

fetch(GRAPHQL_ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Basic " + Buffer.from("user:ovietiiwai4Ooyi").toString("base64"),
  },
  body: JSON.stringify({
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    const filteredData = result.data.__schema.types.filter(
      (type) => type.possibleTypes !== null
    );
    result.data.__schema.types = filteredData;
    fs.writeFileSync(
      path.join(__dirname, "../fragmentTypes.json"),
      JSON.stringify(result.data, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing fragmentTypes file", err);
        } else {
          console.log("Fragment types successfully extracted!");
        }
      }
    );
  })
  .catch((error) => {
    console.error("Error fetching fragment types:", error);
  });
