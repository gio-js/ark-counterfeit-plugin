import { Container, Logger } from "@arkecosystem/core-interfaces";
import { Handlers } from "@arkecosystem/core-transactions";
import { defaults } from "./defaults";
import { SimpleTransactionHandler, BusinessRegistrationTransactionHandler, RegisterManufacturerTransactionHandler } from "./handlers";

export const plugin: Container.IPluginDescriptor = {
    pkg: require("../package.json"),
    defaults,
    alias: "my-custom-transactions",
    async register(container: Container.IContainer, options) {
        container.resolvePlugin<Logger.ILogger>("logger").info("Registration ark-anticounterfeit-transactions started...");
        Handlers.Registry.registerTransactionHandler(RegisterManufacturerTransactionHandler);
        Handlers.Registry.registerTransactionHandler(SimpleTransactionHandler);
        Handlers.Registry.registerTransactionHandler(BusinessRegistrationTransactionHandler);
        container.resolvePlugin<Logger.ILogger>("logger").info("Registration ark-anticounterfeit-transactions completed.");
    },
    async deregister(container: Container.IContainer, options) {
        container.resolvePlugin<Logger.ILogger>("logger").info("Deregistering manufacturer transaction");
    }
};
