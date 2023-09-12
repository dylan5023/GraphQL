const postsModel = require("./posts.model.js");
module.exports = {
  Query: {
    posts: () => {
      return postsModel.getAllPosts();
    },
    post: (_, args) => {
      return postsModel.getPostById(args.id);
    },
  },
};
