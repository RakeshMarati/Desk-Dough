import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMenuItems } from '../store/slices/menuSlice';
import { fetchTestimonials } from '../store/slices/testimonialSlice';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { MenuCard, Loader, Footer } from '../components';

const Home = () => {
  const dispatch = useDispatch();
  const { items: menuItems, loading: menuLoading } = useSelector(
    (state) => state.menu
  );
  const { testimonials, loading: testimonialsLoading } = useSelector(
    (state) => state.testimonials
  );

  useEffect(() => {
    // Fetch featured menu items
    dispatch(fetchMenuItems({ featured: true, limit: 4 }));
    // Fetch featured testimonials
    dispatch(fetchTestimonials({ approved: true, featured: true, limit: 3 }));
  }, [dispatch]);

  const featuredMenuItems = menuItems.slice(0, 4);
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Featured Menu Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-coffee-900 mb-4">
              Featured Items
            </h2>
            <p className="text-xl text-coffee-600">
              Our most popular selections
            </p>
          </div>

          {menuLoading ? (
            <div className="flex justify-center py-12">
              <Loader size="md" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredMenuItems.map((item, index) => (
                <MenuCard
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  category={item.category?.name}
                  featured={item.featured}
                  index={index}
                />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link
              to="/menu"
              className="inline-block px-8 py-4 bg-coffee-600 text-white rounded-full font-semibold text-lg hover:bg-coffee-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-coffee-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-coffee-600">
              Real experiences from our community
            </p>
          </div>

          {testimonialsLoading ? (
            <div className="flex justify-center py-12">
              <Loader size="md" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial._id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-coffee-700 mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-coffee-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-2xl">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-coffee-900">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
