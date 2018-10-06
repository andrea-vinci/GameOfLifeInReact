import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './grid';
import Controls from './controls'
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
            <Controls 
                update={() => this.ref.current.update()}
                clean={()=>this.ref.current.clean()}
            ></Controls>
        </div>);
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));
