import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RewardComponent } from './reward.component';
/**
 * Simple (yet complex) test to check if the reward component displays its title correctly
 */
describe('RewardComponent (templateUrl)', () => {

    let comp: RewardComponent;
    let fixture: ComponentFixture<RewardComponent>;
    let de: DebugElement;
    let el: HTMLElement;


    /**
     * Asynchronous before each to give compiler time to load the HTML and CSS templates
     * very similar to synchronous beforeEach below
     */
    beforeEach(async(
        () => {
            TestBed.configureTestingModule({
                declarations: [RewardComponent], //delcare the test component
                providers: [
                    { provide: ComponentFixtureAutoDetect, useValue: true }
                ] // declare the test component
            }).compileComponents(); //compile HTML and CSS. Once called the TESTBED is no longer configurable
        }
    ));

    /**
     * Once first async TestBed is compiled the second synchronous one is called
     */
    beforeEach(() => {
        fixture = TestBed.createComponent(RewardComponent);
        comp = fixture.componentInstance; // RewardComponent test instance
        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('h3'));
        el = de.nativeElement;
        //fixture.detectChanges(); don't call this now
    });

    it('no title in the DOM until manually call `detectChanges`', () => {
        expect(el.textContent).toEqual('');
    });

    it('should display original title', () => {
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.reward.title);
    });

    it('should display a different test title', () => {
        comp.reward.title = 'Test Title';
        fixture.detectChanges(); //manually apply change detection, no harm done
        expect(el.textContent).toContain('Test Title');
    });
});
/////////////////////