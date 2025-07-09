import { createServer, Model } from "miragejs";
import { sportsData, membersData, subscriptionsData } from "@/data/mockData";

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    seeds(server) {
      // Seed sports data
      sportsData.forEach((sport) => {
        server.create("sport", sport);
      });

      // Seed members data
      membersData.forEach((member) => {
        server.create("member", member);
      });

      // Seed subscriptions data
      subscriptionsData.forEach((subscription) => {
        server.create("subscription", subscription);
      });
    },

    models: {
      sport: Model,
      member: Model,
      subscription: Model,
    },

    routes() {
      this.namespace = "api";

      // Sports endpoints
      this.get("/sports", (schema) => {
        return schema.all("sport");
      });

      this.get("/sports/:id", (schema, request) => {
        const id = request.params.id;
        return schema.find("sport", id);
      });

      // Members endpoints
      this.get("/members", (schema) => {
        return schema.all("member");
      });

      this.get("/members/:id", (schema, request) => {
        const id = request.params.id;
        return schema.find("member", id);
      });

      // Subscriptions endpoints
      this.get("/subscriptions", (schema) => {
        return schema.all("subscription");
      });

      this.get("/subscriptions/:id", (schema, request) => {
        const id = request.params.id;
        return schema.find("subscription", id);
      });

      // Get subscriptions by member
      this.get("/members/:id/subscriptions", (schema, request) => {
        const memberId = request.params.id;
        return schema.db.subscriptions.where({ memberId });
      });

      // Get subscriptions by sport
      this.get("/sports/:id/subscriptions", (schema, request) => {
        const sportId = request.params.id;
        return schema.db.subscriptions.where({ sportId });
      });

      // Pass through any requests that aren't handled above
      this.passthrough();
    },
  });

  return server;
}
