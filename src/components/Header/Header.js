import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { SquareFluidImage } from "./GatsbynautImage";
import MainNav from "./MainNav";

const Header = ({ data }) => (
  <HeaderWrapper>
    <HeaderContainer>
      <HeaderContent>
        <HeaderAvatar to="/">
          <SquareFluidImage />
        </HeaderAvatar>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <MainNav />
      </HeaderContent>
    </HeaderContainer>
    <HeroBackgroundDiv>
      <HeroBackgroundImg fluid={data.background.childImageSharp.fluid} />
    </HeroBackgroundDiv>
  </HeaderWrapper>
);

const HeaderContent = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  font-size: 1rem;
  margin: 0 0 2rem 0;
  width: 100%;
  padding: 1rem;
`;
const HeaderWrapper = styled.div`
  background-color: #1f1815;
  color: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 31%;
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
  opacity: 0.6;
`;

const HeaderAvatar = styled(Link)`
  img {
    border-radius: 50%;
  }
  height: 75px;
  width: 75px;
  border: 0;
  outline: none;
  transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  text-decoration: none;
  margin: 0 0 1em 0;
  border: 0;
  display: inline-block;
`;

export default Header;
