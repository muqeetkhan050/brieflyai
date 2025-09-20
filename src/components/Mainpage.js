


// // import { useState, useEffect } from 'react';
// // import { useLazyGetSummaryQuery } from '../services/article';
// // import tick from '../assets/tick.png';
// // import copy from '../assets/copy.png';

// // const MainPage = () => {
// //   const [articles, setArticles] = useState({
// //     url: '',
// //     summary: '',
// //   });
// //   const [allArticles, setAllArticles] = useState([]);
// //   const [copied, setCopied] = useState('');
// //   const [copyArticle, setCopyArticle] = useState('');

// //   // ✅ Fixed: destructure lazy query correctly
// //   const [getSummary, { isLoading, isError }] = useLazyGetSummaryQuery();

// //   // ✅ Load saved articles from localStorage
// //   useEffect(() => {
// //     const articleFromLocalStorage = JSON.parse(localStorage.getItem('articles'));
// //     if (articleFromLocalStorage) {
// //       setAllArticles(articleFromLocalStorage);
// //     }
// //   }, []);

// //   // ✅ Fixed: input onChange & value handling
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!articles.url) return;

// //     // ✅ Fixed: parameter name must match service query
// //     const { data } = await getSummary({ articleUrl: articles.url });

// //     if (data?.summary) {
// //       const newArticle = { ...articles, summary: data.summary };
// //       const updatedAllArticles = [newArticle, ...allArticles];

// //       setArticles({ url: '', summary: '' }); // ✅ reset input
// //       setAllArticles(updatedAllArticles);
// //       localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
// //     }
// //   };

// //   const handleCopy = (copyUrl) => {
// //     setCopied(copyUrl);
// //     navigator.clipboard.writeText(copyUrl);
// //     setTimeout(() => setCopied(''), 1000);
// //   };

// //   const handleCopyArticle = (copySummary) => {
// //     setCopyArticle(copySummary);
// //     navigator.clipboard.writeText(copySummary);
// //     setTimeout(() => setCopyArticle(''), 1000);
// //   };

// //   return (
// //     <div className="p-4">
// //       <form onSubmit={handleSubmit} className="flex justify-center items-center gap-2">
// //         <input
// //           placeholder="Paste your URL"
// //           value={articles.url} // ✅ Fixed value
// //           onChange={(e) => setArticles({ ...articles, url: e.target.value })} // ✅ Fixed onChange
// //           className="border p-2 rounded flex-1"
// //         />
// //         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
// //           Submit
// //         </button>
// //       </form>

// //       <div className="flex flex-col gap-1 max-h-60 overflow-y-auto mt-4">
// //         {allArticles.slice(0, 3).map((item, index) => (
// //           <div
// //             className="link_card flex justify-between items-center p-2 border rounded cursor-pointer"
// //             key={`link-${index}`}
// //             onClick={() => setArticles(item)}
// //           >
// //             <p className="truncate">{item.url}</p>
// //             <div className="copy_btn" onClick={() => handleCopy(item.url)}>
// //               <img
// //                 src={copied === item.url ? tick : copy}
// //                 alt="copy_icon"
// //                 className="w-6 h-6 object-contain"
// //               />
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="mt-4">
// //         {isLoading && <h1>Loading...</h1>} {/* ✅ Fixed loading */}
// //         {isError && <h2>Sorry, there was an error.</h2>} {/* ✅ Fixed error */}
// //         {articles.summary && !isLoading && !isError && (
// //           <div className="p-2 border rounded">{articles.summary}</div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MainPage;


// import { useState, useEffect } from 'react';

// // Mock hook for demonstration - replace with your actual import
// const useLazyGetSummaryQuery = () => {
//   return [
//     async ({ articleUrl }) => {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       return {
//         data: {
//           summary: `This is a simulated summary of the article from ${articleUrl}. The article discusses various important topics and provides valuable insights. It covers multiple aspects of the subject matter and presents well-researched information that would be useful for readers interested in this topic.`
//         }
//       };
//     },
//     { isLoading: false, isError: false }
//   ];
// };

// const MainPage = () => {
//   const [article, setArticle] = useState({
//     url: '',
//     summary: '',
//   });
//   const [allArticles, setAllArticles] = useState([]);
//   const [copied, setCopied] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [currentSummary, setCurrentSummary] = useState('');

//   const [getSummary, { isError }] = useLazyGetSummaryQuery();

//   // Load saved articles from state (localStorage replacement for demo)
//   useEffect(() => {
//     // Simulate some existing articles
//     setAllArticles([
//       {
//         url: 'https://example.com/article1',
//         summary: 'Previous article summary about technology trends...'
//       },
//       {
//         url: 'https://example.com/article2', 
//         summary: 'Another interesting article about AI developments...'
//       }
//     ]);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!article.url.trim()) return;

