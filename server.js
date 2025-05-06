if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const port = process.env.PORT || 3000;

// MongoDB connection
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


//const adminRoutes = require('./adminRoutes/drivers');

const routes = require('./src/routes/route');
app.use(express.json());
app.use('/', routes);

const swaggerDocs = YAML.load('./swagger.yaml');

swaggerDocs.servers = [
  {
    url: `http://localhost:${port}`, 
  },
];
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/', (req, res) => {
  console.log("Arxiki");
  res.send('Arxiki');
});

//app.use('/drivers', adminRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
