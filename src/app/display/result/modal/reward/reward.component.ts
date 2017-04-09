import { Component, OnInit, Input } from '@angular/core';

import { Reward } from 'app/shared/models/reward.model';

@Component({
    selector: 'modal-reward',
    templateUrl: './reward.component.html',
    styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {

    @Input() reward: Reward;
    @Input() id: number;

    ngOnInit() {
        //all reward descriptions start with <p> and end in </p>
        //regex to remove tags
        // /g -> global, /m -> multiline
        this.reward.description.replace(/<(?:.|\n)*?>/gm, '');

        //shit, doesn't work
    }
    
}