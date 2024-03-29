import { Grid, Card, CardHeader, Avatar, Typography, CardContent, TextField, Button, Snackbar } from '@mui/material'
import Layout from '@/components/Layout';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Login } from '@mui/icons-material';
import AuthenticationContext from '@/context/AuthenticationContext';

export default function LoginPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 

  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const { login, error, clearError } = useContext(AuthenticationContext)

  useEffect(() => {
    if(error) {
      setErrorMessage(error)
      setOpen(true)
      clearError()
    }
  }, [error])

  const classes = {
    root: {
      margin: '25px auto',
      maxWidth: '95vw'
    },

    categoryCard: {
      cursor: 'pointer'
    },

    form: {
        marginTop: '35px',
    }

  }
  
  const router = useRouter()

  

  const submitHandler = (e) => {
    e.preventDefault()
    login({username, password})
  }

  const handleClose = () => {
    setOpen(false)
  }
  
  return (
    <Layout>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        message={errorMessage}
        key={'top_center'}
        />
      <div>
        <Typography variant='h3'>Login</Typography>
        <Card>
            <CardContent>
                <form onSubmit={submitHandler}>
                    <div >
                        <TextField sx={{ marginTop: '20px'}} label='Username' fullWidth onChange={e => setUsername(e.target.value)} value={username}/>
                    </div>
                    <div>
                        <TextField sx={{ marginTop: '20px'}} label='Password' inputProps={{ 'type': 'password' }} fullWidth onChange={e => setPassword(e.target.value)} value={password}/>
                    </div>
                    <div>
                        <Button sx={{ marginTop: '20px', marginBottom: '20px'}} variant='contained' color='primary' type='submit'>Login</Button>
                    </div>
                    <div >
                        <Link href='/account/register'>
                           Don't have an account? Sign Up
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

// export async function getServerSideProps() {
//   const { data } = await axios.get('http://localhost:8000/categories')
//   return {
//     props: {
//       categories: data.results
//     }
//   }
// }
