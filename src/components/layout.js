import React from "react"
import LayoutBase from "./layoutBase";

const Layout = props => (
  <LayoutBase
    {...props}
    languageName="en"
    publishedText="Published: "
    updatedText="Updated: "
  >
  </LayoutBase>
);

export default Layout;