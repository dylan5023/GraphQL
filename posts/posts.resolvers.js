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
  Mutation: {
    addNewPosts: (_, args) => {
      return postsModel.addNewPost(args.id, args.title, args.description);
    },
  },
};
