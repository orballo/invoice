import Root from "./components";
import Theme from "../types";
import * as state from "./state";
import * as actions from "./actions";

const invoiceTheme: Theme = {
  name: "invoice-theme",
  roots: {
    theme: Root,
  },
  state,
  actions,
};

export default invoiceTheme;
