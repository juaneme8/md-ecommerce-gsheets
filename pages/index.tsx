import React from 'react';

import { Grid, Link, Stack, Text, Button, Flex } from '@chakra-ui/react';
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
    <Stack spacing={6}>
      <Grid gap={6} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
        {products.map((product) => (
          <Stack key={product.id} bg="gray.100" borderRadius="md" padding={4}>
            <Stack spacing={1}>
              <Text>{product.title}</Text>
              <Text color="green.500" fontSize="sm">
                {parseCurrency(product.price)}
              </Text>
            </Stack>
            <Button colorScheme="primary" size="sm" variant="outline" onClick={() => handleAddToCart(product)}>
              Agregar
            </Button>
          </Stack>
        ))}
      </Grid>

      {Boolean(cart.length) && (
        <Flex align="center" bottom={4} justify="center" position="sticky">
          <Button
            isExternal
            as={Link}
            colorScheme="whatsapp"
            href={`https://wa.me/5491150065693?text=${encodeURIComponent(text)}`}
          >
            Completar pedido ({cart.length} productos)
          </Button>
        </Flex>
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
    revalidate: 10,
  };
};

export default IndexRoute;
