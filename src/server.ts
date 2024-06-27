import express from "express";
import path from "path";
import { AggregationService } from "./services/aggregationService";
import scheduleTransactionUpdates from "./utils/scheduler";

const app = express();
const port = 3000;
const aggregationService = new AggregationService();

// Start transaction updates
scheduleTransactionUpdates();

app.use(express.static(path.join(__dirname, "../public")));

app.get("/transactions/:userId", async (req, res) => {
  const userId = req.params.userId;
  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;
  const data = await aggregationService.aggregateData(
    userId,
    startDate,
    endDate
  );
  if (data.length > 0) {
    const userData = data.find((user) => user.userId === userId) || [];
    if (userData) {
      res.json(userData);
    }
  } else {
    res.status(404).send("User not found");
  }
});

app.get("/payout-requests", async (req, res) => {
  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;
  const payoutRequests = await aggregationService.getPayoutRequests(
    startDate,
    endDate
  );
  res.json(payoutRequests);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
