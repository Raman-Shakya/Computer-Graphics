import Grid from "../Grid-Component/gridClass";

class DDA extends Grid {
    constructor(props) {
        super(props);
        this.interval = null;
        this.position = [0,0];
        this.lineSettings = {}

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
        this.start = this.props.start;
        this.end = this.props.end;

        if (this.props.start) this.currentInputState = 1;
        else return;
        
        this.setPixel(this.start[0], this.start[1]);

        if (!this.start || !this.end) return;
        if (this.end) this.currentInputState = 2;

        this.initializeLineSettings(this.start, this.end);
        
        if (this.props.start && this.props.end) {
            this.startAnimation();
        }
    }

    inputFunc(y, x) {
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

            this.initializeLineSettings(this.start, this.end);
            this.startAnimation();
            return;
        }
        
    }
    
    startAnimation() {
        this.interval = setInterval(() => {
            this.setPixel(
                Math.round(this.lineSettings.curX),
                Math.round(this.lineSettings.curY)
            );
            this.computeNext();
        }, this.props.delay || 500);    
    }

    initializeLineSettings(start, end) {
        this.lineSettings.endX = end[0];
        this.lineSettings.endY = end[1];

        this.lineSettings.curX = start[0];
        this.lineSettings.curY = start[1];

        const dellX = end[0] - start[0];
        const dellY = end[1] - start[1];

        let n = 0;
        if (Math.abs(dellX) > Math.abs(dellY)) n = Math.abs(dellX);
        else n = Math.abs(dellY);

        this.lineSettings.incX = dellX / n;
        this.lineSettings.incY = dellY / n;       
    }

    computeNext() {
        if (this.lineSettings.curX == this.lineSettings.endX ||
            this.lineSettings.curY == this.lineSettings.endY
        ) {
            clearInterval(this.interval);
            return;
        }
        this.lineSettings.curX += this.lineSettings.incX;
        this.lineSettings.curY += this.lineSettings.incY;
    }

    checkInBetween(a, b, x) {
        if (x>Math.max(a,b) || x<Math.min(a,b)) return false;
        return true;
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

export default DDA;