import { Asset } from "./asset";

export interface Expense {
    id: number;
    purchaseDate: Date;
    amount: number;
    asset: Asset;
    assetId: number;
}