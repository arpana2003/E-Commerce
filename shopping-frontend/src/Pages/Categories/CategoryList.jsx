import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "../../Components/CategoryCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getCategory } from "../../Redux/Slices/CategorySlice";
import { useEffect } from "react";

function CategoryList() {
  const categoryData = useSelector((state) => state?.category);

  const dispatch = useDispatch();

  async function loadCategory() {
    await dispatch(getCategory());
  }

  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <HomeLayout>
      <div className="pt-12 pl-20 flex flex-col gap-10 text-white min-h-[90vh]">
        <h1>Explore Essentials made by</h1>
        <span> Industry experts</span>
        <div className="mb-10 flex flex-wrap gap-14">
          {categoryData && Array.isArray(categoryData) ? (
            categoryData.map((element) => {
              return <CategoryCard key={element._id} data={element} />;
            })
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default CategoryList;
