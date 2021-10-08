import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import BlogPreview from "../components/blogPreview"
import * as styles from "../templates/blogListTemplate.module.css"

const Index = ({ data, pageContext }) => (
  <Layout
    title="Developer, traveler, snob"
    section="root"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru"
    buttonText="Projects"
    buttonLink="/projects"
    secondButtonText="Blog"
    secondButtonLink="/blog"
    bannerParagraph={[
      <h1>👋 Hi</h1>,
      <p>I'm Nikolay. Game developer, slot mathematician, DIY engineer 🎲 Creating apps with C++, Python, JavaScript, Kotlin</p>
    ]}
    recentArticles={pageContext.recentArticles}
  >
    {pageContext.recentArticles && '1' || '2'}
    <ul>
      <li>I’m interested in game development, DIY electronics, and artificial intelligence</li>
      <li>I’m currently learning Kotlin, revamping data structures and algorithms in GDScript, and basics of electronics</li>
      <li>I’m looking to collaborate on projects related to robots, games and procedural generation</li>
      <li>You can reach me on Twitter @mikolasan where once a week I write threads about gamedev and development process</li>
      <li>Enjoy coding today!</li>
    </ul>
    <p>
      > <a href="https://github.com/mikolasan">My github profile</a>
    </p>

    <h2>New blog posts</h2>
    <div className={styles.blogcards}>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <BlogPreview
          key={node.id} 
          path={node.frontmatter.path}
          title={node.frontmatter.title}
          text={node.excerpt}
          date={new Date(Date.parse(node.frontmatter.date)).toLocaleDateString("en-US", { dateStyle: "full" })}
          readMore="Read more..."
        />
      ))}
    </div>
    <h2>Featured projects</h2>
    <div className="ideacards">
      <div className="ideacard">
        <a href="/projects/imperial-russia">
          <img src="/images/projects/imperial-russia.jpg" alt="Russian village" />
        </a>
        <div className="idea-card-container">
          <h3>Imperial Russia</h3>
          <p>Historic unit converter</p>
          <p><a href="/projects/imperial-russia">Read more</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/gamedev/overload-godot">
          <img src="/images/projects/overload-godot.jpg" alt="" />
        </a>
        <div className="idea-card-container">
          <h3>Overload 2</h3>
          <p> (Godot 3.1)</p>
          <p><a href="/gamedev/overload-godot">Read more</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/gamedev/pyroguelike">
          <img src="/images/projects/not-your-fathers-roguelike.jpg" alt="Pixel art level"/>
        </a>
        <div className="idea-card-container">
          <h3><b>Roguelike</b></h3>
          <p>Not Your Father's Roguelike. (PyGame)</p>
          <p><a href="/gamedev/pyroguelike">Read more</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/board-games">
          <img src="/images/projects/board-game.jpg" alt="Prototype playthrough"/>
        </a>
        <div className="idea-card-container">
          <h3>Board game</h3>
          <p>TODO: description is missing</p>
          <p><a href="/board-games">Read more</a></p>
        </div>
      </div>

      <div className="ideacard">
        <a href="/youtube">
          <img src="/images/projects/youtube.jpg" alt="YouTube channel art" />
        </a>
        <div className="idea-card-container">
          <h3>YouTube channel</h3>
          <p>TODO: description is missing</p>
          <p><a href="/youtube">Read more</a></p>
        </div>
      </div>

    </div>
  </Layout>
)

export default Index

export const lastBlogPostsQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2,
      sort: { order: DESC, fields: [frontmatter___date]},
      filter: { frontmatter: { path: { regex: "/^\/blog*/" }}}
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            date
          }
          excerpt
        }
      }
    }
  }
`
