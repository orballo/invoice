import React from "react";
import { css, connect, useConnect } from "frontity";
import Button from "./button";
import PreviewIcon from "./icons/preview";
import { Packages } from "../../types";

const Preview: React.FC = () => {
  const { state, actions } = useConnect<Packages>();

  const button = css`
    background-color: ${state.theme.colors.one};
    border: 2px solid ${state.theme.colors.two};
    color: ${state.theme.colors.two};
    height: 64px;

    @media (min-width: 1280px) {
      display: none;
    }
  `;

  return (
    <Button
      css={button}
      label="Previsualizar"
      icon={<PreviewIcon />}
      onClick={
        state.theme.isPreviewHidden
          ? actions.theme.showPreview
          : actions.theme.hidePreview
      }
    />
  );
};

export default connect(Preview, { injectProps: false });
