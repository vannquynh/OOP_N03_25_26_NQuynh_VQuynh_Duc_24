import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PopularCategories = ({ fetchCategories }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, [fetchCategories]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Các lĩnh vực phổ biến
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Khám phá các lĩnh vực việc làm nổi bật và tìm kiếm cơ hội phù hợp với bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.ma_linh_vuc} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/jobByCategory?category=${category.ma_linh_vuc}&name=${category.ten_linh_vuc}`} className="block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="card h-full border border-gray-200 text-center dark:border-gray-700"
      >
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary-500 text-white">
            {/* Nếu server có trường icon thì dùng, không thì ghi text tạm */}
            {category.icon ? (
              <img src={category.icon} alt={category.ten_linh_vuc} className="h-8 w-8" />
            ) : (
              <span className="text-xl font-bold">{category.ten_linh_vuc?.charAt(0)}</span>
            )}
          </div>
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          {category.ten_linh_vuc}
        </h3>

        <p className="text-primary-600 dark:text-primary-400">
          {category.soLuongViecLam ? `${category.soLuongViecLam} việc làm` : 'Chưa có việc làm'}
        </p>
      </motion.div>
    </Link>
  );
};

export default PopularCategories;
