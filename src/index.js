import "dotenv/config";
import "@babel/polyfill"
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";

import models, { sequelize } from "./models";
import routes from "./routes";

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models
  };
  next();
});

// Routes

app.use("/contacts", routes.contact);
app.use("/numbers", routes.number);

// Start

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createContactWithNumbers();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});

const createContactWithNumbers = async () => {
  await models.Contact.create(
    {
      firstname: "awab",
      lastname: "abdoun",
      numbers: [
        {
          number: "0920680519"
        }
      ]
    },
    {
      include: [models.Number]
    }
  );

  await models.Contact.create(
    {
      firstname: "asdsad",
      lastname: "abdousadsadn",
      numbers: [
        {
          number: "0920406168"
        },
        {
          number: "0964501064"
        }
      ]
    },
    {
      include: [models.Number]
    }
  );
};

module.exports = app;
