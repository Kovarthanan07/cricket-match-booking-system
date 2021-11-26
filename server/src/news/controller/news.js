const News = require('../model/news');

const create_news = async (req, res) => {
  try {
    const news = new News({ ...req.body });
    await news.save();

    res.status(201).send(news);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const view_news = async (req, res) => {
  try {
    const news = await News.findById(req.params.news_id);
    if (!news) {
      throw new Error('Ticket not found...');
    }
    res.send(news);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update_News = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedKeys = ['title', 'body'];

  const isValidOperation = updates.every((update) => {
    return allowedKeys.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send({ message: 'invalid request' });
  }

  try {
    const news = await News.findById(req.params.news_id);
    if (!news) {
      res.status(404).send({ message: 'news not found' });
    }
    updates.forEach((update) => {
      news[update] = req.body[update];
    });

    await news.save();
    res.send(news);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const delete_news = async (req, res) => {
  try {
    const news = await News.deleteOne({ _id: req.params.news_id });
    res.send(news);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const view_all_news = async (req, res) => {
  try {
    const news = await News.find();
    res.send(news);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  create_news,
  view_news,
  update_News,
  delete_news,
  view_all_news,
};
