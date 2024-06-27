// import axios from "axios";
import { TransactionResponse } from "../types";
import { rateLimitedFetch } from "../utils/rateLimiter";
import { mockTransactionResponse } from "../mocks/mockData";

class TransactionApiService {
  private transactionResponse: TransactionResponse = mockTransactionResponse;

  async getTransactions(
    startDate: string,
    endDate: string
  ): Promise<TransactionResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // rate limited fetch
    await rateLimitedFetch(async () => {
      const response = this.transactionResponse;
      return response;
    });
    return this.transactionResponse;

    //TODO: ideally, it should be something like this

    // async fetchTransactions(startDate: string, endDate: string): Promise<Transaction[]> {
    //   return await rateLimitedFetch(async () => {
    //     const response = await axios.get(`${url}/transactions`, {
    //       query: {
    //         startDate,
    //         endDate
    //       }
    //     });
    //     return response.data.items;
    //   });
    // }
  }
}

export default new TransactionApiService();
