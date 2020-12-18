import { Settings } from "frontity/types";

const settings: Settings = {
  name: "invoice-frontity",
  state: {
    frontity: {
      url: "https://invoice.orballo.dev",
      title: "Generador de facturas online - Invoice by Orballo",
      description:
        "Invoice es un generador de facturas online gratuito. Simplemente rellena el formulario, selecciona la plantilla deseada y descárgate el PDF.",
    },
  },
  packages: ["invoice-theme"],
};

export default settings;
