import { Transaction, TransactionResponse } from "../types";

export const mockTransactions: Transaction[] = [
  {
    id: "41bbdf81-735c-4aea-beb3-3e5f433a30c5",
    userId: "074092",
    createdAt: "2023-03-16T12:33:11.000Z",
    type: "payout",
    amount: 30,
  },
  {
    id: "41bbdf81-735c-4aea-beb3-3e5fasfsdfef",
    userId: "074092",
    createdAt: "2023-03-12T12:33:11.000Z",
    type: "spent",
    amount: 12,
  },
  {
    id: "41bbdf81-735c-4aea-beb3-342jhj234nj234",
    userId: "074092",
    createdAt: "2023-03-15T12:33:11.000Z",
    type: "earned",
    amount: 1.2,
  },
];

export const mockTransactionResponse: TransactionResponse = {
  items: mockTransactions,
  meta: {
    totalItems: 1200,
    itemCount: 3,
    itemsPerPage: 3,
    totalPages: 400,
    currentPage: 1,
  },
};
