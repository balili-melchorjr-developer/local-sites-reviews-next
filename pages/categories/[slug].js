import Layout from '@/components/Layout'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Id = () => {
  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} md={3}>
          Todo Filters 
        </Grid>
        <Grid item xs={12} md={9}>
          <Card>
            <Box>
              <CardContent>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant='h5'>Business Name</Typography>
                    <Typography variant='subtitle1'>$$$</Typography>
                    <Link variant='subtitle1' href='http://localhost:3000'>Business Website</Link>
                    <Typography variant='subtitle1'>Business Phone</Typography>
                    <Typography variant='subtitle1'>Description</Typography>
                  </Grid>
                  <Grid item xs={6}>
                      <Typography variant='h5'>Todo Reviews</Typography>
                      <Typography variant='subtitle1'>Business Hours</Typography>
                      <Typography variant='subtitle1'>Address</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Id