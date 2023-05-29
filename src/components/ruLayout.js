import React from "react"
import LayoutBase from "./layoutBase";

const Layout = props => (
  <LayoutBase
    {...props}
    languageName="ru"
    titleEnding=" - N"
    publishedText="Опубликовано: "
    updatedText="Последние правки: "
  >
  </LayoutBase>
);

export default Layout;