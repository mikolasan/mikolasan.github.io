import React from "react";
import { Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

const SectionCard = ({ children, className, image, altImageText, title, url }) => (
  <div className={`ideacard ${className}`}>
    {image && (
      <Link to={url}>
        <GatsbyImage
          image={getImage(image)}
          alt={altImageText}
          placeholder="blurred"
          layout="constrained"
          transformOptions={{
            cropFocus: "attention",
            fit: "cover",
          }}
          quality={60}
        />
      </Link>
    )}
    <div className="idea-card-container">
      <Link to={url}>
        <h3>{title}</h3>
      </Link>
      {children}
      {/* <p>
        <Link to={url}>Read more</Link>
      </p> */}
    </div>
  </div>
);

export default SectionCard;