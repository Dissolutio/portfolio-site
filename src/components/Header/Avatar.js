const ProfilePic = () => (
  <StaticQuery
    query={graphql`
      fragment squareImage on File {
        childImageSharp {
          fluid(maxWidth: 200, maxHeight: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      query profilePic {
        file(relativePath: { eq: "profile-pic.jpg" }) {
          ...squareImage
        }
      }
    `}
    render={data => <Img fluid={data.file.childImageSharp.fluid} />}
  />
);
export { ProfilePic };
