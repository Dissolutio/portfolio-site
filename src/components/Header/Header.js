import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { ProfilePic } from "./Avatar";
import MainNav from "./MainNav";

const Header = ({ data }) => (
  <HeaderContainer>
    <HeaderContent>
      <HeaderAvatar to="/">
        <ProfilePic />
      </HeaderAvatar>
      <h1>John Moen</h1>
      <h2>Frontend Developmer</h2>
      <ul className="icons">
        <li>
          <a href="https://github.com/Dissolutio" className="icon fa-github">
            <span className="label">Github</span>
          </a>
        </li>
      </ul>
      <MainNav />
    </HeaderContent>
    <HeroBackgroundDiv>
      <HeroBackgroundImg fluid={data.background.childImageSharp.fluid} />
    </HeroBackgroundDiv>
  </HeaderContainer>
);

const HeaderContent = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  font-size: 1rem;
  margin: 0 0 2rem 0;
  width: 100%;
  padding: 1rem;
  h1 {
    font-size: 1.6rem;
  }
  h2 {
    font-size: 1.4rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  text-align: right;
  padding: 2rem;
  color: #ffffff;
  height: 100%;
  z-index: 10;
  opacity: 0.9;
  background-color: #1f1815;
  background-attachment: scroll, fixed;
  background-image: url("images/overlay.png"),
    url("../images/jason-leung-714414-unsplash.jpg");
  background-position: top left, left;
  background-repeat: repeat, no-repeat;
  background-size: auto, auto 120%;
`;
const HeroBackgroundDiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`;
const HeroBackgroundImg = styled(Img)`
  width: 100%;
  height: 100%;
  opacity: 0.9;
`;

const HeaderAvatar = styled(Link)`
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
  img {
    border-radius: 50%;
  }
`;

export default Header;
