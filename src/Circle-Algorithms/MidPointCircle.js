
class MPCircle extends BLA {
    constructor(props) {
        super(props);
    }

    initializeLineSettings(start, end) {
        this.state.lineSettings = {};
        this.state.lineSettings.endX = end[0];
        this.state.lineSettings.endY = end[1];

        this.state.lineSettings.radius = Math.round(((end[0]-start[0])**2 + (end[1]-start[0])**2)**0.5)

        this.state.lineSettings.curX = 0;
        this.state.lineSettings.curY = this.state.lineSettings.radius;

        this.state.lineSettings.Pk = 1 - this.state.lineSettings.radius;
        
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
        
        this.state.lineSettings.curX += 1;
        if (this.state.lineSettings.Pk < 0) {
            this.state.lineSettings.Pk += this.state.lineSettings.dellY;
        }
        else {
            this.state.lineSettings.curY += this.state.lineSettings.incY;
            this.state.lineSettings.Pk += this.state.lineSettings.dellY - this.state.lineSettings.dellX;
        }
    }
}