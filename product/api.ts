import axios from 'axios';
import Papa from 'papaparse';

import { Product } from './types';

export default {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQG1pOSbGxaJYzlOWF2t7KFyP5wtWo_EDS0crTllQtALvDDZBq7OwxvTDJwM4dmasW7wmNh6KFB443j/pub?output=csv',
        {
          responseType: 'blob',
        }
      )
      .then(
        (response) =>
          new Promise<Product[]>((resolve, reject) => {
            Papa.parse(response.data, {
              header: true,
              complete: (results) => {
                const products = results.data as Product[];

                return resolve(
                  products.map((product) => ({
                    ...product,
                    price: Number(product.price),
                  }))
                );
              },

              error: (error) => reject(error.message),
            });
          })
      );
  },
};
