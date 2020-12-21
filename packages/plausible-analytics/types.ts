import { Package, Action } from "frontity/types";
import Analytics, { Event } from "@frontity/analytics/types";

export default interface Plausible extends Package {
  name: "@orballo/plausible-analytics";
  roots: {
    plausible: React.FC;
  };
  state: Analytics["state"] & {
    plausible: {
      domain?: string;
      customDomain?: string;
    };
    router?: any;
    source?: any;
  };
  actions: Analytics["actions"] & {
    plausible: {
      event: Action<Plausible, Event>;
    };
  };
}
