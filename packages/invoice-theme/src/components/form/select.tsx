import React from "react";
import { css, connect, useConnect } from "frontity";
import { Packages } from "../../../types";

type Props = {
  label: string;
  hideLabel?: boolean;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<Props> = ({
  label,
  hideLabel = false,
  children,
  ...props
}) => {
  const { state } = useConnect<Packages>();

  const labelStyles = css`
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    position: relative;
    cursor: pointer;

    &:after {
      content: "‹";
      transform: rotate(-90deg);
      width: 44px;
      height: 44px;
      position: absolute;
      bottom: 8px;
      right: 0;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding-bottom: 3px;
      border-top: 2px solid ${state.theme.colors.two};
    }
  `;

  const selectStyles = css`
    height: 44px;
    border: 2px solid ${state.theme.colors.two};
    color: ${state.theme.colors.two};
    font-family: inherit;
    font-size: 1rem;
    padding: 0 50px 0 8px;
    margin-bottom: 8px;
    box-sizing: border-box;
    appearance: none;
    outline: none;
    z-index: 5;
    background: transparent;
    ${!hideLabel && "margin-top: 8px;"}
    cursor: pointer;
  `;

  return (
    <label css={labelStyles}>
      {!hideLabel && label}
      <select css={selectStyles} aria-label={label} {...props}>
        {children}
      </select>
    </label>
  );
};

export default connect(Select, { injectProps: false });
