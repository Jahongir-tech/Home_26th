import { request } from "@/api";
import React from "react";
import { FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";


const ScrollProducts = ({ data, isAdmin }) => {
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure?");
    if (confirmDelete) {
      try {
        await request.delete(`/product/delete/${id}`);
        alert("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete the product.");
      }
    }
  };

  return (
    <div className="overflow-x-auto scroll-m-10">
      <div className="flex space-x-2 min-w-max">
        {data?.map((product) => (
          <div
            key={product.id}
            className="w-80 p-4 border rounded shadow-sm hover:shadow-lg transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover rounded"
            />
            <div className="flex pt-4">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
            <p className="text-gray-700">{product.price} USD</p>

            {/* Admin or User Actions */}
            <div className="mt-4 flex justify-end">
              {isAdmin ? (
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                  Delete
                </button>
              ) : (
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                  <FaRegHeart />
                  Add to Wishlist
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollProducts;
