import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Response,
} from "miragejs";
import { faker } from "@faker-js/faker";

type User = {
  name: string;
  email: string;
  created_at: string;
};

type Admin = {
  email: string;
  password: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
      admin: Model.extend<Partial<Admin>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),

      admin: Factory.extend({
        email() {
          return "admin@email.com";
        },

        password() {
          return "123456";
        },
      }),
    },

    seeds(server) {
      server.createList("user", 100);
      server.createList("admin", 1);
    },

    routes() {
      this.namespace = "api";
      this.timing = 1000;

      this.get("/users", function (this: any, schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("user").length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all("user")).users.slice(
          pageStart,
          pageEnd
        );

        return new Response(200, { "x-total-count": String(total) }, { users });
      });

      this.get("/users/:id");
      this.post("/users");

      this.post("/admin", function (schema, request) {
        const { email, password } = JSON.parse(
          request.requestBody
        ) as unknown as Admin;
        const adminSchema = schema.all("admin");
        const admin = adminSchema.models[0];

        if (admin.attrs.email === email && admin.attrs.password === password) {
          return new Response(200, {
            token: "1b97e97c-3b58-409c-937b-65b0fac03eeb",
          });
        }

        return new Response(400, { message: "User not found!" });
      });

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
