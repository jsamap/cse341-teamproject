const swaggerAutogen = require("swagger-autogen")()

console.log("[#] Generating swagger.json")

const isProduction = process.env.NODE_ENV === "production";

console.log("[#] isProduction: ", isProduction)

const doc = {
  info: {
    title: "Products API",
    description: "Products API"
  },
  host: isProduction 
    ? "js-cse341-project2.onrender.com"
    : "localhost:3080",
  schemes: isProduction ? ["https"] : ["http"]
};

console.log("[#] doc: ", doc)

const outputFile = "./swagger.json"
const endpointsFiles = ["./routes/index.js"]

swaggerAutogen(outputFile, endpointsFiles, doc)