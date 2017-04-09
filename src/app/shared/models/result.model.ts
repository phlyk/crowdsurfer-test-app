import { Reward } from './reward.model';


/**
 * Turned the structure of the JSON data into classes (models) that could be used by Angular
 * Each attribute is a JSON attribute
 */
export class Result{
    currency: string;
    date: Date;
    description: string;
    description_summary: string;
    end_time: Date;
    funding_type: string;
    goal: number;
    raised: number;
    rewards_list: Reward[]; //rewards is often listed as an array of another datatype so I created its own model
    subtitle: string;
    title: string;
    url: string;
}