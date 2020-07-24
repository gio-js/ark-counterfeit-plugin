import { Container, Logger } from "@arkecosystem/core-interfaces";
import { Handlers } from "@arkecosystem/core-transactions";
import { defaults } from "./defaults";
import { BusinessRegistrationTransactionHandler } from "./handlers";
import {  SimpleTransactionHandler } from "./handlers";
import { RegisterManufacturerTransactionHandler } from "./common/ark-counterfeit-common";

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
