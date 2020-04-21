import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText} from 'reactstrap';
import DishDetails from './DishDetailsComponent';

class Menu extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedDish: null
        }
    }
    onDishSelect(dish){
        this.setState({ selectedDish: dish});
        console.log(dish.comments[0].author);
    }
    renderDish(dish){
        if(dish != null){
            return(
                <Card>
                    <CardImg width='100%' object src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle> {dish.name} </CardTitle>
                        <CardText> {dish.description} </CardText>
                    </CardBody>
                </Card>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

    render(){
        const menu = this.props.dishes.map((dish) => {
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width='100%' object src={dish.image} alt={dish.name}/>
                        <CardImgOverlay body className="ml-5">
                            <CardTitle heading>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            )
        }) ;

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div>
                    {
                        this.state.selectedDish && <DishDetails showDetails={this.state.selectedDish}/>
                    }
                    
                </div>
            </div>
        );
    }
}

export default Menu;