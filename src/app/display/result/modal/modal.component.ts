import { Component, Input, OnInit } from '@angular/core';

import { MdDialogRef } from '@angular/material';

import { Reward } from 'app/shared/models/reward.model';

@Component({
    selector: 'modal-view',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    data: any;
    rewards: Reward[];
    id: number;

    hasRewards: boolean;

    ngOnInit(){
        this.rewards ? this.hasRewards = true : this.hasRewards = false;
        console.log(this.id, this.hasRewards, this.rewards);
    }

    constructor(public dialogRef: MdDialogRef<ModalComponent>){}

    getId(reward: Reward):number{
        return this.rewards.indexOf(reward);
    }
}