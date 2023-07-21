const { app } = require("./app/index");
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
})
