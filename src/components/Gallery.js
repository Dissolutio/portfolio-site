import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import styled from "styled-components";
import { chunk } from "lodash";

import Lightbox from "react-images";
import Image from "gatsby-dynamic-image";
import { Container, Row, Col } from "react-awesome-styled-grid";
import overlay from "assets/overlay.png";

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lightboxIsOpen: false,
      currentImage: 0
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToPrevious = this.goToPrevious.bind(this);
    this.goToImage = this.goToImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
  }
  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }
  goToPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }
  goToNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }
  goToImage(index) {
    this.setState({
      currentImage: index
    });
  }
  handleClickImage() {
    if (this.state.currentImage === this.props.imageNodes.length - 1) return;

    this.goToNext();
  }
  renderGallery() {
    const { imageNodes } = this.props;

    if (!imageNodes) return;

    const imageNodesByTwos = chunk(imageNodes, 2);

    const gallery = imageNodesByTwos.map(chunk => (
      <Row>
        {chunk.map((node, index) => {
          const { caption, publicURL, description, alt } = node;
          const url = node.childImageSharp.fluid.src || publicURL;
          return (
            <Col xs={4} md={4} lg={6} key={index}>
              <article>
                <FrameLink to={url} onClick={e => this.openLightbox(index, e)}>
                  <Image node={node} alt={alt} />
                </FrameLink>
                <h3>{caption}</h3>
                <p>{description}</p>
              </article>
            </Col>
          );
        })}
      </Row>
    ));

    return <Container>{gallery}</Container>;
  }
  render() {
    return (
      <div>
        {this.renderGallery()}
        <Lightbox
          currentImage={this.state.currentImage}
          images={this.props.imageNodes}
          isOpen={this.state.lightboxIsOpen}
          onClickImage={this.handleClickImage}
          onClickNext={this.goToNext}
          onClickPrev={this.goToPrevious}
          onClickThumbnail={this.goToImage}
          onClose={this.closeLightbox}
        />
      </div>
    );
  }
}

Gallery.displayName = "Gallery";
Gallery.propTypes = {
  imageNodes: PropTypes.array
};
const FrameLink = styled(Link)`
  display: block;
  text-align: center;
  border-radius: 0.35em;
  border: 0;
  position: relative;
  /* margin-top: 2rem; */
  box-shadow: none;
  :hover {
    opacity: 1;
  }
  img {
    border-radius: 0.35em;
    display: block;
    width: 100%;
  }
  /* an overlay on hover */
  ::before {
    border-radius: 0.35em;
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
  }
  :hover ::before {
    display: block;
    content: "";
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: url(${overlay});
    opacity: 1;
    z-index: 10;
  }
  :hover ::after {
    transition: opacity 0.2s ease-in-out;
    border-radius: 0.35em;
    border: solid 3px rgba(255, 255, 255, 0.5);
    color: #fff;
    content: "View";
    display: inline-block;
    font-size: 0.8em;
    font-weight: 400;
    left: 50%;
    line-height: 2.25em;
    margin: -1.25em 0 0 -3em;
    opacity: 1;
    padding: 0 1.5em;
    position: absolute;
    text-align: center;
    text-decoration: none;
    top: 50%;
    white-space: nowrap;
    z-index: 10;
  }
`;
export default Gallery;
