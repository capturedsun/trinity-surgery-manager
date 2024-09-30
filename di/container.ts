import { Container } from "inversify";
import { startSpan } from "@sentry/nextjs";

import { AuthenticationModule } from "./modules/authentication.module";
import { TodosModule } from "./modules/todos.module";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { UsersModule } from "./modules/users.module";
import { OrganizationModule } from "./modules/oragnization.module";
const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

export const initializeContainer = () => {
  ApplicationContainer.load(TodosModule);
  ApplicationContainer.load(UsersModule);
  ApplicationContainer.load(AuthenticationModule);
  ApplicationContainer.load(OrganizationModule);
};

export const destroyContainer = () => {
  ApplicationContainer.unload(AuthenticationModule);
  ApplicationContainer.unload(UsersModule);
  ApplicationContainer.unload(TodosModule);
  ApplicationContainer.unload(OrganizationModule);
};

if (process.env.NODE_ENV !== "test") {
  initializeContainer();
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  return startSpan(
    {
      name: "(di) getInjection",
      op: "function",
      attributes: { symbol: symbol.toString() },
    },
    () => ApplicationContainer.get(DI_SYMBOLS[symbol]),
  );
}

export { ApplicationContainer };
