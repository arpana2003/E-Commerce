import { useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import ItemCard from "../../Components/ItemCard.jsx";
import { useEffect } from "react";
import { getCategory } from "../../Redux/Slices/CategorySlice.js";
import { useLocation } from "react-router-dom";

function ItemList() {
  const dispatch = useDispatch();
  const { state } = useLocation(); // get category object with .items array

  // destructure for clarity
  const { items = [], Category: categoryName, _id: categoryId } = state || {};

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <HomeLayout>
      <div className="pt-12 pl-20 flex flex-col gap-10 text-white min-h-[90vh]">
        <h1 className="text-3xl font-bold">Items in "{categoryName}"</h1>
        <div className="flex flex-wrap gap-10">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} categoryId={categoryId} />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default ItemList;
