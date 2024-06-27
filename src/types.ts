export interface Transaction {
  id: string;
  userId: string;
  createdAt: string;
  type: "earned" | "spent" | "payout";
  amount: number;
}

export interface TransactionResponse {
  items: Transaction[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface AggregatedData {
  userId: string;
  balance: number;
  earned: number;
  spent: number;
  payout: number;
  paidOut: number;
}
