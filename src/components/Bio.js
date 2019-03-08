import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import HeaderAvatar from "components/Header/HeaderAvatar";

const BioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  img {
    border-radius: 50%;
    flex: 1 2 4rem;
    max-width: 200px;
  }
  p {
    flex: 1 1 auto;
  }
  @media (max-width: 700px) {
    padding-right: 3rem;
    img {
      max-width: 150px;
    }
  }
`;

const Bio = () => {
  return (
    <BioContainer>
      <HeaderAvatar />
      <p>
        Written by <Link to="/about">John Moen</Link>, a web developer in
        Austin, Texas.{" "}
        <a href="https://github.com/Dissolutio">github.com/Dissolutio</a>
      </p>
    </BioContainer>
  );
};

export default Bio;
