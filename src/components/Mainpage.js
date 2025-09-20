
import { useState, useEffect } from 'react';
import { useLazyGetSummaryQuery } from '../services/article';
import tick from '../assets/tick.png';
import copy from '../assets/copy.png';
import './MainPage.css'; // Import the CSS file
import Header from './Header';

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

    const handleDeleteArticle = (indexToDelete) => {
        const updatedArticles = allArticles.filter((_, index) => index !== indexToDelete);
        setAllArticles(updatedArticles);
        localStorage.setItem('articles', JSON.stringify(updatedArticles));

        // If the deleted article is currently being displayed, clear it
        if (article.url === allArticles[indexToDelete]?.url) {
            setArticle({ url: '', summary: '' });
        }
    };

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
              <Header/>
            <div className="content-wrapper">
              
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
                                    className="article-item"
                                >
                                    <div className="article-content">
                                        <p
                                            className="article-url"
                                            onClick={() => handleArticleClick(item)}
                                            style={{ cursor: 'pointer', flex: 1 }}
                                        >
                                            {item.url}
                                        </p>

                                        <div className="article-buttons">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCopy(item.url);
                                                }}
                                                className="copy-button"
                                                title="Copy URL"
                                            >

                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteArticle(index);
                                                }}
                                                className="delete-button"
                                                title="Delete article"
                                            >
                                                Delete
                                            </button>
                                        </div>
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