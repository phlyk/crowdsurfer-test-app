import { Reward } from './reward.model';

export class Result{
    currency: string;
    date: Date;
    description: string; //might be more
    description_summary: string;
    end_time: Date;
    funding_type: string; //could be it's own model
    goal: number;
    raised: number;
    rewards_list: Reward[];
    subtitle: string;
    title: string;
    url: string;
}