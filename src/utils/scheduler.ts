import { AggregationService } from "../services/aggregationService";
import { formatISO, subMinutes } from "date-fns";

const aggregationService = new AggregationService();

function scheduleTransactionUpdates() {
  setInterval(async () => {
    const now = new Date();
    const startDate = formatISO(subMinutes(now, 2));
    const endDate = formatISO(now);

    await aggregationService.updateTransactions(startDate, endDate);
    console.log("Transactions updated:", new Date().toISOString());
  }, 120000); // Run every 2 minutes
}

export default scheduleTransactionUpdates;
