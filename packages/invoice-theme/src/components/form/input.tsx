import React from "react";
import { css, connect, useConnect } from "frontity";
import { Packages } from "../../../types";

type Props = {
  label: string;
  align?: "left" | "right" | "center";
  layout?: "column" | "row-reverse";
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({
  label,
  align = "left",
  layout = "column",
  ...props
}) => {
  const { state } = useConnect<Packages>();

  const rowReverseLabelStyles = css`
    flex-direction: row-reverse;
    align-items: center;

    input {
      margin-right: 8px;
    }
  `;

  const labelStyles = css`
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    ${layout === "row-reverse" && rowReverseLabelStyles}
  `;

  const inputStyles = css`
    font-family: inherit;
    height: 44px;
    font-size: 1rem;
    border: none;
    background-color: ${state.theme.colors.two};
    color: ${state.theme.colors.one};
    padding: 0 12px;
    margin: 0;
    margin-top: 8px;
    box-sizing: border-box;
    outline: none;
    width: 100%;
    text-align: ${align};

    &::placeholder {
      color: ${state.theme.colors.three};
      opacity: 0.5;
    }
  `;

  return (
    <label css={labelStyles}>
      {label}
      <input css={inputStyles} aria-label={label} {...props} />
    </label>
  );
};

export default connect(Input, { injectProps: false });
