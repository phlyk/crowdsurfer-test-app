import { Component, OnInit, Input } from '@angular/core';

import { Reward } from 'app/shared/models/reward.model';

@Component({
    selector: 'modal-reward',
    templateUrl: './reward.component.html'
})
export class RewardComponent implements OnInit {

    @Input() reward: Reward;
    @Input() id: number;
    desc: string;

    ngOnInit() {
        //all reward descriptions start with <p> and end in </p>, some have "\" and special chars
        //regex to remove tags and unwanted characters
        // /g -> global, /m -> multiline
        this.desc = this.reward.description.replace(/<(?:.|\n)*?>/gm, '');
    }
    
}