import React from 'react';

import { Grid, GridItem } from '@chakra-ui/layout';
import { GetStaticProps } from 'next';

import api from '../product/api';
import { Product } from '../product/types';
interface Props {
  products: Product[];
}

const IndexRoute: React.FC<Props> = ({ products }) => (
  <Grid gap={6} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
    {products.map((product) => (
      <GridItem key={product.id} bg="gray.300">
        {product.title}
      </GridItem>
    ))}
  </Grid>
);

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    props: {
      products,
    },
  };
};

export default IndexRoute;
