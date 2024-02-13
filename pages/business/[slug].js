import Layout from '@/components/Layout'
import { Button, Card, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import axios from 'axios'

const BusinessPage = ({business}) => {

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
    }
  }

  return (
    <Layout>
      <Grid container sx={classes.root}>
        <Grid item xs={12} md={6}>
          <Typography variant='h2'>{business.name}</Typography>
          <Typography variant='h4'>{business.price_range}</Typography>
          <Typography variant='subtitle'>Todo Review Component</Typography>

          <div sx={classes.addReview}>
            <Button variant='contained' color='primary'>Write a Review</Button>
          </div>

          <div sx={classes.description}>
            <Typography variant='p'>{business.description}</Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <List>
              <ListItem>
                <ListItemText primary='Website' secondary={business.website} />
              </ListItem>
              <ListItem>
                <ListItemText primary='Address' secondary={`${business.street_address} ${business.city}, ${business.region} ${business.postal_code} ${business.country}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary='Phone' secondary={business.phone} />
              </ListItem>
              <ListItem>
                <ListItemText primary='Hours' secondary={business.hours} />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps({ query: {slug}} ) {
  const { data } = await axios.get(`http://localhost:8000/businesses?slug=${slug}`)
  return {
    props: {
      business: data.results[0] || null
    }
  }
}

export default BusinessPage