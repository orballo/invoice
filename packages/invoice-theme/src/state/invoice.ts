import Theme from "../../types";

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
    itemTotal: ({ state }) => (id) => {
      const item = state.invoice.concepts.items.find((item) => item.id === id);

      if (
        state.invoice.isValidNumber(item.quantity) &&
        state.invoice.isValidNumber(item.price)
      ) {
        const quantity = parseFloat(item.quantity);
        const price = parseFloat(item.price);
        const total = (quantity * price).toFixed(2);

        return total;
      }

      return "0";
    },
    totalTaxable: ({ state }) => {
      const itemTotals = state.invoice.concepts.items.map((item) =>
        parseFloat(state.invoice.concepts.itemTotal(item.id))
      );

      const total = itemTotals.reduce((final, current) => final + current);

      return total.toFixed(2);
    },
    totalIva: ({ state }) => {
      if (state.invoice.isValidNumber(state.invoice.concepts.iva)) {
        const total =
          parseFloat(state.invoice.concepts.totalTaxable) *
          (parseFloat(state.invoice.concepts.iva) / 100);

        return total.toFixed(2);
      }

      return "0";
    },
    totalIrpf: ({ state }) => {
      if (state.invoice.isValidNumber(state.invoice.concepts.irpf)) {
        const total = -(
          parseFloat(state.invoice.concepts.totalTaxable) *
          (parseFloat(state.invoice.concepts.irpf) / 100)
        );

        return total.toFixed(2);
      }

      return "0";
    },
    total: ({ state }) => {
      const { totalTaxable, totalIva, totalIrpf } = state.invoice.concepts;
      let total = parseFloat(totalTaxable);
      if (state.invoice.concepts.hasIva) total += parseFloat(totalIva);
      if (state.invoice.concepts.hasIrpf) total += parseFloat(totalIrpf);

      return total.toFixed(2);
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
  isValidNumber: () => (value) => {
    const numberRegex = /^\d+(?:\.\d{1,2})?$/;
    return numberRegex.test(value);
  },
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
