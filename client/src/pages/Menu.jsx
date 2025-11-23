import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItems, setFilters } from '../store/slices/menuSlice';
import { fetchCategories } from '../store/slices/categorySlice';
import { MenuCard, Filter, Loader } from '../components';

const Menu = () => {
  const dispatch = useDispatch();
  const { items, loading, error, filters, pagination } = useSelector(
    (state) => state.menu
  );
  const { categories } = useSelector((state) => state.categories);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // Fetch categories on mount
    dispatch(fetchCategories({ active: true }));
  }, [dispatch]);

  useEffect(() => {
    // Build query params
    const params = {
      page: 1,
      limit: 12,
    };

    if (activeCategory !== 'all') {
      params.category = activeCategory;
    }

    if (filters.featured) {
      params.featured = filters.featured;
    }

    if (filters.search) {
      params.search = filters.search;
    }

    dispatch(fetchMenuItems(params));
  }, [dispatch, activeCategory, filters.featured, filters.search]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category === 'all' ? 'all' : category);
  };

  const handleAddToCart = (id) => {
    // TODO: Implement cart functionality
    console.log('Add to cart:', id);
  };

  const categoryNames = categories.map((cat) => cat.name);

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader size="lg" message="Loading menu..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-coffee-900 mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-coffee-600 max-w-2xl mx-auto">
            Discover our carefully crafted selection of beverages and treats
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <Filter
            categories={categoryNames}
            activeCategory={activeCategory}
            onFilterChange={handleCategoryChange}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Menu Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <MenuCard
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                category={item.category?.name}
                featured={item.featured}
                onAddToCart={handleAddToCart}
                index={index}
              />
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-20">
              <p className="text-2xl text-coffee-600">
                No menu items found. Try adjusting your filters.
              </p>
            </div>
          )
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-4">
            <button
              disabled={pagination.page === 1}
              className="px-4 py-2 bg-coffee-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-coffee-700"
            >
              Previous
            </button>
            <span className="text-coffee-700">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              disabled={pagination.page === pagination.pages}
              className="px-4 py-2 bg-coffee-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-coffee-700"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;

