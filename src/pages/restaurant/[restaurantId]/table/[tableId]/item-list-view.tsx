import CategoryList from '@components/category/category-list';
import Layout from '@components/layout/layout-two';
import ProductList from '@components/product/product-list';
import { useLocalStorage } from 'react-use';

const ItemListView = () => {
  const [activeRestaurant] = useLocalStorage('active_restaurant');
  const [activeCategory, setActiveCategory] =
    useLocalStorage<string>('active_category');
  const defaultCategory = 'all';

  return (
    <Layout displaySearchIcon={true} displayGridButton={true}>
      {/* <div className="mb-[150px]">
        <div className="sticky top-[60px] lg:top-[77px] z-20 bg-white">
          <CategoryList
            activeCategory={activeCategory || defaultCategory}
            setActiveCategory={setActiveCategory}
            restaurantId={`${activeRestaurant}`}
          />
        </div>
        <ProductList
          restaurantId={`${activeRestaurant}`}
          activeCategory={activeCategory || defaultCategory}
          setActiveCategory={setActiveCategory}
        />
      </div> */}
    </Layout>
  );
};

export default ItemListView;
