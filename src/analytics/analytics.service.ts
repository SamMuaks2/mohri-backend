// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model } from "mongoose";
// import { Analytics } from "./analytics.schema";

// @Injectable()
// export class AnalyticsService {
//   constructor(
//     @InjectModel(Analytics.name) private model: Model<Analytics>,
//   ) {}

//   findAll() {
//     return this.model.find().sort({ createdAt: -1 });
//   }

//   findByPage(page: string) {
//     return this.model.find({ page }).sort({ createdAt: -1 });
//   }

//   create(data: any) {
//     return this.model.create(data);
//   }

//   getStats() {
//     return this.model.aggregate([
//       {
//         $group: {
//           _id: "$page",
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $sort: { count: -1 },
//       },
//     ]);
//   }
// }



import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Analytics } from "./analytics.schema";

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics.name) private model: Model<Analytics>,
  ) {}

  findAll() {
    return this.model.find().sort({ createdAt: -1 });
  }

  findByPage(page: string) {
    return this.model.find({ page }).sort({ createdAt: -1 });
  }

  create(data: any) {
    return this.model.create(data);
  }

  async getStats() {
    return this.model.aggregate([
      {
        $group: {
          _id: "$page",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
  }

  async getWeeklyStats() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Get daily stats for the past week
    const dailyStats = await this.model.aggregate([
      {
        $match: {
          createdAt: { $gte: oneWeekAgo },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            page: "$page",
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.date": 1 },
      },
    ]);

    // Get top pages for the week
    const topPages = await this.model.aggregate([
      {
        $match: {
          createdAt: { $gte: oneWeekAgo },
        },
      },
      {
        $group: {
          _id: "$page",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    // Get total views this week
    const totalViews = await this.model.countDocuments({
      createdAt: { $gte: oneWeekAgo },
    });

    // Get unique pages visited
    const uniquePages = await this.model.distinct("page", {
      createdAt: { $gte: oneWeekAgo },
    });

    // Compare with previous week
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const previousWeekViews = await this.model.countDocuments({
      createdAt: { $gte: twoWeeksAgo, $lt: oneWeekAgo },
    });

    const percentageChange = previousWeekViews > 0
      ? ((totalViews - previousWeekViews) / previousWeekViews) * 100
      : 0;

    return {
      period: {
        start: oneWeekAgo.toISOString(),
        end: new Date().toISOString(),
      },
      totalViews,
      uniquePages: uniquePages.length,
      percentageChange: Math.round(percentageChange * 10) / 10,
      dailyStats: this.formatDailyStats(dailyStats),
      topPages,
      previousWeekViews,
    };
  }

  private formatDailyStats(stats: any[]) {
    // Group by date and sum all page views for each day
    const dailyTotals = stats.reduce((acc, stat) => {
      const date = stat._id.date;
      if (!acc[date]) {
        acc[date] = { date, views: 0, pages: {} };
      }
      acc[date].views += stat.count;
      acc[date].pages[stat._id.page] = stat.count;
      return acc;
    }, {});

    return Object.values(dailyTotals).sort((a: any, b: any) =>
      a.date.localeCompare(b.date)
    );
  }

  async getTotalStats() {
    const totalViews = await this.model.countDocuments();
    const uniquePages = await this.model.distinct("page");
    
    const topPages = await this.model.aggregate([
      {
        $group: {
          _id: "$page",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    // Get stats by referrer
    const referrerStats = await this.model.aggregate([
      {
        $group: {
          _id: "$referrer",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    return {
      totalViews,
      uniquePages: uniquePages.length,
      topPages,
      referrerStats,
    };
  }
}