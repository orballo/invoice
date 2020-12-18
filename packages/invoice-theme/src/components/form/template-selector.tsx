import React from "react";
import { css, connect, useConnect } from "frontity";
import { Packages } from "../../../types";

const TemplateSelector: React.FC = () => {
  const { state, actions } = useConnect<Packages>();

  const labelSelect = css`
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    position: relative;
    width: 100%;
    color: ${state.theme.colors.two};

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
      color: ${state.theme.colors.two};
      border-top: 2px solid ${state.theme.colors.two};
    }
  `;

  const select = css`
    margin-top: 8px;
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
  `;

  return (
    <label css={labelSelect}>
      <select
        name="template-design"
        aria-label="Seleccionar plantilla"
        css={select}
        onChange={actions.theme.handleSelectChange}
      >
        {state.invoice.template.designs.map((design) => (
          <option key={design.slug} value={design.slug}>
            {design.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default connect(TemplateSelector, { injectProps: false });
