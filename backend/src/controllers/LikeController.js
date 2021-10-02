const Tweet = require("../models/Tweet");

module.exports = {
  async store(req, res) {
    const tweet = await Tweet.findById(req.params.id);
    // if (!tweet) return res.status(400).json({ message: "Tweet not found!" });
    tweet.set({ likes: tweet.likes + 1 });
    await tweet.save();

    req.io.emit("like", tweet); // Emit event in socket.io

    return res.json(tweet);
  },
};
