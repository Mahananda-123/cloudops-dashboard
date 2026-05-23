const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.get("/jenkins-build", async (req, res) => {

  try {

    const response = await axios.get(
      "http://15.207.217.2:8080/job/DevOps-Monitoring-Pipeline/lastBuild/api/json",
      {
        auth: {
          username: "Mahananda",
          password: "118897c6071f837f6df50e483508601818",
        },
      }
    );

    res.json(response.data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch Jenkins build",
    });

  }

});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});