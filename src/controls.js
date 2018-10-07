import React from 'react'
import Slider from './Helpers/slider'

export default class Controls extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {canPlay: true};
        this.speed=1/2;
    }

    delay = (timeout)=> new Promise((resolve) => setTimeout(resolve,timeout));

    update = async () => {
        this.props.update();
        await this.props.refresh();
    }
    
    play = async () =>{
       while(!this.state.canPlay){
            let wait = this.delay(2000*this.speed);
            this.props.update();
            await this.props.refresh();
            await wait;
        }
    };

    playStop(){
        this.setState({canPlay:!this.state.canPlay},this.play);
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