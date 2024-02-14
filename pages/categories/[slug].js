import Layout from '@/components/Layout'
import { Box, Card, CardContent, Grid, Typography, Button, InputLabel, Select, FormControl, MenuItem, Divider  } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import AverageReview from '@/components/AverageReview'

const Category = ({ category, averageReviews }) => {

  const classes = {
    root: {
      marginTop: '75px',
      maxWidth: '95vw'
    },

    subitle: {
      color: 'grey',
    },

    card: {
      cursor: 'pointer'
    }
  }
  
  const router = useRouter()
  const [price, setPrice] = useState('')
  const [numReviews, setNumReviews] = useState('')
  const [avgReview, setAvgReview] = useState('')


  const handleBusinessClick = (business) => {
    router.push(`/business/${business.slug}`)
  }

  const handleClearFilters = () => {
    setPrice('')
    setNumReviews('')
    setAvgReview('')
  }

  return (
    <Layout>
      <Grid container sx={classes.root}>
        <Grid item xs={12} md={3}>
          <Box sx={{ margin: '0 25px'}}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant='h5'>Filter the Result</Typography>
                <Divider />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='price' sx={{ color: 'white'}}>Price</InputLabel>
                  <Select
                    labelId='price'
                    id='priceInput'
                    label='Price'
                    sx={{ color: 'white', borderColor: 'white', '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white'                   
                  },}}
                  onChange={e => setPrice(e.target.value)}
                  value={price}
                  >

                    <MenuItem value={'$'}>Very Cheap</MenuItem>
                    <MenuItem value={'$$'}>Cheap</MenuItem>
                    <MenuItem value={'$$$'}>Moderate</MenuItem>
                    <MenuItem value={'$$$$'}>Expensive</MenuItem>
                    <MenuItem value={'$$$$$'}>Very Expensive</MenuItem>
                  </Select>
                </FormControl>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='numReviews' sx={{ color: 'white'}}>Number of Reviews</InputLabel>
                  <Select
                    labelId='numReviews'
                    id='numReviewsInput'
                    label='Number of Reviews'
                    sx={{ color: 'white', borderColor: 'white', '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white'                   
                  },}}
                  onChange={e => setNumReviews(e.target.value)}
                  value={numReviews}
                  >
                    <MenuItem value={5}>5+</MenuItem>
                    <MenuItem value={10}>10+</MenuItem>
                    <MenuItem value={15}>15+</MenuItem>
                  </Select>
                </FormControl>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='avgReview' sx={{ color: 'white'}}>Average Review</InputLabel>
                  <Select
                    labelId='avgReview'
                    id='avgReviewInput'
                    label='Average Review'
                    sx={{ color: 'white', borderColor: 'white', '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white'                   
                  },}}
                  onChange={e => setAvgReview(e.target.value)}
                  value={avgReview}
                  > 
                    <MenuItem value={3}>3+ Stars</MenuItem>
                    <MenuItem value={4}>4+ Stars</MenuItem>
                    <MenuItem value={5}>5 Stars</MenuItem>
                  </Select>
                </FormControl>
                <Divider />
              </Grid>

            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          {category.business.map(business => (
            (!price || price === business.price_range) && (!numReviews || business.reviews.length >= numReviews) && (!avgReview || averageReviews[business.url] >= avgReview) && (
            <Card key={business.name} sx={classes.card} onClick={() => handleBusinessClick(business)}>
              <Box>
                {AverageReview}
                <CardContent>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant='h5'>{business.name}</Typography>
                      <Typography variant='subtitle1'>{business.price_range}</Typography>
                      <Link variant='subtitle1' href={business.website}>{business.website}</Link>
                      <Typography variant='subtitle1'>{business.phone}</Typography>
                      <Typography sx={classes.subitle} variant='subtitle1'>{business.description}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <AverageReview value={3.5} />
                        <Typography variant='subtitle1'>{business.hours}</Typography>
                        <Typography variant='subtitle1'>{business.street_address} {business.city}, {business.region} {business.postal_code} {business.country}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Box>
            </Card>
            )
          ))}
        </Grid>
        <Grid>
          <Button variant='outlined' color='secondary' sx={{ marginTop: '15px'}} onClick={handleClearFilters}>Clear Filter</Button>
        </Grid>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps({ query: {slug}} ) {
  const { data } = await axios.get(`http://localhost:8000/categories?slug=${slug}`)

  let avgReviews = {}

  if (data && data.results && data.results[0].business) {
    for (let i = 0; i < data.results[0].business.length; i++) {
      let totalReviewsStars = 0;
      for (let j = 0; j < data.results[0].business[i].reviews.length; j++) {
        totalReviewsStars = totalReviewsStars + Number(data.results[0].business[i].reviews[j].stars)
      }

      const inverse = 1 / 2

      avgReviews[data.results[0].business[i].url] = Math.round((totalReviewsStars / data.results[0].business[i].reviews.length) / inverse) * inverse
    }
  }

  console.log(avgReviews)


  return {
    props: {
      category: data.results[0] || null,
      averageReviews: avgReviews
    }
  }
}

export default Category