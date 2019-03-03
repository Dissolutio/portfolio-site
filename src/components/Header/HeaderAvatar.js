import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { Link } from "gatsby";

const HeaderAvatar = ({ fluid }) => (
  <HomePageLinkAvatar to="/">
    <AvatarOverlay />
    <Img fluid={fluid} />
  </HomePageLinkAvatar>
);
const HomePageLinkAvatar = styled(Link)`
  position: relative;
  height: 100px;
  width: 100px;
  border: 0;
  outline: none;
  transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  text-decoration: none;
  margin: 0 0 1em 0;
  border: 0;
  display: inline-block;
  box-shadow: none;
  img {
    border-radius: 50%;
  }
`;
const AvatarOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(47, 47, 47, 0.2);
  border-radius: 50%;
  z-index: 10;
`;
export default HeaderAvatar;
