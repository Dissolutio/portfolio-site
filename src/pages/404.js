import React from "react";

import StrataLayout from "layouts/StrataLayout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <StrataLayout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </StrataLayout>
);

export default NotFoundPage;
