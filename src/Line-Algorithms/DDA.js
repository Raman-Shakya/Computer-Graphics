import Grid from "../Grid-Component/gridClass";

class DDA extends Grid {
    constructor(props) {
        super(props);
        this.interval = null;
        this.position = [0,0];
        this.lineSettings = {}
    }
    
    componentDidMount() {
        const start = [1,1];
        const end = [6,7];

        this.initializeLineSettings(start, end);
        
        this.interval = setInterval(() => {
            this.setPixel(
                Math.round(this.lineSettings.curX),
                Math.round(this.lineSettings.curY)
            );
            this.computeNext();
        }, 500);
    }

    initializeLineSettings(start, end) {
        this.lineSettings.endX = end[0];
        this.lineSettings.endY = end[1];

        this.lineSettings.curX = start[0];
        this.lineSettings.curY = start[1];

        this.lineSettings.dellX = end[0] - start[0];
        this.lineSettings.dellY = end[1] - start[1];
        
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