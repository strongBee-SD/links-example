const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;
    const existing = await Link.findOne({ from });
    if (existing) {
      return res.json({ link: "existing" });
    }
    const code = shortid.generate();
    const to = baseUrl + "/t/" + code;
    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: "Something wrong" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    // const currentUserId = req.user.userId.toString();
    // console.log("currentUserId", currentUserId);
    const links = await Link.find({ owner: req.user.userId });
    // const links = await Link.aggregate([
    //   { $match: { _id: ObjectId(currentUserId) } },
    // ]);
    // console.log("Link: ", Link);
    // console.log("req.user.userId: ", req.user.userId);
    // console.log("links: ", links);
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: "Something wrong" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: "Something wrong" });
  }
});

module.exports = router;