//     setIsSubmitting(true);
//     setCurrentSummary(''); // Clear previous summary

//     try {
//       const { data } = await getSummary({ articleUrl: article.url });

//       if (data?.summary) {
//         const newArticle = { url: article.url, summary: data.summary };
//         const updatedAllArticles = [newArticle, ...allArticles];

//         // Show summary immediately
//         setCurrentSummary(data.summary);
        
//         // Update articles list
//         setAllArticles(updatedAllArticles);
        
//         // Keep the URL in input but clear summary from state
//         setArticle(prev => ({ ...prev, summary: data.summary }));
//       }
//     } catch (error) {
//       console.error('Error fetching summary:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCopy = (text, type = 'url') => {
//     setCopied(`${type}-${text}`);
//     navigator.clipboard.writeText(text);
//     setTimeout(() => setCopied(''), 2000);
//   };

//   const handleArticleClick = (item) => {
//     setArticle(item);
//     setCurrentSummary(item.summary);
//   };

//   const clearAll = () => {
//     setArticle({ url: '', summary: '' });
//     setCurrentSummary('');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">
//             🔗 Article Summarizer
//           </h1>
//           <p className="text-gray-600">
//             Transform any article into a concise summary with AI
//           </p>
//         </div>

//         {/* Input Section */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//           <div className="space-y-4">
//             <div className="flex gap-3">
//               <input
//                 type="url"
//                 placeholder="🌐 Paste your article URL here..."
//                 value={article.url}
//                 onChange={(e) => setArticle({ ...article, url: e.target.value })}
//                 onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
//                 className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-700"
//                 disabled={isSubmitting}
//               />
//               <button
//                 onClick={handleSubmit}
//                 disabled={isSubmitting || !article.url.trim()}
//                 className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
//               >
//                 {isSubmitting ? (
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Analyzing...
//                   </div>
//                 ) : (
//                   '✨ Summarize'
//                 )}
//               </button>
//             </div>
            
//             {article.url && (
//               <button
//                 onClick={clearAll}
//                 className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
//               >
//                 Clear all
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Recent Articles Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                 📚 Recent Articles
//                 <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
//                   {allArticles.length}
//                 </span>
//               </h3>
              
//               <div className="space-y-3 max-h-80 overflow-y-auto">
//                 {allArticles.slice(0, 5).map((item, index) => (
//                   <div
//                     key={`article-${index}`}
//                     onClick={() => handleArticleClick(item)}
//                     className="group p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                   >
//                     <div className="flex justify-between items-start gap-2">
//                       <p className="text-sm text-gray-600 truncate flex-1 group-hover:text-blue-600">
//                         {item.url}
//                       </p>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleCopy(item.url, 'url');
//                         }}
//                         className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-blue-100 rounded"
//                       >
//                         {copied === `url-${item.url}` ? (
//                           <span className="text-green-500 text-xs">✓</span>
//                         ) : (
//                           <span className="text-gray-400 text-xs">📋</span>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
                
//                 {allArticles.length === 0 && (
//                   <div className="text-center py-8 text-gray-400">
//                     <p>No articles yet</p>
//                     <p className="text-sm">Summarize your first article!</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Main Content - Summary Display */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-lg p-6 min-h-96">
//               {isError && (
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
//                   <h3 className="text-red-800 font-medium flex items-center gap-2">
//                     ⚠️ Error
//                   </h3>
//                   <p className="text-red-600 text-sm mt-1">
//                     Sorry, we couldn't fetch the article summary. Please check the URL and try again.
//                   </p>
//                 </div>
//               )}

//               {isSubmitting && (
//                 <div className="flex flex-col items-center justify-center py-12">
//                   <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
//                   <h3 className="text-lg font-medium text-gray-700 mb-2">
//                     Analyzing Article...
//                   </h3>
//                   <p className="text-gray-500 text-sm text-center max-w-md">
//                     Our AI is reading and summarizing the article content. This may take a few moments.
//                   </p>
//                 </div>
//               )}

//               {currentSummary && !isSubmitting && (
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-start gap-4">
//                     <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                       📄 Article Summary
//                     </h3>
//                     <button
//                       onClick={() => handleCopy(currentSummary, 'summary')}
//                       className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600 transition-colors"
//                     >
//                       {copied === `summary-${currentSummary}` ? (
//                         <>
//                           <span className="text-green-500">✓</span>
//                           Copied!
//                         </>
//                       ) : (
//                         <>
//                           📋 Copy
//                         </>
//                       )}
//                     </button>
//                   </div>
                  
