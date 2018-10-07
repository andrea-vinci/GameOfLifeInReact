import React from 'react'
import './slider.css'

export default class Slider extends React.Component{

    constructor(props){
        super(props);
        this.state = {value:2};
    }

    handleSliderChange(event){
        this.setState({value: event.target.value})
        if(this.props.onValueChange){
            this.props.onValueChange(event.target.value);
        }
    }
    

    render(){
        return (
            <input type="range" min="1" max="20" value={this.state.value} 
            onChange={(e) => this.handleSliderChange(e)}
            className="slider"/>
        );
    }

}