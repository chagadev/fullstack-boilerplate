import { useClient, handleSubscriptions, defaultPlugins } from "villus";
import ws from "subscriptions-transport-ws";

declare const wsEndpoint: string;

export function useVillus(): void {
  // Villus GraphQL client
  const subscriptionClient = new ws.SubscriptionClient(wsEndpoint, {});
  const subscriptionForwarder = (operation) => subscriptionClient.request(operation);
  useClient({
    url: "/graphql",
    use: [handleSubscriptions(subscriptionForwarder), ...defaultPlugins()],
  });
}
