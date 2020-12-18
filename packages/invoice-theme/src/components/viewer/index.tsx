import React from "react";
import { css, connect, useConnect } from "frontity";
import Button from "../button";
import DeleteIcon from "../icons/delete";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { Packages } from "../../../types";

const Viewer: React.FC = () => {
  const { state, actions } = useConnect<Packages>();

  const wrapper = React.useRef<HTMLDivElement>();
  const [width, setWidth] = React.useState(336);
  const [rendered, setRendered] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        const large = window.matchMedia("(min-width: 1280px)");

        if (large.matches && !state.theme.isPreviewHidden)
          actions.theme.hidePreview(null);

        if (wrapper.current)
          setWidth(
            (wrapper.current.getBoundingClientRect().width < 680
              ? wrapper.current.getBoundingClientRect().width
              : 680) - (large.matches ? 64 : 24)
          );
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [rendered, state.theme.isPreviewHidden]);

  const close = css`
    position: fixed;
    right: 12px;
    top: 12px;
    width: 44px;

    @media (min-width: 1280px) {
      display: none;
    }
  `;

  const doc = css`
    padding-top: 16px;
  `;

  const page = css`
    margin: 24px auto 0;
    box-shadow: 0 0 10px 0 rgba(62, 62, 62, 0.3);
    width: ${width}px;

    @media (min-width: 480px) {
      margin-bottom: 128px;
    }
  `;

  return (
    !!state.pdf.url && (
      <>
        <Button
          css={close}
          type="button"
          icon={<DeleteIcon />}
          onClick={actions.theme.hidePreview}
        />
        <div ref={wrapper}>
          <Document
            css={doc}
            file={state.pdf.url}
            loading={null}
            onLoadSuccess={() => setRendered(true)}
          >
            <Page css={page} pageNumber={1} loading={null} width={width} />
          </Document>
        </div>
      </>
    )
  );
};

export default connect(Viewer, { injectProps: false });
