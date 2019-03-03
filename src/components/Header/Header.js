import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import HeaderAvatar from "./HeaderAvatar";
import MainNav from "./MainNav";

const Header = ({ data }) => (
  <HeaderContainer>
    <HeaderContent>
      <HeaderAvatar fluid={data.profilePic.childImageSharp.fluid} />
      <h1>John Moen</h1>
      <h2>Frontend Developer</h2>
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
  height: 100%;
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
  text-align: right;
  padding: 2rem;
  color: ${props => props.theme.color.white};
  height: 100%;
  background-color: rgba(47, 47, 47, 0.5);
`;
const HeroBackgroundDiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;
const HeroBackgroundImg = styled(Img)`
  width: 100%;
  height: 100%;
`;

export default Header;
