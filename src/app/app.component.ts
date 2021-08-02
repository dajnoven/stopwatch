import { Component } from '@angular/core';
import {timer} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public resetBtn = false;
  public displayTimer = '';
  public isRunning = false;
  public startStop = "Start";
  public waitBtn = "Wait";
  public reset = "Reset";
  public time = 0;
  public name = "Stopwatch Example";

  private clicks = 0;
  private clickTimeout = 0;

  wait(): void {
    this.clicks++;
    if (this.clickTimeout) {
      if (this.clicks <= 2) {
        this.setClickTimeout;
        this.waitButton();
      } else {
        this.setClickTimeout(() => {});
      }
    } else {
      this.setClickTimeout(() => {});
    }
  }

  setClickTimeout(cb: { (): void; (): void; (): void; }) {
    clearTimeout(this.clickTimeout);
    this.clickTimeout = setTimeout(() => {
      this.clickTimeout = 0;
      this.clicks = 0;
      cb();
    }, 300);
  }

  ngOnInit(): void {
    this.time = 0;
    const sub = this.stopwatch();
  }

  waitButton() {
    this.isRunning = !this.isRunning;
    this.resetBtn = !this.resetBtn;
  }

  toggleTimer() {
    if (!this.resetBtn) {
      this.isRunning = !this.isRunning;
      this.resetBtn = !this.isRunning;
    } else {
      this.time = 0;
      this.isRunning = !this.isRunning;
    }
  }

  resetValue() {
    this.time = -1;
    this.isRunning = !this.isRunning;
  }

  stopwatch() {
    timer(0, 1000).subscribe(() => {
      if (this.isRunning) {
        this.time++;
        this.getDisplayTimer(this.time);
        this.startStop = "Stop";
      } else if (!!this.startStop) {
        this.getDisplayTimer(this.time);
        this.startStop = "Start";
      } else if (!this.isRunning) {
        console.log("it works");
      }
    });
  }

  getDisplayTimer(time: number) {
    let hours = "" + Math.floor(time / 3600);
    let minutes = "" + Math.floor((time % 3600) / 60);
    let seconds = "" + Math.floor((time % 3600) % 60);

    if (Number(hours) < 10) {
      hours = "0" + hours;
    } else {
      hours = "" + hours;
    }
    if (Number(minutes) < 10) {
      minutes = "0" + minutes;
    } else {
      minutes = "" + minutes;
    }
    if (Number(seconds) < 10) {
      seconds = "0" + seconds;
    } else {
      seconds = "" + seconds;
    }

    this.displayTimer = hours + ":" + minutes + ":" + seconds;
  }
}

