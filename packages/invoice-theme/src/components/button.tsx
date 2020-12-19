import React from "react";
import { css, connect, useConnect } from "frontity";
import { Packages } from "../../types";

type Props = {
  label?: string;
  hideLabel?: boolean;
  icon?: React.ReactNode;
  align?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({
  label,
  hideLabel = false,
  icon,
  align = "right",
  ...props
}) => {
  const { state } = useConnect<Packages>();

  const button = css`
    background-color: ${state.theme.colors.one};
    height: 44px;
    font-size: 16px;
    font-family: inherit;
    border: 2px solid ${state.theme.colors.two};
    color: ${state.theme.colors.two};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;

    &:disabled {
      opacity: 0.3;
    }

    & > svg {
      ${label && !hideLabel && align === "right" && "margin-left: 8px;"}
      ${label && !hideLabel && align === "left" && "margin-right: 8px;"}
    }
  `;

  return (
    <button type="button" aria-label={label} css={button} {...props}>
      {align === "left" && icon}
      {!hideLabel && label}
      {align === "right" && icon}
    </button>
  );
};

export default connect(Button, { injectProps: false });
