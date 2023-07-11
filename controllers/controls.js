const Job = require("../Model/Jobs");

const GetJob = async (req, res) => {
  try {
    const job = await Job.find();
    res.status(200).json(job);
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

const AddJob = async (req, res) => {
  try {
    const data = await Job.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error });
  }
};

module.exports = { GetJob, AddJob };
