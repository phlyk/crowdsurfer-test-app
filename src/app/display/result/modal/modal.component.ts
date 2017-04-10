import { Component, Input, OnInit } from '@angular/core';

import { MdDialogRef } from '@angular/material';

import { Reward } from 'app/shared/models/reward.model';

@Component({
    selector: 'modal-view',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
/**
 * This component is the component that is loaded into the MdDialog modal and is thus displayed
 */
export class ModalComponent implements OnInit {

    //the rewards from the 'rewards_list' attribute on the JSON file
    rewards: Reward[];
    //the id of the Result of whom the Rewards belong to
    id: number;


    ngOnInit(){
    }

    constructor(public dialogRef: MdDialogRef<ModalComponent>){} //must keep a reference on the container of the component, the modal.

    /**
     * IDs were not hardcoded in the JSON data so it is useful to give them one even if it is only their index in the array
     * @param reward : the reward that we want to associate an id to
     */
    getId(reward: Reward):number{
        return this.rewards.indexOf(reward); 
    }
}