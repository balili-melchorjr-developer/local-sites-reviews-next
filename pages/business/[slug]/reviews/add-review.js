import Layout from '@/components/Layout'
import { Button, Card, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import axios from 'axios'
import AverageReview from '@/components/AverageReview'
import { useState } from 'react'

const AddReviewPage = ({ business }) => {

  const [ stars, setStarts] = useState('3')
  const [ title, setTitle] = useState('')
  const [ comment, setComment] = useState('')

  const classes = {
    root: {
      marginTop: '75px',
      maxWidth: '95vw'
    },

    addReview: {
      marginTop: '15px',
    },

    description: {
      paddingTop: '15px'
    },
    // form: {
    //     [theme.breakpoints.down('sm')]: {
    //         width: '100%',
    //         padding: '0 10px',
    //     },
    //     [theme.breakpoints.up('md')]: {
    //         width: '50%'
    //     },
    //     margin: '0 auto'
    // }
    input: {
      marginTop: '30px'
    }
  }

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  const submitHandler = () => {
    console.log(stars)
    console.log(title)
    console.log(comment)

    const csrftoken = getCookie('csrftoken');

    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    }

  const body = {
    title,
    content: comment,
    stars,
    business: business.url
  }

  const res = axios.post('http://localhost:8000/reviews/', body, config)
  
  console.log(res)

}

  

  return (
    <Layout>
      <div>
        {/* {TODO} */}
        <Typography variant='h3'>Creating a Review For: {business.name}</Typography>
      </div>

      <div sx={classes.form}>
        <FormControl fullWidth sx={classes.input}>
            <InputLabel id='stars'>Stars Rating Out of 5</InputLabel>
            <Select
                labelId='stars'
                id='starsComponent'
                label='Stars'
                sx={{color: 'white'}}
                onChange={e => setStarts(e.target.value)}
                value={stars}
            >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={1.5}>1.5</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={2.5}>2.5</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={3.5}>3.5</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={4.5}>4.5</MenuItem>
                <MenuItem value={5}>5</MenuItem>
            </Select>
        </FormControl>

        <FormControl fullWidth sx={classes.input}>
            <TextField 
                label='Title'
                id='titleComponent'
                sx={{color: 'white'}}
                onChange={e => setTitle(e.target.value)}
                value={title}
            />
        </FormControl>

        <FormControl fullWidth sx={classes.input}>
            <TextField
                label='Tell us about your experience here'
                id='commentComponent'
                multiline
                minRows={4}
                sx={{color: 'white'}}
                onChange={e => setComment(e.target.value)}
                value={comment}
            />
        </FormControl>

        <Button sx={classes.input} variant='contained' color='primary' onClick={submitHandler}>Submit Review</Button>
    
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query: {slug}} ) {
  const { data } = await axios.get(`http://localhost:8000/businesses?slug=${slug}`)
 
  return {
    props: {
      business: data.results[0] || null,
    }
  }
}

export default AddReviewPage