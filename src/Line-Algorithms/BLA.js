import { GridTableComponent } from "../Grid-Component/gridClass";
import DDA from "./DDA";

class BLA extends DDA {
    constructor(props) {
        super(props);
    }

    initializeLineSettings(start, end) {
        this.state.lineSettings = {};
        this.state.lineSettings.endX = end[0];
        this.state.lineSettings.endY = end[1];

        this.state.lineSettings.curX = start[0];
        this.state.lineSettings.curY = start[1];

        this.state.lineSettings.dellX = end[0] - start[0];
        this.state.lineSettings.dellY = end[1] - start[1];

        this.state.lineSettings.incX = Math.abs(this.state.lineSettings.dellX)/this.state.lineSettings.dellX;
        this.state.lineSettings.incY = Math.abs(this.state.lineSettings.dellY)/this.state.lineSettings.dellY;

        this.state.lineSettings.Pk = 2*this.state.lineSettings.dellY - this.state.lineSettings.dellX;
        
        this.setState({
            lineSettings: this.state.lineSettings,
            start: start,
            end: end,
        });
    }

    

    computeNext() {
        if (Math.round(this.state.lineSettings.curX) == this.state.lineSettings.endX &&
            Math.round(this.state.lineSettings.curY) == this.state.lineSettings.endY
        ) {
            clearInterval(this.interval);
            return;
        }
        
        if (!this.state.steps) {
            this.state.steps = [[0, this.state.lineSettings.curX, this.state.lineSettings.curY, '-', '-']];
        }
        else {
            this.state.steps.push([
                this.state.lineSettings.curX.toFixed(2), this.state.lineSettings.curY.toFixed(2),
                (this.state.lineSettings.curX + this.state.lineSettings.incX).toFixed(2),
                (this.state.lineSettings.curY + this.state.lineSettings.incY).toFixed(2),
            ])
        }
        
        this.setState({
            steps: this.state.steps
        });

        this.state.lineSettings.curX += this.state.lineSettings.incX;
        if (this.state.lineSettings.Pk < 0) {
            this.state.lineSettings.Pk += this.state.lineSettings.dellY;
        }
        else {
            this.state.lineSettings.curY += this.state.lineSettings.incY;
            this.state.lineSettings.Pk += this.state.lineSettings.dellY - this.state.lineSettings.dellX;
        }

        // this.state.lineSettings.curX += this.state.lineSettings.incX;
        // this.state.lineSettings.curY += this.state.lineSettings.incY;


    }

    render() {
        return <GridTableComponent state={this.state}/>
    }

}

export default BLA;