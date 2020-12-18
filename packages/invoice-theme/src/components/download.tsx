import React from "react";
import { css, connect, useConnect } from "frontity";
import DownloadIcon from "./icons/download";
import { Packages } from "../../types";

const Download: React.FC = () => {
  const { state } = useConnect<Packages>();

  const anchor = css`
    color: ${state.theme.colors.two};
    background-color: ${state.theme.colors.three};
    height: 64px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: inherit;
    border: 2px solid ${state.theme.colors.two};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    @media (min-width: 1280px) {
      grid-column: 2 / 3;
    }
  `;

  const icon = css`
    margin-left: 8px;
  `;

  return (
    !!state.pdf.url && (
      <a
        css={anchor}
        href={state.pdf.url}
        download={`${state.invoice.provider.name} - Factura #${state.invoice.number}.pdf`}
      >
        Descargar PDF <DownloadIcon css={icon} />
      </a>
    )
  );
};

export default connect(Download, { injectProps: false });
