import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardText,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Row,
	Label,
	Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;

class CommentFormComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}
	handleSubmit(values) {
		alert("Submitted your comment as: " + JSON.stringify(values));
	}
	render() {
		return (
			<div>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-pencil"></span> Submit Comment
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label className="col-12" htmlFor="rating">
									Rating
								</Label>
								<Col>
									<Control.select
										model=".rating"
										name="rating"
										id="rating"
										className="form-control"
										validators={{ required }}
									>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
									<Errors
										className="text-danger"
										model=".rating"
										show="touched"
										messages={{
											required: "Required",
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label className="col-12" htmlFor="name">
									Your Name
								</Label>
								<Col>
									<Control.text
										model=".name"
										id="name"
										name="name"
										placeholder="You Name"
										className="form-control"
										validators={{
											required,
											minLength: minLength(3),
											maxLength: maxLength(15),
										}}
									/>
									<Errors
										className="text-danger"
										model=".name"
										show="touched"
										messages={{
											required: "Required",
											minLength: "Must be greater than 2 characters",
											maxLength: "Must be 15 characters or less",
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="comment" className="col-12">Comment</Label>
								<Col>
								<Control.textarea model=".comment" id="comment" name="comment" rows='6' className="form-control" validators={{required}} />
								<Errors className="text-danger"
								model=".comment" show='touched' messages={{
									required: "Required"
								}}/>
								</Col>
							</Row>
							<Row className="form-group">
                                <Col>
                                    <Button onClick={this.toggleModal} type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

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
				<CommentFormComponent />
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
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/menu">Menu</Link>
					</BreadcrumbItem>

					<BreadcrumbItem>{props.dish.name}</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3> {props.dish.name} </h3>
					<hr />
				</div>
			</div>
			<div className="row">
				<RenderDish dish={props.dish} />
				{props.dish && <RenderComments comments={props.comments} />}
			</div>
		</div>
	);
};

export default DishDetail;
