import Layout from '@/components/Layout'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import AverageReview from '@/components/AverageReview'

const Category = ({ category }) => {

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
  const handleBusinessClick = (business) => {
    router.push(`/business/${business.slug}`)
  }

  return (
    <Layout>
      <Grid container sx={classes.root}>
        <Grid item xs={12} md={3}>
          Todo Filters 
        </Grid>
        <Grid item xs={12} md={9}>
          {category.business.map(business => (
            <Card sx={classes.card} onClick={() => handleBusinessClick(business)}>
              <Box>
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
          ))}
        </Grid>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps({ query: {slug}} ) {
  const { data } = await axios.get(`http://localhost:8000/categories?slug=${slug}`)
  return {
    props: {
      category: data.results[0] || null
    }
  }
}

export default Category