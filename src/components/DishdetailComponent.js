import React, {Component} from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

class DishDetails extends Component {
    constructor(props){
        super(props)

    }

    renderDishDetails(dish){
        if(dish != null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" object src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle> {dish.name} </CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div>         
            )
        }
        else{
            return(
                <div className="col-12 col-md-5 m-1">
                    <h5>No item Selected</h5>
                </div>
            )
        }
    }

    renderComments(comments){
        if(comments != null){
            let list = comments.map((comment)=>{

                return(
                    <li key={comment.id} >
                        <div>
                            <p>{comment.comment}</p>
                            <p>--{comment.author},
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                    </li>

                )
            })
            return(
                <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {list}
                        </ul>

                    </div>
            )
        }
        else{
            return(
                <div className="col-12 col-md-5 m-1">
                    <h5>No comment yet</h5>
                </div>
            )
        }
    }

    render(){

        return(
            <div className="container">
            <div className="row">
                {this.renderDishDetails(this.props.dish)}
                
                {this.props.dish && this.renderComments(this.props.dish.comments)}

            </div>
            </div>
        )
    }
}

export default DishDetails;