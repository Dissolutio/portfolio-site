import React from "react";
import Link from "gatsby-link";

const PostListing = ({ post }) => (
  <li>
    <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
  </li>
);

export default PostListing;
