import { AppBar, IconButton, Typography, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'; 
import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';
import AuthenticationContext from '@/context/AuthenticationContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Nav = () => {

	const classess = {
		root: {
		flexGrow: 1,
		},

		menuButton: {
		marginRight:  '20px'                      
		},

		title: {
			flexGrow: 1,
		},

	}

	const [toggle, setToggle] = useState(false)
	const router = useRouter()

	const {user, logout} = useContext(AuthenticationContext)

	const toggleDrawer = (value) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.ket === 'Shift')) {
			return
		}

		setToggle(value)
	}

	const handleLogout = async e => {
		e.preventDefault()
		await logout()
	}

	return (
		<>
			<AppBar position='static'>
				<Toolbar>
					<IconButton edge='start' sx={classess.menuButton} color='inherit' aria-label='menu' onClick={toggleDrawer(true)}>
					<MenuIcon />
					</IconButton>
					<Drawer
						anchor={'left'}
						open={toggle}
						onClose={toggleDrawer(!toggle)}
					>

						<div sx={{padding: '400px!important'}}>
							<List>
								<ListItem button onClick={() => router.push('/')}>
									<ListItemIcon><HomeIcon /></ListItemIcon>
									<ListItemText primary='Home' />
								</ListItem>
								{user ? (
									<ListItem button onClick={handleLogout}>
										<ListItemIcon><AccountCircleIcon /></ListItemIcon>
										<ListItemText primary='Sign Out'  />
									</ListItem>	
								) : (
									<>
										<ListItem button onClick={() => router.push('/account/login')}>
											<ListItemIcon><AccountCircleIcon /></ListItemIcon>
											<ListItemText primary='Sign In' />
										</ListItem>	

										<ListItem button onClick={() => router.push('/account/register')}>
											<ListItemIcon><AccountCircleIcon /></ListItemIcon>
											<ListItemText primary='Register' />
										</ListItem>	
									</>
								)}													
								
							</List>
						</div>
					</Drawer>

					
					<Typography variant='h6' sx={classess.title}>
						Local Reviews
					</Typography>
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Nav