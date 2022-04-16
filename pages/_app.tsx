import { Box, ChakraProvider, Container, Divider, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import theme from '../theme';
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container backgroundColor="gray.800" borderRadius="sm" boxShadow="md" maxWidth="container.xl" padding={4}>
          <VStack mb={4}>
            <Image borderRadius="9999" src="assets/avatar.jpg" />
            <Heading>Juaneme8</Heading>
            <Text>El almacén de juaneme8</Text>
          </VStack>
          <Divider marginY={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;
