import { AppBar, IconButton, Typography, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'; 
import React, {useState}from 'react'
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';

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

	const toggleDrawer = (value) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.ket === 'Shift')) {
			return
		}

		setToggle(value)
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