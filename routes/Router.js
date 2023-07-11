const { GetJob, AddJob } = require("../controllers/controls");

const express = require("express");
const Router = express.Router();
Router.route("/").get(GetJob).post(AddJob);

module.exports = Router;
