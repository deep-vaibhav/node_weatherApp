const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "You must provide a location!",
    });
  }

  geocode(req.query.location, (error, { long, lat, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(long, lat, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({ forecastData, location });
    });
  });

  // res.send({
  //   forecast: "Sunny",
  //   location: req.query.location,
  // });
});

app.get("/help", (req, res) => {
  res.render("help");
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
