import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Image from "./image";
const Header = () => (
  <HeaderContainer>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <br />
    <Link to="/styled-components/">Go to styled-components example page</Link>
  </HeaderContainer>
);

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  background-color: #1f1815;
  // background-attachment: scroll, fixed;
  // background-image: url(http://localhost:8000/static/overlay-63337cc….png), url(http://localhost:8000/static/jason-leung-714414-unsplash-e8532a5….jpg);
  // background-position: top left, left;
  // background-repeat: repeat, no-repeat;
  // background-size: auto, auto 120%;
  color: rgba(255, 255, 255, 0.5);
  height: 100%;
  left: 0;
  // padding: 8em 4em;
  position: fixed;
  text-align: right;
  top: 0;
  width: 30%;
`;

export default Header;
