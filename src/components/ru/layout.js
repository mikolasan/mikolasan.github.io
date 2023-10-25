import React from "react"
import LayoutBase from "../layoutBase";
import "./language-ru.css"

const Layout = props => (
  <LayoutBase
    {...props}
    languageName="ru"
    publishedText="Опубликовано: "
    updatedText="Последние правки: "
  >
  </LayoutBase>
);

export default Layout;