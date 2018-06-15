import React, { Component } from 'react';
import axios from 'axios';

class About extends Component {
	constructor(props){
		super(props);
		this.state = {
			aboutInfoText: [],
			aboutInfoPhotos: []
		}
	}

	componentDidMount() {
		let context = this;
		// fetch data for the about section for this project
		axios.get(`http://localhost:3003/about/${this.props.projectId}`)
		.then(result => {
			let aboutInfoText = result.data[0];
			let aboutInfoPhotos = result.data[1];
			console.log('client side aboutInfoText', aboutInfoText);
			console.log('client side aboutInfoPhotos', aboutInfoPhotos);
			context.setState({aboutInfoText: aboutInfoText, aboutInfoPhotos: aboutInfoPhotos});
		})
		.catch(err => {
			// console.log('ERROR', err);
		})
	}

	render() {
		return (
			<div id="about-master-container">
				<div id="about-container">
					<h1 className="section-header">About</h1>
					{this.state.aboutInfoText.length > 0 &&
						<div>
							{this.state.aboutInfoText.map( (paragraph, index, paragraphArray) =>{
								return (
									<div key={'' + index}>
										<div>{paragraph}</div>
										{(index < paragraphArray.length - 1) && 
											<div className="image-container">
												<img src={this.state.aboutInfoPhotos[index]} />
											</div>
										}
									</div>
								)
							})}
						</div>
					}
				</div>
			</div>
		)
	}
}

export default About;