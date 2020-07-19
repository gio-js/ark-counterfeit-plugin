import { Container, Logger } from "@arkecosystem/core-interfaces";
import { Handlers } from "@arkecosystem/core-transactions";
import { defaults } from "./defaults";
import { SimpleTransactionHandler, BusinessRegistrationTransactionHandler, RegisterManufacturerTransactionHandler } from "./handlers";
import { DappManager } from './manager';

export const plugin: Container.IPluginDescriptor = {
    pkg: require("../package.json"),
    defaults,
    alias: "my-custom-transactions",
    async register(container: Container.IContainer, options) {
        container.resolvePlugin<Logger.ILogger>("logger").info("Registering manufacturer transaction");
        Handlers.Registry.registerTransactionHandler(RegisterManufacturerTransactionHandler);
        Handlers.Registry.registerTransactionHandler(SimpleTransactionHandler);
        Handlers.Registry.registerTransactionHandler(BusinessRegistrationTransactionHandler);

        // container.resolvePlugin<Logger.ILogger>("logger").info("Starting dApp");
        // const dappManager = new DappManager(); // creating instance of your dApp

        // dappManager.start(options);

        // return dappManager;
    },
    async deregister(container: Container.IContainer, options) {
        container.resolvePlugin<Logger.ILogger>("logger").info("Deregistering manufacturer transaction");
    }
};
