import Container from '@components/ui/container';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import Alert from '@components/ui/alert';
import FetchMenuItemList from './fetchMenuItemList'

type PropsType = {
  activeCategory: string | number;
  setActiveCategory: Function;
  restaurantId: string | number;
  categoryRef?: any;
  setChangeMenu: Function;
};

const CategoryList = ({
  activeCategory,
  setActiveCategory,
  restaurantId,
  categoryRef,
}: PropsType) => {

  const { data, isLoading, isError, error } = useCategoriesQuery(restaurantId);
 
  console.log(data)
  
  if (isLoading) return <div className="pt-2">Loading...</div>;
  if (isError) {
    return (
      <Alert
        message={error?.response?.data?.message || 'Something went wrong'}
        className="mb-14 3xl:mx-3.5"
      />
    );
  }


  return (
    <Container>
      <div className="flex justify-center w-100 mt-5 pt-[20px] pb-[10px]">
        <div  className="flex flex-wrap justify-center gap-x-4 gap-y-4 w-100 py-2 inline-block md:py-4 catgory-list-cntr hide-scroll-bar">
          
          <div className={`flex flex-col justify-center items-center singleCategory bg-gray-100 rounded w-36 pt-4
          ${
            activeCategory === 'all'
              ? 'border-2 border-red-300'
              : 'border-2 border-gray-100'
          }`}
          onClick={() => {setActiveCategory('all');}}
          >
            <img src="https://app.restrox.co/static/media/aaaaa.efd0c92d.jpg" alt="category image"
            style={{width: '45%'}}/>
          <span
            className={`px-6 py-2 rounded cursor-pointer text-sm w-36 text-left`}
          >
            <span className='font-bold' >All </span><br />
            <FetchMenuItemList restaurantId={restaurantId} categoryId = {'all'} /> items
          </span>
          </div>

          {data &&
            data.map((category, index) => {
              return (
                <div className={`flex flex-col justify-center items-center bg-gray-100 singleCategory rounded w-36 pt-4
                ${
                  activeCategory === category._id
                    ? 'border-2 border-red-300'
                    : 'border-2 border-gray-100'
                }
                `} onClick={() => {setActiveCategory(category._id);}}>
            <img src={category.coverImage || "https://app.restrox.co/static/media/aaaaa.efd0c92d.jpg"} alt="category image"
            style={{width: '45%'}}/>
                <span
                  ref={activeCategory === category._id ? categoryRef : null}
                  key={`category${index}`}
                  className={`px-6 py-2 rounded cursor-pointer text-sm w-36 text-left`}
                  
                >

                <span className='font-bold'>{category.categoryName}</span><br />
                {/* {arrayOfCategory[index]} items  */}
                <FetchMenuItemList restaurantId={restaurantId} categoryId = {category._id} /> items
                  </span>
                  </div>
              );
            })}
        </div>
      </div>
    </Container>
  );
};
export default CategoryList;
