import { Utils } from '@arkecosystem/crypto';
import { Transactions } from '@arkecosystem/crypto';
import { ISimpleData } from "../interfaces";
import ByteBuffer from 'bytebuffer';
import { SIMPLE_TRANSACTION_TYPE_GROUP, SIMPLE_TRANSACTION_TYPE } from '../consts';
const { schemas } = Transactions;

export class SimpleTransaction extends Transactions.Transaction {
    public static typeGroup: number = SIMPLE_TRANSACTION_TYPE_GROUP;
    public static type: number = SIMPLE_TRANSACTION_TYPE;
    public static key: string = "simple_transaction";

    serialize(): import("bytebuffer") {
        const { data } = this;
        const simpleData = data.asset!.simpleData as ISimpleData;

        const idBytes = Buffer.from(simpleData.Id, 'utf8');
        const buffer = new ByteBuffer(idBytes.length + 2, true);
        buffer.writeUint16(idBytes.length);
        buffer.append(idBytes, 'hex');

        return buffer;
    }

    deserialize(buf: import("bytebuffer")): void {
        const { data } = this;
        const simpleData = {} as ISimpleData;

        const idLength = buf.readUint16();
        simpleData.Id = buf.readString(idLength);

        data.asset = { simpleData };
    }

    protected static defaultStaticFee: Utils.BigNumber = Utils.BigNumber.make('1000000');

    public static getSchema(): Transactions.schemas.TransactionSchema {
        return schemas.extend(schemas.transactionBaseSchema, {
            $id: "simpleData",
            required: ["asset", "type", "typeGroup"],
            properties: {
                type: { transactionType: SIMPLE_TRANSACTION_TYPE },
                typeGroup: { const: 3001 },
                amount: { bignumber: { minimum: 0, maximum: 0 } },
                asset: {
                    type: "object",
                    required: ["simpleData"],
                    properties: {
                        simpleData: {
                            type: "object",
                            required: ["Id"],
                            properties: {
                                Id: {
                                    type: "string",
                                    minLength: 5,
                                    maxLength: 10,
                                }
                            },
                        },
                    },
                },
            },
        });
    }

}
