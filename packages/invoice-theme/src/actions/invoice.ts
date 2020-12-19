import Theme from "../../types";

const invoice: Theme["actions"]["invoice"] = {
  afterCSR({ actions }) {
    actions.invoice.populateDates();
    // actions.invoice.fake();
  },
  populateDates: ({ state }) => {
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
};

export default invoice;
