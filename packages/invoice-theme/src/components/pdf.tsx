import React from "react";
import { connect, useConnect } from "frontity";
import { pdf } from "@react-pdf/renderer";
import DefaultInvoice, { Colors } from "./invoices/default";
import { Packages } from "../../types";

const Pdf: React.FC = () => {
  const { state } = useConnect<Packages>();

  const colors: Colors | undefined = (() => {
    if (state.invoice.template.selected === "invoice-original") {
      return {
        bg: state.theme.colors.two,
        textOne: state.theme.colors.two,
        textTwo: state.theme.colors.one,
      };
    }

    if (state.invoice.template.selected === "invoice-black") {
      return {
        bg: "#333333",
        textOne: "#333333",
        textTwo: "#ffffff",
      };
    }

    if (state.invoice.template.selected === "invoice-blue") {
      return {
        bg: "#082846",
        textOne: "#082846",
        textTwo: "#D9EFF3",
      };
    }
  })();

  React.useEffect(() => {
    const generateUrl = async () => {
      const blob = await pdf(
        <DefaultInvoice invoice={state.invoice as any} colors={colors} />
      ).toBlob();

      const url = URL.createObjectURL(blob);

      state.pdf.url = url;
    };

    generateUrl();
  }, [JSON.stringify(state.invoice)]);

  return null;
};

export default connect(Pdf, { injectProps: false });
