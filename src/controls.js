import React from 'react'
import Slider from './Helpers/slider'
import './controls.css'

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

    changeSize(v){
        if(this.props.onChangeSize)
            this.props.onChangeSize(parseInt(v));
    }

    render(){
        return (<div className="controls">
            <div className="control-container control-slider">
                <Slider name="size" min={10} max={30} value={15} 
                    onValueChange={(v)=>this.changeSize(v)}></Slider>
            </div>
            <div className="control-container control-buttons">
                <button className="control" onClick={() => this.update()}>Step</button>
                <button className="control" onClick={() => this.props.clean()}>Clean</button>
                <button className="control" onClick={() => this.playStop()}>{this.state.canPlay ? "Play" : "Stop"}</button>
            </div>
            <div className="control-container control-slider">
                <Slider className="control-container" 
                    name="speed" onValueChange={(v)=>this.speed=1/v} 
                    min={1} max={50} value={10}></Slider>
            </div>
        </div>);
    }
}