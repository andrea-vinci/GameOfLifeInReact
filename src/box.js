import React from 'react'
import './styles.css'

export default class Box extends React.Component {

    constructor(props){
        super(props);
        this.state = {isAlive:false};
        this.nextStepAlive = false;
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
    
    nextStep(){
        let num_alive = this
        .getNeighborhood(this.getRow(), this.getCol(), this.props.size)
        .map((isAlive)=> isAlive ? 1 : 0)
        .reduce((prev,next) => prev + next,0);

        if(this.isAlive()){
            if(num_alive <2) this.nextStepAlive = false; 
            else if(num_alive<=3) this.nextStepAlive = true;
            else this.nextStepAlive = false;
        }
        else if(num_alive===3) this.nextStepAlive = true;
    }

    refresh(){
        if(this.nextStepAlive !== this.state.isAlive)
            this.setState({isAlive: this.nextStepAlive});
    }

    clean() {
        this.setState({isAlive: false});
        this.nextStepAlive = false;
    }

    getClass(){
        if(this.state.isAlive) {return "box black";}
        return "box white";
    }

    changeStatus(){
        this.setState({isAlive:!this.state.isAlive});
    }

    onMouseOver = (e) =>{
        e.preventDefault();
        if(e.buttons===1)this.changeStatus();
    }

    render = () => (<div className={this.getClass()} 
                    onClick={()=>this.changeStatus()}
                    onMouseOver={this.onMouseOver}
                    onMouseDown={(e)=> e.preventDefault() }
                    >
                    
                </div>);
    
}