import React from "react"

const HomeBlock = ({
  style,
  title,
  subtitle,
  url,
  excerpt,
  readMore,
  imgSrc,
  imgAlt
}) => (
  <section className={["home_grid_" + style, "home_grid_section"].join(' ')}>
    <a className="home_card_image" href={url}>
      {imgSrc && <img src={imgSrc} alt={imgAlt} />}
      <h1>{title}</h1>
    </a>
    <p className="home_subtitle">{subtitle}</p>
    <div
      dangerouslySetInnerHTML={{ __html: excerpt }}
    />
    {readMore && <a href={url}>{readMore}</a>}
  </section>
)

export default HomeBlock