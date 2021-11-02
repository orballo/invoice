import React from "react";
import { css, connect, useConnect } from "frontity";
import useInView from "@frontity/hooks/use-in-view";
import DownloadIcon from "./icons/download";
import { Packages } from "../../types";

const Download: React.FC = () => {
  const { state, actions } = useConnect<Packages>();

  const handleClick = () => {
    if (actions.analytics.event) {
      actions.analytics.event({ name: "Download PDF", payload: null });
    }
  };

  const { ref, inView } = useInView({ rootMargin: "400px" });

  React.useEffect(() => {
    if (inView) actions.theme.loadPDF();
  }, [inView]);

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
    ${!state.pdf.url && "visibility: hidden;"}

    @media (min-width: 1280px) {
      grid-column: 2 / 3;
    }
  `;

  const icon = css`
    margin-left: 8px;
  `;

  return (
    <a
      ref={ref}
      css={anchor}
      href={state.pdf.url}
      download={`${state.invoice.provider.name} - Factura #${state.invoice.number}.pdf`}
      onClick={handleClick}
    >
      Descargar PDF <DownloadIcon css={icon} />
    </a>
  );
};

export default connect(Download, { injectProps: false });
