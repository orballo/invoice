import React from "react";
import { css, connect, useConnect } from "frontity";
import { Packages } from "../../../types";

type Props = {
  label?: string;
  hideLabel?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea: React.FC<Props> = ({ label, hideLabel = false, ...props }) => {
  const { state } = useConnect<Packages>();

  const labelStyles = css`
    display: flex;
    flex-direction: column;
    white-space: nowrap;
  `;

  const textareaStyles = css`
    font-family: inherit;
    height: 105px;
    font-size: 1rem;
    border: none;
    background-color: ${state.theme.colors.two};
    color: ${state.theme.colors.one};
    padding: 12px;
    box-sizing: border-box;
    outline: none;
    grid-column: 1 / 3;
    resize: none;
    ${!hideLabel && "margin-top: 8px;"}
  `;

  return (
    <label css={labelStyles}>
      {!hideLabel && label}
      <textarea css={textareaStyles} aria-label={label} {...props} />
    </label>
  );
};

export default connect(Textarea, { injectProps: false });
