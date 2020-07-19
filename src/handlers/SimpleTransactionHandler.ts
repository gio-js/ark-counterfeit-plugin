import { Database, EventEmitter, State, TransactionPool } from "@arkecosystem/core-interfaces";
import { Handlers } from "@arkecosystem/core-transactions";
import { Interfaces, Managers, Transactions } from "@arkecosystem/crypto";
// import { IConnection } from "@arkecosystem/core-interfaces/dist/core-database";
// import { IWalletManager } from "@arkecosystem/core-interfaces/dist/core-state";
// import { ITransaction } from "@arkecosystem/crypto/dist/interfaces";
import { SimpleTransaction } from "../transactions/SimpleTransaction";

export class SimpleTransactionHandler extends Handlers.TransactionHandler {

    /*getConstructor(): Transactions.TransactionConstructor {
        return SimpleTransaction;
    }

    dependencies(): readonly Handlers.TransactionHandlerConstructor[] {
        return [];
    }

    walletAttributes(): readonly string[] {
        return [];
    }

    async bootstrap(connection: IConnection, walletManager: IWalletManager): Promise<void> { }

    async isActivated(): Promise<boolean> {
        return Managers.configManager.getMilestone().aip11 === true;
    }

    async applyToRecipient(transaction: ITransaction, walletManager: IWalletManager): Promise<void> {

    }

    async revertForRecipient(transaction: ITransaction, walletManager: IWalletManager): Promise<void> {
        return;
    }
    */

    public getConstructor(): Transactions.TransactionConstructor {
        return SimpleTransaction;
    }

    public dependencies(): ReadonlyArray<Handlers.TransactionHandlerConstructor> {
        return [];
    }

    public walletAttributes(): ReadonlyArray<string> {
        return [ ];
    }

    public async isActivated(): Promise<boolean> {
        return Managers.configManager.getMilestone().aip11 === true;
    }

    public async bootstrap(connection: Database.IConnection, walletManager: State.IWalletManager): Promise<void> {
        //await super.bootstrap(connection, walletManager);
        return;
    }

    public async throwIfCannotBeApplied(
        transaction: Interfaces.ITransaction,
        wallet: State.IWallet,
        databaseWalletManager: State.IWalletManager,
    ): Promise<void> {
        await super.throwIfCannotBeApplied(transaction, wallet, databaseWalletManager);
    }

    public emitEvents(transaction: Interfaces.ITransaction, emitter: EventEmitter.EventEmitter): void {
        //emitter.emit("business.registered", transaction.data);
    }

    public async canEnterTransactionPool(
        data: Interfaces.ITransactionData,
        pool: TransactionPool.IConnection,
        processor: TransactionPool.IProcessor,
    ): Promise<{
        type: string;
        message: string;
    } | null> {
        return null;
    }

    public async applyToSender(
        transaction: Interfaces.ITransaction,
        walletManager: State.IWalletManager,
    ): Promise<void> {
        await super.applyToSender(transaction, walletManager);
    }

    public async revertForSender(
        transaction: Interfaces.ITransaction,
        walletManager: State.IWalletManager,
    ): Promise<void> {
        await super.revertForSender(transaction, walletManager);
    }

    public async applyToRecipient(
        transaction: Interfaces.ITransaction,
        walletManager: State.IWalletManager,
    ): Promise<void> {
        return;
    }

    public async revertForRecipient(
        transaction: Interfaces.ITransaction,
        walletManager: State.IWalletManager,
    ): Promise<void> {
        return;
    }
}
