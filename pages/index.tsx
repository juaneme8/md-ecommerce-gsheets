import { GetStaticProps } from 'next';
import React from 'react';
import { Product } from '../product/types';

interface Props {
	products: Product[];
}

const IndexRoute: React.FC<Props> = () => <div>{`<IndexRoute! />`}</div>;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			products: [],
		},
	};
};

export default IndexRoute;
