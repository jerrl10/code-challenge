import { AggregationService } from "../../src/services/aggregationService";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("AggregationService", () => {
  it("should get aggregation data correctly", async () => {
    const aggregationService = new AggregationService();
    const mock = await aggregationService.aggregateData(
      "userId",
      "startDate",
      "endDate"
    );
    expect(mock).toStrictEqual([]);
  });
});
