import Layout from '@/components/Layout'
import { Button, Box, Card, Grid, List, ListItem, ListItemText, Typography, Divider, FormControl, InputLabel, Select, MenuItem, CardContent } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import AverageReview from '@/components/AverageReview'

const BusinessPage = ({business, AverageReviews}) => {

  const classes = {
    root: {
      marginTop: '75px',
      maxWidth: '95vw',
      padding: '0 25px'
    },

    addReview: {
      marginTop: '15px',
    },

    description: {
      paddingTop: '15px'
    },

    clearFilters: {
      marginTop: '15px'
    }
  }

  const [reviewFilter, setReviewFilter] = useState('')

  return (
    <Layout>
      <Grid container sx={classes.root}>
        <Grid item xs={12} md={6}>
          <Typography variant='h2'>{business.name}</Typography>
          <Typography variant='h4'>{business.price_range}</Typography>
          <AverageReview value={AverageReviews} />
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

      <Grid container sx={classes.root}>
        <Grid item xs={12} md={3}>
          <Box>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant='h5'>Filter the reviews</Typography>
                <Divider/>
              </Grid>

              <Grid item xs={12} sx={{marginTop: '15px'}}>
                <FormControl fullWidth>
                  <InputLabel id='reviews'>Review</InputLabel>
                  <Select
                    labelId='reviews'
                    id='reviewsComponent'
                    value={reviewFilter}
                    onChange={e => setReviewFilter(e.target.value)}
                  >
                    <MenuItem value={1}>1+ Stars</MenuItem>
                    <MenuItem value={2}>2+ Stars</MenuItem>
                    <MenuItem value={3}>3+ Stars</MenuItem>
                    <MenuItem value={4}>4+ Stars</MenuItem>
                    <MenuItem value={5}>5 Stars</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sx={{marginTop: '15px'}}>
                <Button variant='outline' color='secondary' xs={classes.clearFilters} onClick={() => setReviewFilter('')}>Clear Filters</Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={8} sx={{margin: 'auto'}}>
          {business && business.reviews && business.reviews.map(review => (
            reviewFilter <= review.stars && (
              <Card sx={{marginTop: '25px'}}>
                <Box>
                  <CardContent>
                    <AverageReview value={review.stars} />
                    <Typography variant='h5'>{review.title}</Typography>
                    <Typography variant='subtitle1'>{review.content}</Typography>
                  </CardContent>
                </Box>
              </Card>
            )            
          ))}
        </Grid>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps({ query: {slug}} ) {
  const { data } = await axios.get(`http://localhost:8000/businesses?slug=${slug}`)

  let avgReview = null
 

  if (data && data.results && data.results[0].reviews) {
    
    let totalReviewsStars = 0

    for (let i = 0; i < data.results[0].reviews.length; i++) {
      totalReviewsStars = totalReviewsStars + Number(data.results[0].reviews[i].stars)
    }

    const inverse = 1 / 2

    avgReview = Math.round((totalReviewsStars / data.results[0].reviews.length) / inverse) * inverse
     
  }

  return {
    props: {
      business: data.results[0] || null,
      AverageReviews: avgReview
    }
  }
}

export default BusinessPage