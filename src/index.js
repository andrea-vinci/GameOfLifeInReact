import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './grid';
import './styles.css'

class Game extends React.Component{
    constructor(props){
        super(props);
        this.ref=React.createRef();
    }

    render(){
        return(
        <div>
            <Grid rows={30} cols={30} ref={this.ref}></Grid>
            <button onClick={()=>this.ref.current.update()}>Play</button>
        </div>);
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));
