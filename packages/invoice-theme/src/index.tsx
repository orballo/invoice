import Root from "./components";
import Theme from "../types";

const numberRegex = /^\d+(?:\.\d{1,2})?$/;

let timeout: any;
let inputName: any;

const debounce = (action: Function, event: any) => {
  if (timeout && inputName === event.target.name) clearTimeout(timeout);

  inputName = event.target.name;
  timeout = setTimeout(() => {
    timeout = null;
    inputName = null;
    action();
  }, 600);
};

const invoiceTheme: Theme = {
  name: "invoice-theme",
  roots: {
    theme: Root,
  },
  state: {
    theme: {
      colors: {
        one: "#FFFFFF",
        two: "#342E37",
        three: "#C4BBB8",
        four: "#DD5577",
      },
      isPreviewHidden: true,
    },
    invoice: {
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
            const quantity = parseFloat(
              state.invoice.concepts.items[key].quantity
            );
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
            const taxable = itemTotals.reduce(
              (final, current) => final + current
            );

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
              parseFloat(taxable) +
              parseFloat(totalIva) +
              parseFloat(totalIrpf);

            return total.toFixed(2);
          }

          return "";
        },
        iva: "21",
        irpf: "15",
        hasIva: false,
        hasIrpf: false,
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
    },
    pdf: {},
  },
  actions: {
    theme: {
      handleChange: ({ state }) => {
        return (event) => {
          event.persist();

          const action = () => {
            const path = event.target.name.split("-");

            path.reduce((final, current, key) => {
              if (key === path.length - 1) final[current] = event.target.value;
              return final[current];
            }, state.invoice);
          };

          debounce(action, event);
        };
      },
      handleConceptChange({ state }) {
        return (event) => {
          event.persist();

          const action = () => {
            const [, key, field] = event.target.name.split("-");

            state.invoice.concepts.items[key][field] = event.target.value;
          };

          debounce(action, event);
        };
      },
      handleCheckboxChange({ state }) {
        return (event) => {
          if (event.target.name === "concepts-has-iva")
            state.invoice.concepts.hasIva = event.target.checked;
          if (event.target.name === "concepts-has-irpf")
            state.invoice.concepts.hasIrpf = event.target.checked;
        };
      },
      handleSelectChange({ state }) {
        return (event) => {
          event.persist();

          if (event.target.name === "payment-method") {
            state.invoice.payment.selected = event.target.value;
          }

          if (event.target.name === "template-design") {
            state.invoice.template.selected = event.target.value;
          }
        };
      },
      handleFileChange({ state }) {
        return (event) => {
          if (event.target.files.length) {
            const url = URL.createObjectURL(event.target.files[0]);
            state.invoice.logo.url = url;
            state.invoice.logo.filename = event.target.value.slice(12);
          } else {
            state.invoice.logo.url = "";
            state.invoice.logo.filename = "";
          }
        };
      },
      addConcept({ state }) {
        return (event) => {
          event.preventDefault();
          state.invoice.concepts.items.push({
            id: ++state.invoice.concepts.counter,
            concept: "",
            quantity: "",
            price: "",
          });
        };
      },
      deleteConcept({ state }) {
        return (event, id) => {
          event.preventDefault();
          if (state.invoice.concepts.items.length > 1) {
            const index = state.invoice.concepts.items.findIndex(
              (item) => item.id === id
            );
            state.invoice.concepts.items.splice(index, 1);
          }
        };
      },
      showPreview: ({ state }) => (event) => {
        event?.preventDefault();
        state.theme.isPreviewHidden = false;
      },
      hidePreview: ({ state }) => (event) => {
        event?.preventDefault();
        state.theme.isPreviewHidden = true;
      },
    },
    invoice: {
      afterCSR({ state }) {
        const issued = new Date();
        const expires = new Date(
          issued.getFullYear(),
          issued.getMonth() + 1,
          issued.getDate()
        );

        const toFormat = (date: Date) => {
          const day = date.getDate().toString();
          const month = (date.getMonth() + 1).toString();
          const year = date.getFullYear().toString();

          return `${day.length > 1 ? day : "0" + day}/${
            month.length > 1 ? month : "0" + month
          }/${year}`;
        };

        state.invoice.dates.issued = toFormat(issued);
        state.invoice.dates.expires = toFormat(expires);

        // actions.invoice.fake();
      },
      fake: ({ state }) => {
        state.invoice.number = "1024";
        state.invoice.provider = {
          name: "Aulo Agerio",
          identifier: "12345678X",
          address: "Plaza de Galicia 23",
          pc: "18000",
          city: "A Coruña",
          country: "España",
        };
        state.invoice.client = {
          name: "Numerio Negidio",
          identifier: "87654321Z",
          address: "Calle Mayor 9",
          pc: "24000",
          city: "Madrid",
          country: "España",
        };
        state.invoice.concepts.counter = 2;
        state.invoice.concepts.items = [
          {
            id: 1,
            concept: "Diseño",
            quantity: "32",
            price: "50",
          },
          {
            id: 2,
            concept: "Desarrollo",
            quantity: "60",
            price: "50",
          },
        ];
        state.invoice.concepts.hasIva = true;
        state.invoice.concepts.hasIrpf = true;
        state.invoice.payment.selected = "transfer";
        state.invoice.payment.transfer = {
          bank: "Banco Sextercios",
          iban: "ES4222730111180563763331",
          swift: "SEXTERCC",
        };
        state.invoice.notes =
          "Estas son algunas notas para el cliente acerca de algunos temas.";
        state.invoice.template.selected = "invoice-blue";
      },
    },
  },
};

export default invoiceTheme;
