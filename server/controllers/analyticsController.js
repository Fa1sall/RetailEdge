import Analytics from "../models/Analytics.js";

export const getAnalytics = async (req, res) => {
  const data = await Analytics.findOne();
  res.json(data || {});
};

export const initAnalytics = async (req, res) => {
  const exists = await Analytics.findOne();
  if (!exists) {
    const analytics = new Analytics();
    await analytics.save();
    res.status(201).json(analytics);
  } else {
    res.status(200).json(exists);
  }
};
