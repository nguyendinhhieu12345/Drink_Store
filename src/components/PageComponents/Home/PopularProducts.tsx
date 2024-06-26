
import React from 'react';
import ListCategoryHome from './HomeNew/ListCategoryHome';
import ListDiscountOfDay from './HomeNew/ListDiscountOfDay';
import ListPopularProducts from './HomeNew/ListPopularProducts';
import ListFuture from './HomeNew/ListFuture';

const PopularProducts: React.FC = () => {

    return (
        <div className="bg-white w-full">
            {/* List category */}
            <ListCategoryHome />

            {/* Popular product */}
            <ListPopularProducts />

            {/* Discount new  */}
            <ListDiscountOfDay />

            {/* feature */}
            <ListFuture />
        </div>
    );
};

export default PopularProducts;