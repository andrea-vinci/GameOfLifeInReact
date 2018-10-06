import React from 'react'
import './styles.css'

export default class Box extends React.Component {

    constructor(props){
        super(props);
        this.state = {isAlive:false};
    }

    isAlive = () => this.state.isAlive;
    getRow = () => (this.props.position-this.getCol())/this.props.size;
    getCol = () => this.props.position%this.props.size;

    getNeighborhood(r, c, n){
        return [
            (r-1)*n+c-1,    (r-1)*n+c,  (r-1)*n+c+1,
            r*n+c-1,                    r*n+c+1,
            (r+1)*n+c-1,    (r+1)*n+c,  (r+1)*n+c+1]
        .map((p) => this.props.boxes[p])
        .map((box) => box ? box.ref.current.isAlive() : false);
    }
    
    update(){
        let num_alive = this
                .getNeighborhood(this.getRow(), this.getCol(), this.props.size)
                .map((isAlive)=> isAlive ? 1 : 0)
                .reduce((prev,next) => prev + next,0);

        if(this.isAlive()){
            if(num_alive <2) this.setState({isAlive:false});
            else if(num_alive<=3) this.setState({isAlive:true});
            else this.setState({isAlive:false});
        }
        else if(num_alive===3) this.setState({isAlive:true});
    }

    getClass(){
        if(this.state.isAlive) {return "box black";}
        return "box white";
    }

    changeStatus(){
        this.setState({isAlive:!this.state.isAlive});
    }

    render(){
        return (<div className={this.getClass()} 
                    onClick={()=>this.changeStatus()}>
                </div>);
    }
}