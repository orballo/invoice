import Theme from "../../types";

const numberRegex = /^\d+(?:\.\d{1,2})?$/;

const invoice: Theme["state"]["invoice"] = {
  number: "",
  provider: {
    name: "",
    identifier: "",
    address: "",
    pc: "",
    city: "",
    country: "",
  },
  client: {
    name: "",
    identifier: "",
    address: "",
    pc: "",
    city: "",
    country: "",
  },
  dates: {
    issued: "",
    expires: "",
  },
  concepts: {
    iva: "21",
    irpf: "15",
    hasIva: false,
    hasIrpf: false,
    counter: 1,
    items: [
      {
        id: 1,
        concept: "",
        quantity: "",
        price: "",
      },
    ],
    itemTotal: ({ state }) => (key) => {
      if (
        state.invoice.isValidQuantity(key) &&
        state.invoice.isValidPrice(key)
      ) {
        const quantity = parseFloat(state.invoice.concepts.items[key].quantity);
        const price = parseFloat(state.invoice.concepts.items[key].price);
        const total = (quantity * price).toFixed(2);
        return total;
      }

      return "0";
    },
    taxable: ({ state }) => {
      const itemTotals = state.invoice.concepts.items.map((_, key) =>
        parseFloat(state.invoice.concepts.itemTotal(key))
      );

      if (itemTotals.every((total) => !!total)) {
        const taxable = itemTotals.reduce((final, current) => final + current);

        return taxable.toFixed(2);
      }

      return "0";
    },
    totalIva: ({ state }) => {
      if (
        !!state.invoice.concepts.taxable &&
        state.invoice.concepts.hasIva &&
        state.invoice.isValidIva
      ) {
        const totalIva =
          parseFloat(state.invoice.concepts.taxable) *
          (parseFloat(state.invoice.concepts.iva) / 100);

        return totalIva.toFixed(2);
      }

      return "0";
    },
    totalIrpf: ({ state }) => {
      if (
        !!state.invoice.concepts.taxable &&
        state.invoice.concepts.hasIrpf &&
        state.invoice.isValidIrpf
      ) {
        const totalIrpf = -(
          parseFloat(state.invoice.concepts.taxable) *
          (parseFloat(state.invoice.concepts.irpf) / 100)
        );

        return totalIrpf.toFixed(2);
      }

      return "0";
    },
    total: ({ state }) => {
      const { taxable, totalIva, totalIrpf } = state.invoice.concepts;
      if (!!taxable && !!totalIva && !!totalIrpf) {
        const total =
          parseFloat(taxable) + parseFloat(totalIva) + parseFloat(totalIrpf);

        return total.toFixed(2);
      }

      return "";
    },
  },
  payment: {
    methods: [
      { name: "Seleccionar forma de pago", slug: "none" },
      { name: "Transferencia bancaria", slug: "transfer" },
    ],
    selected: "none",
    transfer: {
      bank: "",
      iban: "",
      swift: "",
    },
  },
  notes: "",
  logo: {
    url: "",
    filename: "",
  },
  template: {
    designs: [
      { name: "Invoice Original", slug: "invoice-original" },
      { name: "Invoice Black", slug: "invoice-black" },
      { name: "Invoice Blue", slug: "invoice-blue" },
    ],
    selected: "invoice-original",
  },
  isValidQuantity: ({ state }) => (key) =>
    numberRegex.test(state.invoice.concepts.items[key].quantity),
  isValidPrice: ({ state }) => (key) =>
    numberRegex.test(state.invoice.concepts.items[key].price),
  isValidTotal: ({ state }) => (key) =>
    numberRegex.test(state.invoice.concepts.itemTotal(key)),
  isValidIva: ({ state }) => numberRegex.test(state.invoice.concepts.iva),
  isValidIrpf: ({ state }) => numberRegex.test(state.invoice.concepts.irpf),
  hasProvider: ({ state }) => {
    const fields = Object.values(state.invoice.provider);
    return fields.some((field) => !!field);
  },
  hasClient: ({ state }) => {
    const fields = Object.values(state.invoice.client);
    return fields.some((field) => !!field);
  },
  hasConcept: ({ state }) => {
    if (!state.invoice.concepts.items.length) return false;

    const fields = state.invoice.concepts.items
      .map((item) => {
        const newItem = { ...item };
        delete newItem.id;
        return newItem;
      })
      .reduce((final, current) => final.concat(Object.values(current)), []);

    return fields.some((field) => !!field);
  },
};

export default invoice;
