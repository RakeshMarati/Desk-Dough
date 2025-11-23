import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestimonials, createTestimonial } from '../store/slices/testimonialSlice';
import { Loader, Input, Textarea, Button } from '../components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Testimonials = () => {
  const dispatch = useDispatch();
  const { testimonials, loading, error } = useSelector(
    (state) => state.testimonials
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchTestimonials({ approved: true }));
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitSuccess(false);

    try {
      await dispatch(createTestimonial(formData)).unwrap();
      setFormData({
        name: '',
        email: '',
        rating: 5,
        comment: '',
      });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-coffee-900 mb-4">
              Customer Testimonials
            </h1>
            <p className="text-xl text-coffee-600 max-w-2xl mx-auto">
              Share your experience with us and help others discover the magic
              of My Café
            </p>
          </div>

          {/* Submit Testimonial Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-coffee-900 mb-6">
              Share Your Experience
            </h2>
            {submitSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                Thank you! Your testimonial has been submitted and will be
                reviewed before publishing.
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-coffee-700 mb-2">
                  Rating
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-coffee-300 focus:border-coffee-600 focus:outline-none focus:ring-2 focus:ring-coffee-200 text-coffee-900"
                  required
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Very Good</option>
                  <option value={3}>3 - Good</option>
                  <option value={2}>2 - Fair</option>
                  <option value={1}>1 - Poor</option>
                </select>
              </div>
              <Textarea
                label="Your Review"
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                rows={5}
                required
                placeholder="Tell us about your experience..."
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
                className="w-full"
              >
                {submitting ? 'Submitting...' : 'Submit Testimonial'}
              </Button>
            </form>
          </div>

          {/* Testimonials Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader size="lg" message="Loading testimonials..." />
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
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
                      {testimonial.featured && (
                        <span className="text-xs text-coffee-600 bg-coffee-100 px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-coffee-600">
                No testimonials yet. Be the first to share your experience!
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Testimonials;

