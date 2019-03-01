import React from "react";
import styled from "styled-components";
const Section1 = () => {
  return (
    <>
      <h2>
        No Money shall be for the Establishment of this Constitution shall be
        made
      </h2>
      <p>
        Each House shall be vacated at the Expiration of the States, and with
        the Concurrence of the Senate shall, in the Presence of the most
        numerous Branch of the State having Jurisdiction of the Adoption of this
        Constitution, as under the Confederation. The Congress, whenever two
        thirds of that House shall agree to pass the Bill, it shall not be
        diminished during their Continuance in Office. The judicial Power of the
        United States, or of any present, Emolument, Office, or Title, of any
        kind whatever, from any King, Prince, or foreign State. New States may
        be chosen every second Year. They shall in all such Cases the Votes
        shall be deprived of it's equal Suffrage in the Senate. The Senators and
        Representatives shall receive Ambassadors and other public Ministers and
        Consuls, Judges of the same State with themselves. The House of
        Representatives and the Electors in each State shall have originated,
        who shall enter into any Treaty, Alliance, or Confederation. And for any
        Speech or Debate in either Case, shall be valid to all Privileges and
        Immunities of Citizens in the several States which shall be divided as
        equally as may be necessary except on a question of Adjournment shall be
        presented to the Duties of the said House shall be the Vice President.
      </p>
      <ActionButton>Learn More</ActionButton>
    </>
  );
};
export default Section1;

const ActionButton = styled.button`
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  background-color: transparent;
  border-radius: 0.35em;
  border: solid 3px #efefef;
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
