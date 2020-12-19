import React from "react";
import { css, connect, useConnect } from "frontity";
import Input from "./input";
import { Packages } from "../../../types";

type Props = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox: React.FC<Props> = ({ label, ...props }) => {
  const { state } = useConnect<Packages>();

  const labelStyles = css`
    position: relative;
    display: flex;
    align-items: center;
    height: 44px;
    padding-left: 40px;
    cursor: pointer;
    user-select: none;
    margin-right: 12px;
  `;

  const inputStyles = css`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked {
      & ~ span:after {
        display: block;
      }
    }
    &:disabled {
      & ~ span {
        border: 2px solid #ccc;
      }
    }
  `;

  const checkboxStyles = css`
    position: absolute;
    top: calc(50% - 15px);
    left: 0;
    height: 30px;
    width: 30px;
    border: 2px solid ${state.theme.colors.two};
    box-sizing: border-box;

    &:after {
      content: "";
      position: absolute;
      display: none;
      left: calc(50% - 3.5px);
      top: calc(50% - 8px);
      width: 5px;
      height: 10px;
      border: solid ${state.theme.colors.two};
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  `;

  return (
    <label css={labelStyles}>
      <input type="checkbox" css={inputStyles} aria-label={label} {...props} />
      <span css={checkboxStyles} />
      {label}
    </label>
  );
};

export default connect(Checkbox, { injectProps: false });
