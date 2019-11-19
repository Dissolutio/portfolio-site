import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

export default class MainNav extends Component {
	render() {
		return (
			<nav>
				<ul>
					<li>
						<StyledLink to="/">Home</StyledLink>
					</li>
					<li>
						<StyledLink to="/about">About</StyledLink>
					</li>
					<li>
						<StyledLink to="/blog">Blog</StyledLink>
					</li>
				</ul>
			</nav>
		)
	}
}
const StyledLink = styled(Link)`
	text-decoration: none;
	font-size: 1.1rem;
	color: ${props => props.theme.color.blue5};
	border: none;
	box-shadow: none;
	border-bottom: 1px solid ${props => props.theme.color.blue5};
	&:visited {
		color: ${props => props.theme.color.blue5};
	}
	&:hover {
		border-bottom: 3px dashed ${props => props.theme.color.blue5};
		color: ${props => props.theme.color.blue5};
	}
`
