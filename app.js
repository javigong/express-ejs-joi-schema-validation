const express = require("express");
const schemas = require("./schemas");
const { order, color } = schemas;
const validators = require("./validator");
const app = express();

// Set up server port 8080 and console.log listening port
const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening port ${process.env.PORT || 8080}`);
});

// Set static server on public to easily localize style.css
app.use(express.static("public"));

// Set EJS view engine to render templates for home page, error and success pages
app.set("view engine", "ejs");

// Use express.urlencoded middleware function to parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Write route handler for GET on'/', and render index.ejs passing color data (from change color form)
app.get("/", validators(color, "query"), (req, res) => {
  const { value } = color.validate(req.query, {
    abortEarly: false,
  });
  res.render("index", { color: value });
});

// Parse req.body (where form data is stored)
// Write route handler to process requests from form at "/orders", and Render success.ejs passing rew.body data
app.post("/orders", validators(order, "body"), (req, res) => {
  const { value } = order.validate(req.body, {
    abortEarly: false,
  });
  // Don't render Rewards ID number when success
  delete value.rewardsId;
  res.render("success", { order: value });
});
