import { Grid, Card, CardHeader, Avatar } from '@mui/material'
import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home({ categories }) {
  const classes = {
    root: {
      margin: '25px auto',
      maxWidth: '95vw'
    },

    categoryCard: {
      cursor: 'pointer'
    }


  }

  const router = useRouter()


  return (
    <Layout>
      <Grid container sx={classes.root} spacing={3}>
        {categories.map(category => (
          <Grid key={category.name} item xs={12} md={4}>
          <Card onClick={() => router.push(`/categories/${category.slug}`)} sx={classes.categoryCard}>
            <CardHeader
              avatar={
                <Avatar arial-label='category'>
                  C
                </Avatar>
              }
              title={`${category.name}`}
              subheader={`See all ${category.name} businesses`}
              />
          </Card>
        </Grid>
        ))}        
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get('http://localhost:8000/categories')
  return {
    props: {
      categories: data.results
    }
  }
}
