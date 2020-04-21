import React, {Component} from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

class DishDetails extends Component {
    constructor(props){
        super(props)

        // this.state = {
        //     dish : props.showDetails,
        //     comments: props.showDetails.comments
        // }
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
                <div></div>
            )
        }
    }

    renderComments(comments){
        if(comments != null){
            let list = comments.map((comments)=>{

                return(
                    <li key={comments.id} >
                        <div>
                            <p>{comments.comment}</p>
                            <p>--{comments.author},
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
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
                <p>No comment yet</p>
            )
        }
    }

    render(){

        return(
            <div className="row">
                {this.renderDishDetails(this.props.showDetails)}
                
                {this.renderComments(this.props.showDetails.comments)}

            </div>
        )
    }
}

export default DishDetails;