import { Grid, Card, CardHeader, Avatar, Typography, CardContent, TextField, Button } from '@mui/material'
import Layout from '@/components/Layout';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Login } from '@mui/icons-material';
import AuthenticationContext from '@/context/AuthenticationContext';

export default function RegisterPage() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [password2, setPassword2] = useState('') 
  

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

//   const {login} = useContext(AuthenticationContext)

  const submitHandler = (e) => {
    e.preventDefault()
    // login({username, password})
  }
  
  return (
    <Layout>
      <div>
        <Typography variant='h3'>Register</Typography>
        <Card>
            <CardContent>
                <form onSubmit={submitHandler}>
                    <div >
                        <TextField sx={{ marginTop: '20px'}} label='Username' fullWidth onChange={e => setUsername(e.target.value)} value={username}/>
                    </div>
                    <div >
                        <TextField sx={{ marginTop: '20px'}} label='Email' fullWidth onChange={e => setEmail(e.target.value)} value={email}/>
                    </div>
                    <div>
                        <TextField sx={{ marginTop: '20px'}} label='Password' inputProps={{ 'type': 'password' }} fullWidth onChange={e => setPassword(e.target.value)} value={password}/>
                    </div>
                    <div>
                        <TextField sx={{ marginTop: '20px'}} label='Confirm Password' inputProps={{ 'type': 'password' }} fullWidth onChange={e => setPassword2(e.target.value)} value={password2}/>
                    </div>
                    <div>
                        <Button sx={{ marginTop: '20px', marginBottom: '20px'}} variant='contained' color='primary' type='submit'>Register</Button>
                    </div>
                    <div >
                        <Link href='/account/login'>
                           Already have an account? Sign In
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
