// COLOR
import { deepOrangeA700,orangeA700,amberA700,yellowA700,limeA700,lightGreenA700,greenA700,tealA700,cyanA700,lightBlueA700,indigoA700,deepPurpleA700,purpleA700,pinkA700,redA700,blueGrey900,brown900 } from 'material-ui/styles/colors'
const colors = [
	    '#FF6384',
      '#4BC0C0',
      '#FFCE56',
      '#B9BBBF',
      '#36A2EB',
      '#EB7F36',
      '#F55E56',
      '#4CAF50',
      '#3F51B5',
      '#CDDC39',
      '#673AB7',
      '#E91E63'

      // deepOrangeA700,orangeA700,amberA700,yellowA700,limeA700,lightGreenA700,greenA700,tealA700,cyanA700,lightBlueA700,indigoA700,deepPurpleA700,purpleA700,pinkA700,redA700,blueGrey900,brown900
      ]

export function hexToRGB(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

export function randomColors() {
    this.low = 0;
    this.high = colors.length;
    this.reset();
}

randomColors.prototype = {
    reset: function() {
        this.remaining = [];
        for (let i = this.low; i < this.high; i++) {
            this.remaining.push(i);
        }
    },
    get: function() {
        if (!this.remaining.length) {
            this.reset();
        }
        let index = Math.floor(Math.random() * this.remaining.length);
        let val = this.remaining[index];
        this.remaining.splice(index, 1);
        return colors[val];        
    }
}