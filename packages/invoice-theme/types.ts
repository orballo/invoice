import React from "react";
import {
  Package,
  Action,
  Derived,
  Frontity,
  MergePackages,
} from "frontity/types";

export default interface Theme extends Package {
  name: "invoice-theme";
  roots: {
    theme: React.FC;
  };
  state: {
    theme: {
      colors: Colors;
      isPreviewHidden: boolean;
    };
    invoice: {
      number: string;
      dates: Dates;
      provider: Info;
      client: Info;
      concepts: Concepts;
      payment: Payment;
      notes: string;
      logo: Logo;
      template: Template;
      isValidNumber: Derived<Packages, string, boolean>;
      hasProvider: Derived<Packages, boolean>;
      hasClient: Derived<Packages, boolean>;
      hasConcept: Derived<Packages, boolean>;
    };
    pdf: {
      url: string;
    };
  };
  actions: {
    theme: {
      handleChange: Action<
        Packages,
        React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      >;
      handleConceptChange: Action<
        Packages,
        React.ChangeEvent<HTMLInputElement>
      >;
      handleCheckboxChange: Action<
        Packages,
        React.ChangeEvent<HTMLInputElement>
      >;
      handleSelectChange: Action<
        Packages,
        React.ChangeEvent<HTMLSelectElement>
      >;
      handleFileChange: Action<Packages, React.ChangeEvent<HTMLInputElement>>;
      addConcept: Action<Packages, React.MouseEvent<HTMLButtonElement>>;
      deleteConcept: Action<
        Packages,
        React.MouseEvent<HTMLButtonElement>,
        number
      >;
      showPreview: Action<Packages, React.MouseEvent<HTMLButtonElement>>;
      hidePreview: Action<Packages, React.MouseEvent<HTMLButtonElement>>;
    };
    invoice: {
      afterCSR: Action<Packages>;
      fake: Action<Packages>;
    };
  };
}

export type Packages = MergePackages<Theme, Frontity>;

export interface Colors {
  one: string;
  two: string;
  three: string;
  four: string;
}

export interface Info {
  name: string;
  address: string;
  pc: string;
  city: string;
  country: string;
  identifier: string;
}

export interface Dates {
  issued: string;
  expires: string;
}

export interface Concepts {
  counter: number;
  items: Item[];
  itemTotal: Derived<Packages, number, string>;
  totalTaxable: Derived<Packages, string>;
  totalIva: Derived<Packages, string>;
  totalIrpf: Derived<Packages, string>;
  total: Derived<Packages, string>;
  iva: string;
  irpf: string;
  hasIva: boolean;
  hasIrpf: boolean;
}

export interface Item {
  id: number;
  concept: string;
  quantity: string;
  price: string;
}

export interface Payment {
  methods: PaymentMethod[];
  selected: string;
  transfer: Transfer;
}

export interface PaymentMethod {
  name: string;
  slug: string;
}

export interface Transfer {
  bank: string;
  iban: string;
  swift: string;
}

export interface Logo {
  url: string;
  filename: string;
}

export interface Template {
  designs: TemplateDesign[];
  selected: string;
}

export interface TemplateDesign {
  name: string;
  slug: string;
}
