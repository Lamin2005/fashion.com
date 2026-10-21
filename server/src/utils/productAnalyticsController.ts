
import { Request, Response } from "express";
import Product from "../model/product";

export const getDailyProductAnalytics = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await Product.aggregate([
      {
        $facet: {
          created: [
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt",
                    timezone: "Asia/Yangon",
                  },
                },
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
          ],

          updated: [
            {
              $match: {
                $expr: {
                  $gt: ["$updatedAt", "$createdAt"],
                },
              },
            },
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$updatedAt",
                    timezone: "Asia/Yangon",
                  },
                },
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
          ],
        },
      },
    ]);

    const createdMap = new Map<string, number>(
      result[0].created.map((item: { _id: string; count: number }) => [
        item._id,
        item.count,
      ]),
    );

    const updatedMap = new Map<string, number>(
      result[0].updated.map((item: { _id: string; count: number }) => [
        item._id,
        item.count,
      ]),
    );

    const dates = [
      ...new Set([...createdMap.keys(), ...updatedMap.keys()]),
    ].sort();

    const data = dates.map((date) => ({
      date,
      created: createdMap.get(date) ?? 0,
      updated: updatedMap.get(date) ?? 0,
    }));

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Daily product analytics error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch daily product analytics",
    });
  }
};
