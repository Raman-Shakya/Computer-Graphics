import { GridTableComponent } from "../Grid-Component/gridClass";
import DDA from "./DDA";

class BLA extends DDA {
    // constructor(props) {
    //     super(props);
    // }

    initializeLineSettings(start, end) {
        this.state.lineSettings = {};
        this.state.lineSettings.endX = end[0];
        this.state.lineSettings.endY = end[1];

        this.state.lineSettings.curX = start[0];
        this.state.lineSettings.curY = start[1];

        this.state.lineSettings.dellX = end[0] - start[0];
        this.state.lineSettings.dellY = end[1] - start[1];

        const slope = this.state.lineSettings.dellY / this.state.lineSettings.dellX;

        if (!(slope >= 0  && slope <= 1) || this.state.lineSettings.dellX < 0 || this.state.lineSettings.dellY < 0) {
            alert("Slope of line should be between 0 and 1");
            return false;
        }

        this.state.lineSettings.incX = Math.abs(this.state.lineSettings.dellX)/this.state.lineSettings.dellX;
        this.state.lineSettings.incY = Math.abs(this.state.lineSettings.dellY)/this.state.lineSettings.dellY;

        this.state.lineSettings.Pk = 2*this.state.lineSettings.dellY - this.state.lineSettings.dellX;
        this.state.lineSettings.parameters = [this.state.lineSettings.Pk];

        this.setState({
            lineSettings: this.state.lineSettings,
            start: start,
            end: end,
        });
        return true;
    }

    

    computeNext() {
        if (Math.round(this.state.lineSettings.curX) === this.state.lineSettings.endX &&
            Math.round(this.state.lineSettings.curY) === this.state.lineSettings.endY
        ) {
            clearInterval(this.interval);
            return;
        }
        
        if (!this.state.steps) {
            this.state.steps = [[this.state.lineSettings.curX, this.state.lineSettings.curY, '-', '-']];
        }
        else {
            this.state.steps.push([
                this.state.lineSettings.curX, this.state.lineSettings.curY,
                this.state.lineSettings.Pk,
                (this.state.lineSettings.curX + this.state.lineSettings.incX),
                (this.state.lineSettings.curY + this.state.lineSettings.incY),
            ])
        }
        
        
        this.state.lineSettings.curX += this.state.lineSettings.incX;
        if (this.state.lineSettings.Pk < 0) {
            this.state.lineSettings.Pk += this.state.lineSettings.dellY;
        }
        else {
            this.state.lineSettings.curY += this.state.lineSettings.incY;
            this.state.lineSettings.Pk += this.state.lineSettings.dellY - this.state.lineSettings.dellX;
        }
        
        this.state.lineSettings.parameters.push(this.state.lineSettings.Pk);
        this.state.steps[this.state.steps.length-1].push(this.state.lineSettings.Pk);
        
        this.setState({
            steps: this.state.steps,
            lineSettings: this.state.lineSettings,
        });
        // this.state.lineSettings.curX += this.state.lineSettings.incX;
        // this.state.lineSettings.curY += this.state.lineSettings.incY;

    }

    render() {
        return <>
            <h1>BLA algorithm implementation</h1>
            <GridTableComponent state={this.state}>
                {
                    this.state.lineSettings && this.state.start && this.state.end && 
                    <div className="description">
                        <h2>Given,</h2>
                        <p>Start = ({ this.state.start.join(',') })</p>
                        <p>End   = ({ this.state.end.join(', ') })</p>
                        <h2>Now,</h2>
                        <p>ΔX = {this.state.lineSettings.dellX}</p>
                        <p>ΔY = {this.state.lineSettings.dellY}</p>
                        <h2>And,</h2>
                        <p>P<sub>0</sub> = { this.state.lineSettings?.parameters[0] }</p>
                        <h2>Steps in a table</h2>
                        <div className="step-table-wrapper">
                            <table className="step-table" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>step</th>
                                        <th>X<sub>n</sub></th>
                                        <th>Y<sub>n</sub></th>
                                        <th>P<sub>k</sub></th>
                                        <th>X<sub>n+1</sub></th>
                                        <th>Y<sub>n+1</sub></th>
                                        <th>P<sub>k+1</sub></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.steps && this.state.steps.map((steps, index)=> 
                                        <tr key={index}>
                                            <td>{index}</td>
                                            { steps.map((step, ind)=> 
                                                <td key={ind}>{step}</td>
                                            )}
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </GridTableComponent>
        </>
    }

}

export default BLA;