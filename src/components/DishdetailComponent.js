import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";

const RenderDish = ({ dish }) => {
	if (dish != null) {
		return (
			<div className="col-12 col-md-5 m-1">
				<Card>
					<CardImg width="100%" object src={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle> {dish.name} </CardTitle>
						<CardText> {dish.description} </CardText>
					</CardBody>
				</Card>
			</div>
		);
	} else {
		return (
			<div className="col-12 col-md-5 m-1">
				<h5>No item Selected</h5>
			</div>
		);
	}
};

const RenderComments = ({ comments }) => {
	if (comments != null) {
		let list = comments.map((comment) => {
			return (
				<li key={comment.id}>
					<div>
						<p>{comment.comment}</p>
						<p>
							--{comment.author},
							{new Intl.DateTimeFormat("en-US", {
								year: "numeric",
								month: "short",
								day: "2-digit",
							}).format(new Date(Date.parse(comment.date)))}
						</p>
					</div>
				</li>
			);
		});
		return (
			<div className="col-12 col-md-5 m-1">
				<h4>Comments</h4>
				<ul className="list-unstyled">{list}</ul>
			</div>
		);
	} else {
		return (
			<div className="col-12 col-md-5 m-1">
				<h5>No comment yet</h5>
			</div>
		);
	}
};

const DishDetail = (props) => {
	return (
		<div className="container">
			<div className="row">
				<RenderDish dish={props.dish} />
				{props.dish && <RenderComments comments={props.dish.comments} />}
			</div>
		</div>
	);
};

export default DishDetail;
