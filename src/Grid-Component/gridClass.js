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

        this.state = {
            grid: temp,
            acceptInput: true,
        };

    }
    
    // initializeGrid() {
    //     console.log("initializing grid");
    //     const temp = [
    //         [1,2,3],
    //         [3,5,5]
    //     ]
    //     this.setState(
    //         {grid: temp}
    //     )
    // }

    setPixel(y, x) {    // return true if it changed false if it didn't do anything
        if (!this.state.grid) return false;
        if (y>=this.state.grid.length || x >=this.state.grid[0].length) return false;
        if (this.state.grid[x][y]===1) return false;
        this.state.grid[x][y] = 1;
        
        this.setState({
            grid: this.state.grid
        });
        return true;
    }
    
    unSetPixel(y, x) {    // return true if it changed false if it didn't do anything
        if (!this.state.grid) return false;
        if (y>=this.state.grid.length || x >=this.state.grid[0].length) return false;
        if (this.state.grid[x][y]===0) return false;
        this.state.grid[x][y] = 0;

        this.setState({
            grid: this.state.grid
        });
        return true;
    }

    inputFunc(y, x) {
        console.log("overwrite inputFunc method to use this feature");
        if (!this.setPixel(x, y)) {
            this.unSetPixel(x, y);
        }
    }

    render() {
        return <div className="pixel-grid">
            <div className="pixel-grid-main">
                {   this.state.grid && 
                    this.state.grid.map((line, x)=>
                        <div className="pixel-line" key={x}>
                            {line.map((pixData, y)=>
                                <div
                                    className={`pixel ${pixData>0?'colored-pixel':''}`}
                                    key={y}
                                    onClick={()=>this.state.acceptInput && this.inputFunc(x, y)}
                                >
                                    {y==0 && <p className="pixel-x-label">{x}</p>}     
                                    {x==0 && <p className="pixel-y-label">{y}</p>}     
                                </div>
                            )}
                        </div>
                    )
                }
            </div>
        </div>
    }
    

}


export default Grid;