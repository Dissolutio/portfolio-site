import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Header from "components/Header/Header";
import urlString from "backgroundURL";

const StrataLayout = ({ data, children }) => (
  <LayoutWrapper bgUrl={urlString}>
    <Header data={data} />
    <Main>{children}</Main>
  </LayoutWrapper>
);
StrataLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default StrataLayout;

const LayoutWrapper = styled.div`
  background-color: ${props => props.theme.color.primary};
  position: absolute;
  padding: 1rem;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
`;
const Main = styled.div`
  margin-left: 31%;
  max-width: 70%;

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 2rem;
  }
`;
