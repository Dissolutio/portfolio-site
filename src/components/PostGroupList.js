import React from "react";
import PostListing from "./PostListing";

const PostGroupList = props => {
  // Sort posts if category name provided
  let { posts } = props;
  if (props.groupSortTitle) {
    posts = posts.filter(post => {
      return post.node.frontmatter.category === props.groupSortTitle;
    });
  }

  return (
    <div>
      <h2>{props.groupTitle}</h2>
      <ul>
        {posts.map(({ node }) => (
          <PostListing key={node.id} post={node}>
            {node.frontmatter.title}
          </PostListing>
        ))}
      </ul>
    </div>
  );
};
export default PostGroupList;
