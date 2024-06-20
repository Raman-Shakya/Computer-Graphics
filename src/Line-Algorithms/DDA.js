import Grid, { GridTableComponent } from "../Grid-Component/gridClass";
import './DDA.css'

class DDA extends Grid {
    constructor(props) {
        super(props);
        this.interval = null;
        this.position = [0,0];

        this.start = [];
        this.end = [];
        
        /*
            state definitions:
                0 - waiting for starting position input
                1 - waiting for ending position input
                2 - waiting for run signal
        */
        this.currentInputState = 0;
    }
    
    // run this function after grid has rendered
    componentDidMount() {
        this.setState({lineSettings: {}})

        this.start = this.props.start;
        this.end = this.props.end;

        if (this.props.start) this.currentInputState = 1;
        else return;

        this.setPixel(this.start[0], this.start[1]);

        if (!this.start || !this.end) return;
        if (this.end) this.currentInputState = 2;

        this.initializeLineSettings(this.start, this.end);
        
        if (this.props.start && this.props.end) {
            // this.startAnimation();
        }
    }

    inputFunc(y, x) {
        if (!this.state.acceptInput) return;

        if (this.currentInputState===2) {
            clearInterval(this.interval);
            this.clearGrid();
            this.currentInputState = 1;
            this.start = [x, y];
            this.setPixel(x, y);
            return;
        }
        this.setPixel(x, y);
        if (this.currentInputState===0) {
            this.currentInputState = 1;
            this.start = [x, y];
            return;
        }
        if (this.currentInputState===1) {
            this.currentInputState = 2;
            this.end = [x, y];

            if (this.initializeLineSettings(this.start, this.end)) {
                this.startAnimation();
            }
            else {
                this.state.start = null;
                this.state.end = null;
                this.currentInputState = 0;
                this.clearGrid();
            }

            return;
        }
        
    }
    
    startAnimation() {
        // empty the previous state
        this.setState({
            steps: []
        })
        this.interval = setInterval(() => {
            this.setPixel(
                Math.round(this.state.lineSettings.curX),
                Math.round(this.state.lineSettings.curY)
            );
            this.computeNext();
        }, this.props.delay || 500);    
    }

    initializeLineSettings(start, end) {
        this.state.lineSettings = {};
        this.state.lineSettings.endX = end[0];
        this.state.lineSettings.endY = end[1];

        this.state.lineSettings.curX = start[0];
        this.state.lineSettings.curY = start[1];

        const dellX = end[0] - start[0];
        const dellY = end[1] - start[1];

        let n = 0;
        if (Math.abs(dellX) > Math.abs(dellY)) n = Math.abs(dellX);
        else n = Math.abs(dellY);

        this.state.lineSettings.incX = dellX / n;
        this.state.lineSettings.incY = dellY / n;   
        
        this.setState({
            lineSettings: this.state.lineSettings,
            start: start,
            end: end,
            dellX: dellX,
            dellY: dellY,
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
        this.state.lineSettings.curY += this.state.lineSettings.incY;


    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        return <>
            <h1>DDA algorithm implementation</h1>
            <GridTableComponent state={this.state}>
                {
                    this.state.lineSettings && this.state.start && 
                    <div className="description">
                        <h2>Given,</h2>
                        <p>Start = ({ this.state.start.join(', ') })</p>
                        <p>End   = ({ this.state.end.join(', ') })</p>
                        <h2>Now,</h2>
                        <p>ΔX = {this.state.dellX}</p>
                        <p>ΔY = {this.state.dellY}</p>
                        <h2>And,</h2>
                        <p>X<sub>inc</sub> = {this.state.lineSettings.incX.toFixed(2)}</p>
                        <p>Y<sub>inc</sub> = {this.state.lineSettings.incY.toFixed(2)}</p>

                        <h2>Steps in a table</h2>
                        <div className="step-table-wrapper">
                            <table className="step-table" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>step</th>
                                        <th>X<sub>n</sub></th>
                                        <th>Y<sub>n</sub></th>
                                        <th>X<sub>n+1</sub></th>
                                        <th>Y<sub>n+1</sub></th>
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

export default DDA;