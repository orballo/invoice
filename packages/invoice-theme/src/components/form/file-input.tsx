import React from "react";
import { css, connect, useConnect } from "frontity";
import { Packages } from "../../../types";

type Props = {
  label?: string;
  filename?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FileInput: React.FC<Props> = ({ label, filename, ...props }) => {
  const { state } = useConnect<Packages>();

  const labelStyles = css`
    padding: 8px 120px 8px 12px;
    position: relative;
    display: flex;
    align-items: center;
    min-height: 44px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    background-color: ${state.theme.colors.two};
    color: ${state.theme.colors.one};
    cursor: pointer;
  `;

  const inputStyles = css`
    height: 44px;
    opacity: 0;
    position: absolute;
    cursor: pointer;
  `;

  const buttonStyles = css`
    display: flex;
    height: 100%;
    background-color: ${state.theme.colors.one};
    color: ${state.theme.colors.two};
    border: 2px solid ${state.theme.colors.two};
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    justify-content: center;
    align-items: center;
  `;

  return (
    <label css={labelStyles}>
      {filename || "Ningún archivo seleccionado..."}
      <input css={inputStyles} type="file" {...props} />
      <span css={buttonStyles}>{label || "Seleccionar"}</span>
    </label>
  );
};

export default connect(FileInput, { injectProps: false });
