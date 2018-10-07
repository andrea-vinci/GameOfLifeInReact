import React from 'react'
import Box from './box'
import './styles.css'

export default class Grid extends React.Component{

    refresh = async () => this.boxes.forEach( async (f) => await f.ref.current.refresh());

    update = () => this.boxes.forEach(f =>  f.ref.current.nextStep());
    
    clean = () => this.boxes.forEach(f => f.ref.current.clean());

    createBox(r,c,cols){
        let ref = React.createRef();
        let position = r*cols+c;
        let box = ( <Box key={position} position={position} cols={cols} 
                        boxes={this.boxes} ref={ref}></Box>);
        this.boxes.push(box);
        this.refs.push(ref);
        return box;
    }

    render(){
        this.boxes = [];
        this.refs = [];
        let row_number= this.props.rows;
        let col_number = this.props.cols;
        let rows = Array(row_number).fill().map((_,r) => 
        (
            <div className="row" key={r}>
                {Array(col_number).fill().map((_, c)=>this.createBox(r, c, col_number))}
            </div>)
        );

        return (<div className="grid">{rows}</div>);
    }
}