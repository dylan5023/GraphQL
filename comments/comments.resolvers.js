const commentsModel = require("./comments.model.js");

module.exports = {
  Query: {
    comments: () => {
      return commentsModel.getAllComments;
    },
    commentsByLikes: (_, args) => {
      return commentsModel.getCommentsByLikes(args.minLikes);
    },
  },
};
