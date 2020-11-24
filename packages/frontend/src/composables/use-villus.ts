import { useClient, handleSubscriptions, defaultPlugins } from "villus";
import ws from "subscriptions-transport-ws";
import Cookies from "js-cookie";

declare const wsEndpoint: string;

function authPlugin({ opContext }) {
  opContext.headers.Authorization = Cookies.get("JWT");
}

export function useVillus(): void {
  // Villus GraphQL client
  const subscriptionClient = new ws.SubscriptionClient(wsEndpoint, {});
  const subscriptionForwarder = (operation) => subscriptionClient.request(operation);
  useClient({
    url: "/graphql",
    use: [authPlugin, handleSubscriptions(subscriptionForwarder), ...defaultPlugins()],
  });
}
