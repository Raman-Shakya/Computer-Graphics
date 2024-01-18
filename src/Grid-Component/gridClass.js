import React from "react";
import "./grid.css";

class Grid extends React.Component {

    constructor(props) {
        super(props);

        this.x = 10;
        this.y = 10;
        
        let temp = [];
        for (let i = 0; i < this.x; i++) {
            let tempLine = [];
            for (let j = 0; j < this.y; j++) tempLine.push(0);
            temp.push(tempLine);
        }

        this.state = {
            grid: temp,
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

    setPixel(x, y) {
        // if (this.state.grid[x][y]) this.state.grid[x][y] = 0;
        this.state.grid[x][y] = 1;

        this.setState({
            grid: this.state.grid
        });
    }

    render() {
        return <div className="pixel-grid">
            {   this.state.grid && 
                this.state.grid.map((line, x)=>
                    <div className="pixel-line" key={x}>
                        {line.map((pixData, y)=>
                            <div className={`pixel ${pixData>0?'colored-pixel':''}`} key={y}></div>
                        )}
                    </div>
                )
            }
        </div>
    }
    

}


export default Grid;