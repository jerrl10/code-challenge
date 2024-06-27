import transactionApiService from "./transactionService";
import cache from "../utils/cache";
import { Transaction, AggregatedData } from "../types";

export class AggregationService {
  private transactions: Transaction[] = [];

  async aggregateData(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<AggregatedData[]> {
    const cacheKey = `${userId}:${startDate}:${endDate}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      console.log("fetching data from cache");
      return cachedData as AggregatedData[];
    }

    const transactions = await transactionApiService.getTransactions(
      startDate,
      endDate
    );
    const userTransactions = transactions.items.filter(
      (tx) => tx.userId === userId
    );

    if (!userTransactions.length) {
      return [];
    }

    const userAggregates: { [userId: string]: AggregatedData } = {};

    transactions.items.forEach((tx) => {
      if (!userAggregates[tx.userId]) {
        userAggregates[tx.userId] = {
          userId: tx.userId,
          balance: 0,
          earned: 0,
          spent: 0,
          payout: 0,
          paidOut: 0,
        };
      }

      const userAggregate = userAggregates[tx.userId];
      if (tx.type === "earned") {
        userAggregate.earned += tx.amount;
        userAggregate.balance += tx.amount;
      } else if (tx.type === "spent") {
        userAggregate.spent += tx.amount;
        userAggregate.balance -= tx.amount;
      } else if (tx.type === "payout") {
        userAggregate.payout += tx.amount;
      }
    });

    cache.set(cacheKey, userAggregates);
    return Object.values(userAggregates);
  }

  async getPayoutRequests(startDate: string, endDate: string) {
    const cacheKey = `payoutRequests:${startDate}:${endDate}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const transactions = await transactionApiService.getTransactions(
      startDate,
      endDate
    );
    const payoutRequests = transactions.items
      .filter((tx) => tx.type === "payout")
      .reduce((acc, transaction) => {
        if (acc[transaction.userId]) {
          acc[transaction.userId] += transaction.amount;
        } else {
          acc[transaction.userId] = transaction.amount;
        }
        return acc;
      }, {} as Record<string, number>);

    cache.set(cacheKey, payoutRequests);
    return payoutRequests;
  }

  async updateTransactions(startDate: string, endDate: string): Promise<void> {
    const newTransactions = await transactionApiService.getTransactions(
      startDate,
      endDate
    );
    this.transactions.push(...newTransactions.items);
  }
}
