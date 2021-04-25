import React from 'react';

import { Grid, Link, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { GetStaticProps } from 'next';

import api from '../product/api';
import { Product } from '../product/types';
interface Props {
  products: Product[];
}

const parseCurrency = (value: number): string => {
  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });
};

const IndexRoute: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = React.useState<Product[]>([]);

  const text = React.useMemo(() => {
    return cart
      .reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`), ``)
      .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => (total += product.price), 0))}`);
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    setCart((cart) => cart.concat(product));
  };

  return (
    <Stack>
      <Grid gap={6} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
        {products.map((product) => (
          <Stack key={product.id} bg="gray.100">
            <Text>{product.title}</Text>
            <Text>{parseCurrency(product.price)}</Text>
            <Button colorScheme="primary" onClick={() => handleAddToCart(product)}>
              Agregar
            </Button>
          </Stack>
        ))}
      </Grid>

      {Boolean(cart.length) && (
        <>
          <Button
            isExternal
            as={Link}
            colorScheme="primary"
            href={`https://wa.me/5491150065693?text=${encodeURIComponent(text)}`}
          >
            Completar pedido
          </Button>
          <Text bg="primary.300" color="black">
            {text}
          </Text>
        </>
      )}
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    props: {
      products,
    },
  };
};

export default IndexRoute;
