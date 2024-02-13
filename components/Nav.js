import { AppBar, IconButton, Typography, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'; 
import React from 'react'

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
        }
        
        
    }



  return (
    <>
        <AppBar position='static'>
            <Toolbar>
                <IconButton edge='start' sx={classess.menuButton} color='inherit' aria-label='menu'>
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' sx={classess.title}>
                    Local Reviews
                </Typography>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Nav