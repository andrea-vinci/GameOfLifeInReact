import React from 'react'
import './slider.css'

export default class Slider extends React.Component{

    constructor(props){
        super(props);
        this.state = {value:this.props.value};
    }

    handleSliderChange(event){
        this.setState({value: event.target.value})
        if(this.props.onValueChange){
            this.props.onValueChange(event.target.value);
        }
    }
    

    render(){
        return (
            <div>
                <p className="slider-title">{this.props.name}</p>
            <input type="range" 
            min={this.props.min} 
            max={this.props.max} 
            value={this.state.value} 
            onChange={(e) => this.handleSliderChange(e)}
            className="slider"/>
            </div>
        );
    }

}