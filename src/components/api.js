import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const key = '38200365-78da0163b7645a21191d777ec';

export const fetchImages = async (query, currentPage) => {
  console.log({ query, currentPage });
  const response = await axios.get(
    `/?q=${query}&page=${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};
