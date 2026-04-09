const swaggerAutogen = require("swagger-autogen")()

console.log("[#] Generating swagger.json")

const isProduction = process.env.NODE_ENV === "production";

console.log("[#] isProduction: ", isProduction)

const doc = {
  info: {
    title: "T9 Store API",
    description: "T9 Store API"
  },
  host: isProduction 
    ? "js-cse341-teamproject.onrender.com"
    : "localhost:3080",
  schemes: isProduction ? ["https"] : ["http"]
};

console.log("[#] doc: ", doc)

const outputFile = "./swagger.json"
const endpointsFiles = ["./routes/index.js"]

swaggerAutogen(outputFile, endpointsFiles, doc)