import React from "react";
import { connect, useConnect, Head as FrontityHead } from "frontity";
import Favicon from "../../../../assets/favicon.png";
import { Packages } from "../../types";

const Head: React.FC = () => {
  const { state } = useConnect<Packages>();

  return (
    <FrontityHead>
      <html lang="es" />
      <title>{state.frontity.title}</title>
      <meta name="description" content={state.frontity.description} />
      <link rel="canonical" href="https://invoice.orballo.dev" />
      <link rel="icon" type="image/png" href={Favicon} />
    </FrontityHead>
  );
};

export default connect(Head, { injectProps: false });
