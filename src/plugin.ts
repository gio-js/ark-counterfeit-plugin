import { Container, Logger } from "@arkecosystem/core-interfaces";
import { Handlers } from "@arkecosystem/core-transactions";
import { defaults } from "./defaults";
import {
    RegisterManufacturerTransactionHandler,
    RegisterProductTransactionHandler,
    TransferProductTransactionHandler,
    ReceiveProductTransactionHandler
} from "./common/ark-counterfeit-common/src/handlers/handlers";

export const plugin: Container.IPluginDescriptor = {
    pkg: require("../package.json"),
    defaults,
    alias: "ark-counterfeit-transactions",
    async register(container: Container.IContainer, options) {
        container.resolvePlugin<Logger.ILogger>("logger").info("Registration ark-anticounterfeit-transactions started...");

        Handlers.Registry.registerTransactionHandler(RegisterManufacturerTransactionHandler);
        Handlers.Registry.registerTransactionHandler(RegisterProductTransactionHandler);
        Handlers.Registry.registerTransactionHandler(TransferProductTransactionHandler);
        Handlers.Registry.registerTransactionHandler(ReceiveProductTransactionHandler);

        container.resolvePlugin<Logger.ILogger>("logger").info("Registration ark-anticounterfeit-transactions completed.");
    },
    async deregister(container: Container.IContainer, options) {
        container.resolvePlugin<Logger.ILogger>("logger").info("Deregistering manufacturer transaction");
    }
};
