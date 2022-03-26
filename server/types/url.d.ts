import mongoose from 'mongoose';

export declare interface URL {
  full: string;
  user_id: string;
  short: string;
  clicks: number;
}

export declare interface URLDoc extends URL, mongoose.Document {}
