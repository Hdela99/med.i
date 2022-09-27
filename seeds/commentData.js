const { Comment } = require("../models");

const commentData = [
  {
    comment: "this medication gave me gas",
    date_created: "2009-11-10",
  },
  {
    comment:
      "When I took this it helped a lot with my hypertension. Just becareful and make sure you don't take it on an empty stomach.",
    date_created: "2022-09-23",
  },
  {
    comment: "the generic version is just as good as the name brand version",
    date_created: "2022-09-23",
  },
  {
    comment:
      "this ricky wrecked my healthy gut bacteria and I got ulcers as a result. 10/10 would not recommend.",
    date_created: "2022-09-23",
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
