import React from 'react'
import './styles.css'

export default class Box extends React.Component {

    constructor(props){
        super(props);
        this.state = {isAlive:false};
        this.nextStepAlive = false;
    }

    isAlive = () => this.state.isAlive;
    getRow = () => (this.props.position-this.getCol())/this.props.cols;
    getCol = () => this.props.position%this.props.cols;

    getNeighborhood(r, c, cols){
        let n_row=this.props.boxes.length/cols;
        let r1 = ((r-1+n_row)%n_row); let c1 = (c-1+cols)%cols;
        let r2 = ((r+n_row)%n_row);   let c2 = (c+cols)%cols;
        let r3 = ((r+1+n_row)%n_row); let c3 = (c+1+cols)%cols;
        return [
            r1*cols+c1, r1*cols+c2, r1*cols+c3,
            r2*cols+c1,            r2*cols+c3,
            r3*cols+c1, r3*cols+c2, r3*cols+c3]
        .map((p) => this.props.boxes[p])
        .map((box) => box ? box.ref.current.isAlive() : false);
    }
    
    nextStep(){
        let num_alive = this
        .getNeighborhood(this.getRow(), this.getCol(), this.props.cols)
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