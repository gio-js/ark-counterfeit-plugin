import { Utils } from '@arkecosystem/crypto';
import { Interfaces, Transactions } from '@arkecosystem/crypto';
import { SIMPLE_TRANSACTION_TYPE, SIMPLE_TRANSACTION_TYPE_GROUP } from '../consts';


export class SimpleTransactionBuilder extends Transactions.TransactionBuilder<SimpleTransactionBuilder> {

    /**
     *
     */
    constructor() {
        super();
        this.data.type = SIMPLE_TRANSACTION_TYPE;
        this.data.typeGroup = SIMPLE_TRANSACTION_TYPE_GROUP;
        this.data.version = 2;
        this.data.fee = Utils.BigNumber.make('1000000');
        this.data.amount = Utils.BigNumber.ZERO;
        this.data.asset = { simpleData : {} };
    }

    public simpleData(id: string): SimpleTransactionBuilder {
        this.data.asset.simpleData = {
            Id: id
        };

        return this;
    }

    public getStruct() : Interfaces.ITransactionData {
        const struct: Interfaces.ITransactionData = super.getStruct();
        struct.amount = this.data.amount;
        struct.asset = this.data.asset;
        return struct;
      }

    protected instance(): SimpleTransactionBuilder {
        return this;
    }

}
