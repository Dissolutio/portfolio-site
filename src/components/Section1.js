import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-awesome-styled-grid";

const Section1 = () => (
  <>
    <h2>
      Ipsum lorem dolor aliquam ante commodo
      <br />
      magna sed accumsan arcu neque.
    </h2>
    <p>
      Accumsan orci faucibus id eu lorem semper. Eu ac iaculis ac nunc nisi
      lorem vulputate lorem neque cubilia ac in adipiscing in curae lobortis
      tortor primis integer massa adipiscing id nisi accumsan pellentesque
      commodo blandit enim arcu non at amet id arcu magna. Accumsan orci
      faucibus id eu lorem semper nunc nisi lorem vulputate lorem neque cubilia.
    </p>
    <ActionButton>Learn More</ActionButton>
  </>
);
export default Section1;

const ActionButton = styled.button`
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  background-color: transparent;
  border-radius: 0.35em;
  border: solid 3px ${props => props.theme.color.primary};
  color: ${props => props.theme.color.black};
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  height: calc(2.75em + 6px);
  line-height: 2.75em;
  min-width: 10em;
  padding: 0 1.5em;
  text-align: center;
  white-space: nowrap;
  &:hover {
    border-color: #49bf9d;
    color: #49bf9d !important;
  }
`;
