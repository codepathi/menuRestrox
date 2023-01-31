import Layout from '@components/layout/layout-two';
import CategoryList from '@components/category/category-list';
import Container from '@components/ui/container';
import ProductsListByCategory from '@components/category/product-list-by-category';
import { useLocalStorage, useSessionStorage } from 'react-use';
import CategoryGridBlock from '@components/common/category-grid-block';
import HeaderDashboardBanner from '@components/dashboard-banner/dashboard-header-banner';
import SearchItem from '@components/search/search-item';
import { useState, useEffect, useRef, createRef } from 'react';
import BillTable from '@components/bill/bill-table';
import CartMenu from '@components/cart/cartMenu';
import Bill from '@components/cart/bill';

const ProductGridView = () => {
  const [activeRestaurant] = useLocalStorage('active_restaurant');
  const [activeCategory, setActiveCategory] =
    useSessionStorage<string>('active_category');
  const defaultCategory = 'all';
  // const categoryRef = useRef<any>(null);
  const bottomRef = createRef<HTMLDivElement>();

  const scrollToBottom = () => {
    if (bottomRef.current) {
      window.scrollTo(0, bottomRef.current.offsetTop);
    }
 };


  const [changeMenu, setChangeMenu] = useState('categories');

  // useEffect(() => {
  //   categoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [activeCategory]);

  return (
    <Layout displayGridButton={false} displayFullLogo={false}>
      <div className="mb-[150px]">
        <Container>
          <HeaderDashboardBanner />
          <SearchItem />
          {/* <CategoryGridBlock
            setActiveCategory={setActiveCategory}
            restaurantId={`${activeRestaurant}`}
            className="mt-4"
          /> */}
        </Container>


        <div
        className="flex flex-col w-100 gap-y-2">
          <div style={{width: '95%', margin: 'auto'}} className="sticky top-[60px] lg:top-[77px] z-20 bg-white flex justify-around items-center mt-10 border-b-2 border-black-100" ref={bottomRef}>
          <div className={`px-6 py-2 ${changeMenu === 'dishes' && 'border-b-2 border-red-600 text-red-600'}`} onClick={() => setChangeMenu('dishes')}>Dishes</div>
          <div className={`px-6 py-2 ${changeMenu === 'categories' && 'border-b-2 border-red-600 text-red-600'}`} onClick={()=>setChangeMenu('categories')}>Categories</div>
          <div className={`px-6 py-2 ${changeMenu === 'bills' && 'border-b-2 border-red-600 text-red-600'}`} onClick={()=>setChangeMenu('bills')}>Your Bills</div>
          </div>
          
          <div>

          {/* Show dishes if changeMenu = dishes, show categories if changeMenu = categories & show bills if changeMenu = bills  */}

            {
              changeMenu === 'dishes' ? (<>
              <Container>
              <ProductsListByCategory
                activeCategory={activeCategory || defaultCategory}
                restaurantId={`${activeRestaurant}`}
              />
              </Container>
              
              </>)
              :changeMenu === 'categories' ? (<>
                <CategoryList
                  activeCategory={activeCategory || defaultCategory}
                  setActiveCategory={setActiveCategory}
                  restaurantId={`${activeRestaurant}`}
                  // categoryRef={categoryRef}
                  setChangeMenu={setChangeMenu}
                />
              </>)
              :changeMenu == 'bills' ? (<>
              <div style={{width: '100vw'}}>
              <Bill />
              </div>
              </>)
              :(<></>)
            }
          </div>
          
       
        </div>

        
      </div>
    </Layout>
  );
};

export default ProductGridView;
