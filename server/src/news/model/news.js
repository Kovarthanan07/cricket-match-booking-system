const mongoose = require('mongoose');

const news_schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    body: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model('News', news_schema);

module.exports = News;
