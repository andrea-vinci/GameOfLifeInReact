import React from 'react'

export default class Controls extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {canPlay: true};
    }

    update = () => this.props.update()
    
    playStop(){
        if(this.state.canPlay){
            this.interval = setInterval(this.update, 1000);
        }
        else{
            clearInterval(this.interval);
        }
        this.setState({canPlay:!this.state.canPlay});
      }

    render(){
        return (<div >
            <button className="control" onClick={() => this.update()}>Step</button>
            <button className="control" onClick={() => this.props.clean()}>Clean</button>
            <button className="control" onClick={() => this.playStop()}>
            {this.state.canPlay ? "Play" : "Stop"}</button>
        </div>);
    }
}