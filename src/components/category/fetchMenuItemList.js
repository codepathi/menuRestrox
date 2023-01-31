
import { useProductByCategoryQuery } from '@framework/product/get-all-products-by-category';
import {useState, useEffect} from 'react'



const FetchMenuItemList = ({restaurantId, categoryId}) => {

  // Then we create variable of type DataFetchingParamsType and set state
    let initialDataFetchingParams = {
    categoryId: categoryId,
    restaurantId: restaurantId,
    lastItemDate: null,
    isEnabledQuery: true,
    isInitialDataLoading: true,
  };

  const categoryData = useProductByCategoryQuery(initialDataFetchingParams)

    return ( <>
    {categoryData?.data?.menuItemList?.length || "0"}
    </> );
}
 
export default FetchMenuItemList;