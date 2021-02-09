import { onGlobalSetup } from "@nuxtjs/composition-api";
import { useClient } from "villus";
import fetchPolyfill from "node-fetch";

// @ts-expect-error @see https://github.com/logaretm/villus/issues/59
global.fetch = fetchPolyfill;

export default () => {
  onGlobalSetup(() => {
    useClient({
      url: "/api/graphql",
    });
  });
};
