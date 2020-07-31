import { Container, Logger } from "@arkecosystem/core-interfaces";
import { Handlers } from "@arkecosystem/core-transactions";
import { defaults } from "./defaults";
import { RegisterManufacturerTransactionHandler } from "./common/ark-counterfeit-common";

export const plugin: Container.IPluginDescriptor = {
    pkg: require("../package.json"),
    defaults,
    alias: "my-custom-transactions",
    async register(container: Container.IContainer, options) {
        container.resolvePlugin<Logger.ILogger>("logger").info("Registration ark-anticounterfeit-transactions started...");
        Handlers.Registry.registerTransactionHandler(RegisterManufacturerTransactionHandler);

        container.resolvePlugin<Logger.ILogger>("logger").info("Registration ark-anticounterfeit-transactions completed.");
    },
    async deregister(container: Container.IContainer, options) {
        container.resolvePlugin<Logger.ILogger>("logger").info("Deregistering manufacturer transaction");
    }
};
