const app = require('./server');

const port = 8080;

app.listen(port, async () => {
  console.log(`Server running on port: ${port}`);
});
