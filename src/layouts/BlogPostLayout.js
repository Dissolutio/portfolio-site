import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import get from "lodash/get";

import Header from "./Header";

class Template extends React.Component {
  render() {
    const { location, children, data } = this.props;
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const siteDescription = get(
      this,
      "props.data.site.siteMetadata.description"
    );
    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: "en" }}
          meta={[{ name: "description", content: siteDescription }]}
          title={siteTitle}
        />
        <Header data={data} location={location} />
        <MainPageWrap>{children}</MainPageWrap>
      </div>
    );
  }
}

const MainPageWrap = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0px 1.0875rem 1.45rem;
`;
export default Template;
