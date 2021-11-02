import Theme from "../../types";

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

const theme: Theme["actions"]["theme"] = {
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
  loadPDF: ({ state }) => {
    state.theme.shouldLoadPDF = true;
  },
};

export default theme;
