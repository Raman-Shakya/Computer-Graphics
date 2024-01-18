import Grid from "../Grid-Component/gridClass";

class DDA extends Grid {
    constructor(props) {
        super(props);
        this.interval = null;
        this.position = [0,0];
        this.lineSettings = {}
    }
    
    componentDidMount() {
        const start = this.props.start || [1,1];
        const end = this.props.end || [6,5];

        this.initializeLineSettings(start, end);
        
        this.interval = setInterval(() => {
            this.setPixel(
                Math.round(this.lineSettings.curX),
                Math.round(this.lineSettings.curY)
            );
            this.computeNext();
        }, this.props.delay || 500);
    }

    initializeLineSettings(start, end) {
        this.lineSettings.endX = end[1];
        this.lineSettings.endY = end[0];

        this.lineSettings.curX = start[1];
        this.lineSettings.curY = start[0];

        this.lineSettings.dellX = end[1] - start[1];
        this.lineSettings.dellY = end[0] - start[0];
        
        this.lineSettings.n = Math.max(this.lineSettings.dellX, this.lineSettings.dellY);
    }

    computeNext() {
        if (this.lineSettings.curX == this.lineSettings.endX) {
            clearInterval(this.interval);
            return;
        }
        this.lineSettings.curX += this.lineSettings.dellX / this.lineSettings.n;
        this.lineSettings.curY += this.lineSettings.dellY / this.lineSettings.n;
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

export default DDA;