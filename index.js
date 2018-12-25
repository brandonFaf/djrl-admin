const express = require("express");
let app = express();
var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listening on port 5000");
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
