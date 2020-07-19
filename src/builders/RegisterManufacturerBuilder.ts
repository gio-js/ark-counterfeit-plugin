import { ANTICOUNTERFEIT_TRANSACTIONS_TYPE_GROUP, REGISTER_MANUFACTURER_TYPE } from './../consts';
import { Interfaces, Transactions, Utils } from "@arkecosystem/crypto";

export class RegisterManufacturerBuilder extends Transactions.TransactionBuilder<RegisterManufacturerBuilder> {
    constructor() {
        super();
        this.data.type = REGISTER_MANUFACTURER_TYPE;
        this.data.typeGroup = ANTICOUNTERFEIT_TRANSACTIONS_TYPE_GROUP;
        this.data.version = 2;
        this.data.fee = Utils.BigNumber.make("5000000000");
        this.data.amount = Utils.BigNumber.ZERO;
        this.data.asset = { AnticounterfeitRegisterManufacturerTransaction: {} };
    }

    public manufacturer(addressId: string, prefixId: string): RegisterManufacturerBuilder {
        this.data.asset.AnticounterfeitRegisterManufacturerTransaction = {
            ManufacturerAddressId: addressId,
            ProductPrefixID: prefixId
        };

        return this;
    }

    public getStruct(): Interfaces.ITransactionData {
        const struct: Interfaces.ITransactionData = super.getStruct();
        struct.amount = this.data.amount;
        struct.asset = this.data.asset;
        return struct;
    }

    protected instance(): RegisterManufacturerBuilder {
        return this;
    }
}
