import React from "react";
import { connect, useConnect, Head as FrontityHead } from "frontity";
import Favicon from "../../../../assets/favicon.png";
import { Packages } from "../../types";
import logo from "../../../../assets/logo-meta.png";

const Head: React.FC = () => {
  const { state } = useConnect<Packages>();

  return (
    <FrontityHead>
      <html lang="es" />

      {/* Primary */}
      <title>{state.frontity.title}</title>
      <meta name="title" content={state.frontity.title} />
      <meta name="description" content={state.frontity.description} />
      <link rel="canonical" href={state.frontity.url} />

      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={state.frontity.url} />
      <meta property="og:title" content={state.frontity.title} />
      <meta property="og:description" content={state.frontity.description} />
      <meta property="og:image" content={logo} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={state.frontity.url} />
      <meta property="twitter:title" content={state.frontity.title} />
      <meta
        property="twitter:description"
        content={state.frontity.description}
      />
      <meta property="twitter:image" content={logo} />

      {/* Icons */}
      <link rel="icon" type="image/png" href={Favicon} />
    </FrontityHead>
  );
};

export default connect(Head, { injectProps: false });
