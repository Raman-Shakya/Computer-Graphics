import React from "react";
import "./grid.css";

class Grid extends React.Component {

    constructor(props) {
        super(props);

        this.x = props.width || 10;
        this.y = props.height || 10;
        
        let temp = [];
        for (let i = 0; i < this.y; i++) {
            let tempLine = [];
            for (let j = 0; j < this.x; j++) tempLine.push(0);
            temp.push(tempLine);
        }

        this.inputFunc = this.inputFunc.bind(this);

        this.state = {
            grid: temp,
            acceptInput: this.props.acceptInput && true,
            inputFunc: this.inputFunc,
            steps: [],
        };


    }

    setPixel(y, x) {    // return true if it changed false if it didn't do anything
        if (!this.state.grid) return false;
        if (y<0 || x<0 || y>=this.state.grid[0].length || x >=this.state.grid.length) return false;
        if (this.state.grid[x][y]===1) return false;
        this.state.grid[x][y] = 1;
        
        this.setState({
            grid: this.state.grid
        });
        return true;
    }
    
    unSetPixel(y, x) {    // return true if it changed false if it didn't do anything
        if (!this.state.grid) return false;
        if (y<0 || x<0 || y>=this.state.grid[0].length || x >=this.state.grid.length) return false;
        if (this.state.grid[x][y]===0) return false;
        this.state.grid[x][y] = 0;

        this.setState({
            grid: this.state.grid
        });
        return true;
    }

    clearGrid() {
        for (let i=0; i<this.state.grid.length; i++) {
            for (let j=0; j<this.state.grid[i].length; j++) {
                this.state.grid[i][j] = 0;
            }
        }
        this.setState({grid: this.state.grid});
    }

    inputFunc(y, x) {
        console.log("overwrite inputFunc method to use this feature");
        if (!this.setPixel(x, y)) {
            this.unSetPixel(x, y);
        }
    }
}


class GridTableComponent extends React.Component {
    render() {
        return <div className="pixel-grid-main">
            {   this.props.state.grid && 
                this.props.state.grid.map((line, x)=>
                    <div className="pixel-line" key={x}>
                        {line.map((pixData, y)=>
                            <div
                                className={`pixel ${pixData>0?'colored-pixel':''}`}
                                key={y}
                                onClick={()=>this.props.state.acceptInput && this.props.state.inputFunc(x, y)}
                            >
                                {y==0 && <p className="pixel-x-label">{x}</p>}     
                                {x==0 && <p className="pixel-y-label">{y}</p>}     
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    }
}

export { GridTableComponent };
export default Grid;