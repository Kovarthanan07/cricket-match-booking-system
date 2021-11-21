const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongoDB connected successfully');
  })
  .catch((e) => {
    console.log({
      message: 'something wrong connecting database server',
      error: e,
    });
  });
