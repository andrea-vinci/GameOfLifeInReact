import React from 'react'
import Slider from './Helpers/slider'

export default class Controls extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {canPlay: true};
        this.speed=1/2;
    }

    update = () => {
        this.props.update();
        this.props.refresh();
    }
    
    playStop(){
        if(this.state.canPlay){
            this.props.update();
            this.interval = setInterval(this.update, 2000*this.speed);
        }
        else{
            clearInterval(this.interval);
        }
        this.setState({canPlay:!this.state.canPlay});
      }

    render(){
        return (<div>
            <button className="control" onClick={() => this.update()}>Step</button>
            <button className="control" onClick={() => this.props.clean()}>Clean</button>
            <button className="control" onClick={() => this.playStop()}>{this.state.canPlay ? "Play" : "Stop"}</button>
            <Slider onValueChange={(v)=>this.speed=1/v}></Slider>
        </div>);
    }
}