//                   {article.url && (
//                     <div className="bg-gray-50 rounded-lg p-3 mb-4">
//                       <p className="text-xs text-gray-500 mb-1">Source:</p>
//                       <a 
//                         href={article.url} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="text-sm text-blue-600 hover:text-blue-700 underline break-all"
//                       >
//                         {article.url}
//                       </a>
//                     </div>
//                   )}
                  
//                   <div className="prose max-w-none">
//                     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-400">
//                       <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
//                         {currentSummary}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {!currentSummary && !isSubmitting && !isError && (
//                 <div className="flex flex-col items-center justify-center py-12 text-center">
//                   <div className="text-6xl mb-4">📖</div>
//                   <h3 className="text-xl font-medium text-gray-700 mb-2">
//                     Ready to Summarize
//                   </h3>
//                   <p className="text-gray-500 max-w-md">
//                     Paste an article URL above and click "Summarize" to get an AI-powered summary, 
//                     or select from your recent articles on the left.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainPage;

// MainPage.js
import { useState, useEffect } from 'react';
import { useLazyGetSummaryQuery } from '../services/article';
import tick from '../assets/tick.png';
import copy from '../assets/copy.png';
import './MainPage.css'; // Import the CSS file

const MainPage = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [getSummary, { isError }] = useLazyGetSummaryQuery();

  // Load saved articles from localStorage
  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(localStorage.getItem('articles') || '[]');
    if (articleFromLocalStorage.length > 0) {
      setAllArticles(articleFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!article.url.trim()) return;

    setIsSubmitting(true);

    try {
      const { data } = await getSummary({ articleUrl: article.url });

      if (data?.summary) {
        const newArticle = { url: article.url, summary: data.summary };
        const updatedAllArticles = [newArticle, ...allArticles];

        // Show summary immediately in current article
        setArticle({ url: article.url, summary: data.summary });
        
        // Update articles list and localStorage
        setAllArticles(updatedAllArticles);
        localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(''), 1000);
  };

  const handleArticleClick = (item) => {
    setArticle(item);
  };

  return (
    <div className="main-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="header">
          <h1 className="title">
            🔗 Article Summarizer
          </h1>
          <p className="subtitle">
            Transform any article into a concise summary with AI
          </p>
        </div>

        {/* Input Section */}
        <div className="input-section">
          <div className="input-row">
            <input
              type="url"
              placeholder="🌐 Paste your article URL here..."
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              className="url-input"
              disabled={isSubmitting}
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !article.url.trim()}
              className="submit-button"
            >
              {isSubmitting ? (
                <div className="loading-content">
                  <div className="spinner"></div>
                  Analyzing...
                </div>
              ) : (
                '✨ Summarize'
              )}
            </button>
          </div>
          
          {article.url && (
            <button
              onClick={() => setArticle({ url: '', summary: '' })}
              className="clear-button"
            >
              Clear
            </button>
          )}
        </div>

        {/* Summary Display */}
        <div className="summary-section">
          {isError && (
            <div className="error-message">
              <h3 className="error-title">
                ⚠️ Error
              </h3>
              <p className="error-text">
                Sorry, we couldn't fetch the article summary. Please check the URL and try again.
              </p>
            </div>
          )}

          {isSubmitting && (
            <div className="loading-section">
              <div className="loading-spinner"></div>
              <h3 className="loading-title">
                Analyzing Article...
              </h3>
              <p className="loading-text">
                Our AI is reading and summarizing the article content.
              </p>
            </div>
          )}

          {article.summary && !isSubmitting && (
            <div className="summary-content">
              <h3 className="summary-title">
                📄 Article Summary
              </h3>
              
              <div className="summary-box">
                <p className="summary-text">
                  {article.summary}
                </p>
              </div>
              
              <div className="source-box">
                <p className="source-label">Source:</p>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="source-link"
                >
                  {article.url}
                </a>
              </div>
            </div>
          )}

          {!article.summary && !isSubmitting && !isError && (
            <div className="empty-state">
              <div className="empty-icon">📖</div>
              <h3 className="empty-title">
                Ready to Summarize
              </h3>
              <p className="empty-text">
                Paste an article URL above and click "Summarize" to get an AI-powered summary.
              </p>
            </div>
          )}
        </div>

        {/* Recent Articles */}
        {allArticles.length > 0 && (
          <div className="recent-section">
            <h3 className="recent-title">
              📚 Recent Articles
              <span className="article-count">
                {allArticles.length}
              </span>
            </h3>
            
            <div className="articles-list">
              {allArticles.slice(0, 5).map((item, index) => (
                <div
                  key={`article-${index}`}
                  onClick={() => handleArticleClick(item)}
                  className="article-item"
                >
                  <div className="article-content">
                    <p className="article-url">
                      {item.url}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item.url);
                      }}
                      className="copy-button"
                    >
                 
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;