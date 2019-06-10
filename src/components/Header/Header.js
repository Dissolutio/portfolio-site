import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import HeaderAvatar from './HeaderAvatar'
import MainNav from './MainNav'
import githubMark from 'assets/GitHub-Mark-Light-32px.png'
import linkedinIcon from 'assets/linkedin-icon.png'

const Header = ({ data }) => (
	<HeaderContainer>
		<HeaderContent>
			<HeaderAvatar />
			<h1>John Moen</h1>
			<h2>Full Stack Developer</h2>
			<h3>Austin, TX</h3>
			<a style={{ marginRight: '10px', boxShadow: 'none' }} href="https://github.com/Dissolutio">
				<img src={githubMark} />
			</a>
			<a style={{ boxShadow: 'none' }} href="https://www.linkedin.com/in/john-moen-77a90a149/">
				<img src={linkedinIcon} style={{ height: '36px', width: '36px' }} />
			</a>
			<MainNav />
		</HeaderContent>
		<HeroBackgroundDiv>
			<HeroBackgroundImg fluid={data.background.childImageSharp.fluid} />
		</HeroBackgroundDiv>
	</HeaderContainer>
)

const HeaderContent = styled.div`
	flex-grow: 1;
	flex-shrink: 0;
	font-size: 1rem;
	width: 100%;
	height: 100%;
	padding: 1rem;
	background-color: rgba(34, 34, 35, 0.3);
	border-radius: 3em;
	h1 {
		font-size: 1.6rem;
	}
	h2 {
		font-size: 1.4rem;
	}
`
const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	text-align: right;
	padding: 2rem;
	color: ${props => props.theme.color.white};
	height: 100%;
	background-color: rgba(47, 47, 47, 0.7);
`
const HeroBackgroundDiv = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
`
const HeroBackgroundImg = styled(Img)`
	width: 100%;
	height: 100%;
`

export default Header
