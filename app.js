const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const gatewayRoutes = require('./src/routes/gatewayRoutes');
const { handle404, handleErrors } = require('./src/utils/errorHandlers');
const { connectToDB } = require('./dbConnection');

// Serve static files from the public directory
app.use(express.static('public'));

// Set up middleware
app.use(bodyParser.json());
app.use(cors());

// Set up routes
app.use('/api/gateways', gatewayRoutes);

// Handle 404 errors
app.use(handle404);

// Handle other errors
app.use(handleErrors);

// Connect to the database and start the server
connectToDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log('Failed to connect to database:', err));