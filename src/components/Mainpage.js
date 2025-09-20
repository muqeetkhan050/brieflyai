


import { useState, useEffect } from 'react';
import { useLazyGetSummaryQuery } from '../services/article';
import tick from '../assets/tick.png';
import copy from '../assets/copy.png';

const MainPage = () => {
  const [articles, setArticles] = useState({
    url: '',
    summary: '',
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState('');
  const [copyArticle, setCopyArticle] = useState('');

  // ✅ Fixed: destructure lazy query correctly
  const [getSummary, { isLoading, isError }] = useLazyGetSummaryQuery();

  // ✅ Load saved articles from localStorage
  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(localStorage.getItem('articles'));
    if (articleFromLocalStorage) {
      setAllArticles(articleFromLocalStorage);
    }
  }, []);

  // ✅ Fixed: input onChange & value handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!articles.url) return;

    // ✅ Fixed: parameter name must match service query
    const { data } = await getSummary({ articleUrl: articles.url });

    if (data?.summary) {
      const newArticle = { ...articles, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticles({ url: '', summary: '' }); // ✅ reset input
      setAllArticles(updatedAllArticles);
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(''), 1000);
  };

  const handleCopyArticle = (copySummary) => {
    setCopyArticle(copySummary);
    navigator.clipboard.writeText(copySummary);
    setTimeout(() => setCopyArticle(''), 1000);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex justify-center items-center gap-2">
        <input
          placeholder="Paste your URL"
          value={articles.url} // ✅ Fixed value
          onChange={(e) => setArticles({ ...articles, url: e.target.value })} // ✅ Fixed onChange
          className="border p-2 rounded flex-1"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>

      <div className="flex flex-col gap-1 max-h-60 overflow-y-auto mt-4">
        {allArticles.slice(0, 3).map((item, index) => (
          <div
            className="link_card flex justify-between items-center p-2 border rounded cursor-pointer"
            key={`link-${index}`}
            onClick={() => setArticles(item)}
          >
            <p className="truncate">{item.url}</p>
            <div className="copy_btn" onClick={() => handleCopy(item.url)}>
              <img
                src={copied === item.url ? tick : copy}
                alt="copy_icon"
                className="w-6 h-6 object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        {isLoading && <h1>Loading...</h1>} {/* ✅ Fixed loading */}
        {isError && <h2>Sorry, there was an error.</h2>} {/* ✅ Fixed error */}
        {articles.summary && !isLoading && !isError && (
          <div className="p-2 border rounded">{articles.summary}</div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
