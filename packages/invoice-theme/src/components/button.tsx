import React from "react";
import { css, connect } from "frontity";

const Button: React.FC<
  {
    label?: string;
    icon?: React.ReactNode;
    color?: string;
    align?: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ label, icon, color = "#FFF", align = "right", ...props }) => {
  const button = css`
    background-color: ${color};
    height: 44px;
    font-size: 16px;
    font-family: inherit;
    border: 2px solid #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;

    & > svg {
      ${label && align === "right" && "margin-left: 8px;"}
      ${label && align === "left" && "margin-right: 8px;"}
    }
  `;

  return (
    <button css={button} {...props}>
      {align === "left" && icon}
      {label}
      {align === "right" && icon}
    </button>
  );
};

export default connect(Button, { injectProps: false });
