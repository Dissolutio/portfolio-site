import React from "react";
import { Link } from "gatsby";

const PostListing = ({ post }) => (
  <li>
    <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
  </li>
);

export default PostListing;
