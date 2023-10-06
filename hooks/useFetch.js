import fetch from 'node-fetch';

const useFetch = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhdWQiOiJjYmVjMzk5YzFjYjc2ODIwNDI8ZmY4ZDI5MTQ1MmJhYiIsInN1YiI6IjY0YTYwZmY0NzI0ZGUxMDEzOWMxZDlhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWqA9uVY24dJ-GI9jJE5bdlI11sbixdFjquyGSng2tY',
    },
  };

  try {
    const response = await fetch(url, options);
    console.log(`HTTP status code: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`HTTP error! Status: ${response.status}`);
      console.error('Error response body:', errorData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
};

export default useFetch;
