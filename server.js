import mongoose from 'mongoose';
import express from  'express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import appRouter from './src/routes/router.js';
import cors from "cors";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));



app.use(cors());
app.use(express.json());
app.use('/', appRouter);

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
