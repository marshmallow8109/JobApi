const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const Router = require("./routes/Router");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const rateLimit = require("express-rate-limit");
const connectDB = require("./ConnectDB/connect");
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use("/", Router);

//mailing route
app.post("/mail", (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "1click9ja@gmail.com",
      pass: "bmrcsvwsgzrjuelz",
    },
  });

  let mailOption = {
    from: req.body.email,
    to: `augustrush.ae@gmail.com`,
    subject: "Contact Portfolio",
    text: req.body.message,
  };

  transporter.sendMail(mailOption, function (err, data) {
    if (err) {
      res.status(500).send("something went wrong, try agian!");
    } else {
      res.status(200).send("Email sent!");
    }
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to db success!");
    app.listen(PORT, () => {
      console.log(`sever is up at Port ${PORT}...`);
    });
  } catch (error) {
    console.log(`could not connect error ${error}`);
  }
};

start();
