import React from 'react'
import Box from './box'
import './styles.css'

export default class Grid extends React.Component{
    constructor(props){
        super(props);
        this.state = {boxes:[], refs:[]};
    }

    update = () => 
    {   
        this.state.boxes.forEach(f =>  f.ref.current.nextStep());
        this.state.boxes.forEach(f =>  f.ref.current.refresh());
    }
    
    clean = () => this.state.boxes.forEach(f => f.ref.current.clean());

    createBox(r,c,n){
        let ref = React.createRef();
        let position = r*n+c;
        let box = ( <Box key={position} position={position} size={n} 
                        boxes={this.state.boxes} ref={ref}></Box>);
        this.state.boxes.push(box);
        this.state.refs.push(ref);
        return box;
    }

    render(){
        let row_number= this.props.rows;
        let col_number = this.props.cols;
        let rows = Array(row_number).fill().map((_,r) => 
        (
            <div className="row" key={r}>
                {Array(col_number).fill().map((_, c)=>this.createBox(r, c, col_number))}
            </div>)
        );

        return (<div>{rows}</div>);
    }
}