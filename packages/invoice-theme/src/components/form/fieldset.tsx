import React from "react";
import { css, connect } from "frontity";

type Props = {
  legend?: string;
  layout?: "full" | "half" | "two-thirds" | "method";
};

const Fieldset: React.FC<Props> = ({ legend, layout = "full", children }) => {
  const legendSyles = css`
    text-transform: uppercase;
    font-weight: bolder;
    font-size: 2rem;
    padding: 0;
    margin-top: 24px;

    &:first-of-type {
      margin-top: 0;
    }
  `;

  const halfFieldsetStyles = css`
    @media (min-width: 580px) {
      grid-template-columns: 1fr 1fr;
    }
  `;

  const twoThirdsFieldsetStyles = css`
    @media (min-width: 580px) {
      grid-template-columns: 1fr 0.5fr;
    }
  `;

  const methodFieldsetStyles = css`
    & > label:nth-of-type(-n + 3) {
      grid-column: 1 / 2;
    }

    @media (min-width: 580px) {
      grid-template-columns: 1fr 0.5fr;
    }
  `;

  const fieldsetStyles = css`
    border: none;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
    grid-column-gap: 24px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    ${layout === "half" && halfFieldsetStyles}
    ${layout === "two-thirds" && twoThirdsFieldsetStyles}
    ${layout === "method" && methodFieldsetStyles}
  `;

  return (
    <>
      {legend && <legend css={legendSyles}>{legend}</legend>}
      <fieldset css={fieldsetStyles}>{children}</fieldset>
    </>
  );
};

export default connect(Fieldset, { injectProps: false });
