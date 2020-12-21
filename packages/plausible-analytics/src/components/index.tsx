import React from "react";
import { connect, useConnect, Head, warn } from "frontity";
import Plausible from "../../types";

const Root: React.FC = () => {
  const { state } = useConnect<Plausible>();

  React.useEffect(() => {
    if (state.plausible.domain) {
      (window as any).plausible =
        (window as any).plausible ||
        function () {
          ((window as any).plausible.q =
            (window as any).plausible.q || []).push(arguments);
        };
    } else {
      warn(
        "Plausible analytics needs a domain defined in Frontity settings (state.plausible.domain) in order to work."
      );
    }
  }, []);

  return (
    !!state.plausible.domain && (
      <Head>
        <script
          async
          defer
          data-domain={state.plausible.domain}
          src={`https://${
            state.plausible.customDomain || "plausible.io"
          }/js/plausible.js`}
        />
      </Head>
    )
  );
};

export default connect(Root, { injectProps: false });
