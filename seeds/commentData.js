const { Comment } = require("../models");

const commentData = [
  {
    comment: "this medication gave me gas",
    user_id: 1,
    medication_id: 2
  },
  {
    comment:
      "When I took this it helped a lot with my hypertension. Just becareful and make sure you don't take it on an empty stomach.",
    user_id: 1,
    medication_id: 2
  },
  {
    comment: "the generic version is just as good as the name brand version",
    user_id: 1,
    medication_id: 2
  },
  {
    comment:
      "this ricky wrecked my healthy gut bacteria and I got ulcers as a result. 10/10 would not recommend.",
    user_id: 1,
    medication_id: 2
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
