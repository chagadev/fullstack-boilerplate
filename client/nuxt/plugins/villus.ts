import { onGlobalSetup } from "@nuxtjs/composition-api";
import { useClient, cache, dedup } from "villus";
import { multipart } from "@villus/multipart";
import { batch } from "@villus/batch";
import fetch from "cross-fetch";

export default () => {
  onGlobalSetup(() => {
    useClient({
      url: "/api/graphql",
      use: [multipart(), cache(), dedup(), batch({ fetch })],
    });
  });
};
