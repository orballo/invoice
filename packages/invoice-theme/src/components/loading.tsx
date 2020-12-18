import React from "react";
import { connect, useConnect, keyframes, css } from "frontity";
import { Packages } from "../../types";

const Loading: React.FC<{ when?: boolean; className?: string }> = ({
  className,
}) => {
  const { state } = useConnect<Packages>();

  const scale = keyframes`
  0% {transform: scaley(1.0)}
  50% {transform: scaley(0.4)}
  100% {transform: scaley(1.0)}
`;

  const container = css`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    z-index: -1;
    padding-top: 20%;
  `;

  const bar = (index: number) => css`
    background-color: ${state.theme.colors.two};
    width: 6px;
    height: 24px;
    margin: 3px;
    border-radius: 0;
    display: inline-block;
    animation: ${scale} 1s ${index * 0.1}s infinite
      cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation-fill-mode: both;
    mix-blend-mode: difference;
  `;

  return (
    <div css={container} className={className}>
      <div>
        <div css={bar(1)} />
        <div css={bar(2)} />
        <div css={bar(3)} />
        <div css={bar(4)} />
        <div css={bar(5)} />
      </div>
    </div>
  );
};

export default connect(Loading, { injectProps: false });
