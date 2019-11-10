import PRODUCTS from '../../data/dummy-data';
import DELETE_PRODUCT from '../actions/products';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {

  switch (action.type) {
    case DELETE_PRODUCT:
      console.log('action.pid', action);
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pid
        )
      };
  }

  // console.log(action.type);
  // switch (action.type) {
  //   case DELETE_PRODUCT:
  //     console.log('action.pid', action);
  //     return {
  //       ...state,
  //       userProducts: state.userProducts.filter(
  //         product => product.id !== action.pid
  //       ),
  //       availableProducts: state.availableProducts.filter(
  //         product => product.id !== action.pid
  //       )
  //     };
  // }
  return state;
};

