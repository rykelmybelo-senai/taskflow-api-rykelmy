const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./openapi");

const router = express.Router();

router.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(openapi, {
    customCssUrl: "https://unpkg.com/swagger-ui-dist@5/swagger-ui.css",
    customJs: [
      "https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js",
      "https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js",
    ],
  }),
);

module.exports = router;
