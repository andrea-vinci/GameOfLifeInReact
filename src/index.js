import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './grid';
import Controls from './controls'
import './styles.css'

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {size: 20};
    }

    render(){
        this.ref=React.createRef();
        return(
        <div className="game">
            <Controls 
                update={() => this.ref.current.update()}
                refresh={() => this.ref.current.refresh()}
                clean={()=>this.ref.current.clean()}
                onChangeSize={(s)=> this.setState({size:s})}
            ></Controls>
            <Grid rows={this.state.size} cols={this.state.size} ref={this.ref}></Grid>
        </div>);
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));
