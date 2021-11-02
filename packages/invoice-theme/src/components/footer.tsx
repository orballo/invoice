import React from "react";
import { css, connect, useConnect } from "frontity";
import { Packages } from "../../types";

const Footer: React.FC = () => {
  const { state } = useConnect<Packages>();

  const footer = css`
    position: relative;
    padding: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    color: ${state.theme.colors.three};

    p {
      margin: 8px 0;

      & > span {
        background-color: ${state.theme.colors.two};

        & > span {
          color: #fff;
        }
      }
    }

    &:before {
      z-index: -1;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: calc(100vw - 15px);
      content: "";
      background-color: ${state.theme.colors.two};
      background-image: url("data:image/svg+xml,%3Csvg width='84' height='84' viewBox='0 0 84 84' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4bbb8' fill-opacity='0.09'%3E%3Cpath d='M84 23c-4.417 0-8-3.584-8-7.998V8h-7.002C64.58 8 61 4.42 61 0H23c0 4.417-3.584 8-7.998 8H8v7.002C8 19.42 4.42 23 0 23v38c4.417 0 8 3.584 8 7.998V76h7.002C19.42 76 23 79.58 23 84h38c0-4.417 3.584-8 7.998-8H76v-7.002C76 64.58 79.58 61 84 61V23zM59.05 83H43V66.95c5.054-.5 9-4.764 9-9.948V52h5.002c5.18 0 9.446-3.947 9.95-9H83v16.05c-5.054.5-9 4.764-9 9.948V74h-5.002c-5.18 0-9.446 3.947-9.95 9zm-34.1 0H41V66.95c-5.053-.502-9-4.768-9-9.948V52h-5.002c-5.184 0-9.447-3.946-9.95-9H1v16.05c5.053.502 9 4.768 9 9.948V74h5.002c5.184 0 9.447 3.946 9.95 9zm0-82H41v16.05c-5.054.5-9 4.764-9 9.948V32h-5.002c-5.18 0-9.446 3.947-9.95 9H1V24.95c5.054-.5 9-4.764 9-9.948V10h5.002c5.18 0 9.446-3.947 9.95-9zm34.1 0H43v16.05c5.053.502 9 4.768 9 9.948V32h5.002c5.184 0 9.447 3.946 9.95 9H83V24.95c-5.053-.502-9-4.768-9-9.948V10h-5.002c-5.184 0-9.447-3.946-9.95-9zM50 50v7.002C50 61.42 46.42 65 42 65c-4.417 0-8-3.584-8-7.998V50h-7.002C22.58 50 19 46.42 19 42c0-4.417 3.584-8 7.998-8H34v-7.002C34 22.58 37.58 19 42 19c4.417 0 8 3.584 8 7.998V34h7.002C61.42 34 65 37.58 65 42c0 4.417-3.584 8-7.998 8H50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

      @media (min-width: 580px) {
        left: calc((100vw - 580px) / -2);
      }

      @media (min-width: 1280px) {
        left: calc((100vw - 640px - 580px - (24px * 2)) / -2);
      }
    }
  `;

  return (
    <footer css={footer}>
      <p>
        <span>
          <span>Invoice</span> es un proyecto que he desarrollado en mi tiempo
          libre y lo he diseñado conforme a mis necesidades, pero siempre puedes
          escribirme a <a href="mailto:hi@orballo.dev">hi@orballo.dev</a> si
          quieres sugerir alguna mejora.
        </span>
      </p>
      <p>
        <span>
          También puedes echarle un ojo a{" "}
          <a href="https://orballo.dev">orballo.dev</a> si quieres saber más
          sobre lo que hago.
        </span>
      </p>
    </footer>
  );
};

export default connect(Footer, { injectProps: false });
