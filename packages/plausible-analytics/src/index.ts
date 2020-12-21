import analytics from "@frontity/analytics";
import Root from "./components";
import Plausible from "../types";

const plausible: Plausible = {
  name: "@orballo/plausible-analytics",
  roots: {
    plausible: Root,
  },
  state: {
    analytics: {
      ...analytics.state.analytics,
      pageviews: {
        plausible: false,
      },
      events: {
        plausible: true,
      },
    },
    plausible: {},
  },
  actions: {
    ...analytics.actions,
    plausible: {
      event: () => ({ name, payload }) => {
        if ((window as any).plausible) {
          (window as any).plausible(name, { props: payload });
        }
      },
    },
  },
};

export default plausible;
