import { GetStaticProps } from 'next';
import React from 'react';
import { Product } from '../product/types';
import api from '../product/api';
interface Props {
	products: Product[];
}

const IndexRoute: React.FC<Props> = ({ products }) => <div>{JSON.stringify(products)}</div>;

export const getStaticProps: GetStaticProps = async () => {
	const products = await api.list();
	return {
		props: {
			products,
		},
	};
};

export default IndexRoute;
