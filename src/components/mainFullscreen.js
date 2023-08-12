import React from "react"

const MainFullscreen = ({ children, languageName }) => (
  <main
    className={["fullscreen", "language-" + languageName].join(" ")}
  >
    {children}
  </main>
)

export default MainFullscreen;