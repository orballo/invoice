import React from "react";
import { connect, useConnect, css, Global, loadable } from "frontity";
import Head from "./head";
import Fonts from "./fonts";
import Header from "./header";
import Form from "./form";
import Preview from "./preview";
import Download from "./download";
import Footer from "./footer";
import Loading from "./loading";
import { Packages } from "../../types";

const Pdf = loadable(() => import("./pdf"), {
  ssr: false,
});

const Viewer = loadable(() => import("./viewer"), {
  ssr: false,
});

const Root: React.FC = () => {
  const { state } = useConnect<Packages>();

  const global = css`
    html,
    body,
    #root {
      height: 100%;
    }

    body {
      margin: 0;
      color: ${state.theme.colors.two};
      background-color: ${state.theme.colors.one};
      font-family: "Prompt", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      ${!state.theme.isPreviewHidden && "overflow: hidden;"}
    }

    a {
      color: ${state.theme.colors.one};
    }
  `;

  const main = css`
    height: 100%;
  `;

  const leftColumn = css`
    position: relative;
    max-width: 580px;
    margin: auto;

    @media (min-width: 1280px) {
      margin: 0;
      margin-left: calc((100vw - 640px - 580px - (24px * 2)) / 2);
    }
  `;

  const rightColumn = css`
    ${state.theme.isPreviewHidden && "display: none;"}
    background-color: ${state.theme.colors.one};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
    padding-top: 52px;
    width: 100%;
    justify-content: center;
    scrollbar-width: none;
    z-index: 50;
    overflow: scroll;

    &::-webkit-scrollbar {
      width: 0px;
    }

    @media (min-width: 1280px) {
      background: none;
      display: block;
      width: 680px;
      left: auto;
      right: calc((100vw - 640px - 580px - (24px * 2)) / 3);
    }
  `;

  const downloadWrapper = css`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 32px;
    padding: 64px 32px;
    height: 160px;

    @media (min-width: 580px) {
      height: auto;
      padding: 64px 32px 92px;
      grid-template-columns: 1fr 1fr;
    }
  `;

  const loader = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  `;

  return (
    <>
      <Pdf />
      <Head />
      <Fonts />
      <Global styles={global} />
      <main css={main}>
        <div css={leftColumn}>
          <Header />
          <Form />
          <div css={downloadWrapper}>
            <Preview />
            <Download />
          </div>
          <Footer />
        </div>
        <div css={rightColumn}>
          <Loading css={loader} />
          <Viewer />
        </div>
      </main>
    </>
  );
};

export default connect(Root, { injectProps: false });
