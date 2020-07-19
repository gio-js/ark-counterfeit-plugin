import { Transactions, Utils } from "@arkecosystem/crypto";
import { IRegisterManufacturerTransaction } from "../interfaces";
import { ANTICOUNTERFEIT_TRANSACTIONS_TYPE_GROUP, REGISTER_MANUFACTURER_TYPE } from "../consts";
import ByteBuffer from "bytebuffer";

const { schemas } = Transactions;

export class RegisterManufacturerTransaction extends Transactions.Transaction {
    public static typeGroup: number = ANTICOUNTERFEIT_TRANSACTIONS_TYPE_GROUP;
    public static type: number = REGISTER_MANUFACTURER_TYPE;
    public static key: string = "register_manufacturer_transaction";

    public static getSchema(): Transactions.schemas.TransactionSchema {
        return schemas.extend(schemas.transactionBaseSchema, {
            $id: "AnticounterfeitRegisterManufacturerTransaction",
            required: ["asset", "type", "typeGroup"],
            properties: {
                type: { transactionType: REGISTER_MANUFACTURER_TYPE },
                typeGroup: { const: 2001 },
                amount: { bignumber: { minimum: 0, maximum: 0 } },
                asset: {
                    type: "object",
                    required: ["AnticounterfeitRegisterManufacturerTransaction"],
                    properties: {
                        AnticounterfeitRegisterManufacturerTransaction: {
                            type: "object",
                            required: ["ManufacturerAddressId", "ProductPrefixID"],
                            properties: {
                                ManufacturerAddressId: {
                                    type: "string",
                                    minLength: 34,
                                    maxLength: 34,
                                },
                                ProductPrefixID: {
                                    type: "string",
                                    minLength: 5,
                                    maxLength: 15,
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    protected static defaultStaticFee: Utils.BigNumber = Utils.BigNumber.make("5000000000");

    public serialize(): ByteBuffer {
        const { data } = this;

        const element = data.asset.AnticounterfeitRegisterManufacturerTransaction as IRegisterManufacturerTransaction;
        const manufacturerAddressIdBytes = Buffer.from(element.ManufacturerAddressId, "utf8");
        const prefixIdBytes = Buffer.from(element.ProductPrefixID, "utf8");

        const buffer = new ByteBuffer(manufacturerAddressIdBytes.length + prefixIdBytes.length + 2, true);
        buffer.writeUint8(manufacturerAddressIdBytes.length);
        buffer.append(manufacturerAddressIdBytes, "hex");
        buffer.writeUint8(prefixIdBytes.length);
        buffer.append(prefixIdBytes, "hex");

        return buffer;
    }

    public deserialize(buf: ByteBuffer): void {
        const { data } = this;
        const AnticounterfeitRegisterManufacturerTransaction = {} as IRegisterManufacturerTransaction;

        const manufacturerAddressIdLength = buf.readUint8();
        AnticounterfeitRegisterManufacturerTransaction.ManufacturerAddressId = buf.readString(manufacturerAddressIdLength);

        const prefixIdLength = buf.readUint8();
        AnticounterfeitRegisterManufacturerTransaction.ProductPrefixID = buf.readString(prefixIdLength);

        data.asset = {
            AnticounterfeitRegisterManufacturerTransaction
        };
    }
}
