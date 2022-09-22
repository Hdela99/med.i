// Import required packages
const path = require("path");
const express = require("express");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const session = require("express-session");
const helpers = require('./utils/helpers')

// Setting up sequelize & session storage
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Configuring session
const sess = {
  secret: process.env.SECRET || "temporary secret",
  cookie: {
    // Configures cookie max age to one hour
    maxAge: 3600000,
  },
  saveUninitialized: true,
  resave: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);


// Uncomment the following when DB is setup
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}!`);
  })
});
