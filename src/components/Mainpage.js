import { useState, useEffect } from 'react';
import { useLazyGetSummaryQuery } from '../services/article';


const MainPage = () => {
    const [articles, setArticles] = useState({
        url: '',
        summary: ''
    });
    const [allArticles, setAllArticles] = useState([])
    const [copied, setCopied] = useState("");
    const [copyArticle, setCopyArticle] = useState('');
    const [getSummary, { error, isFetched }] = useLazyGetSummaryQuery();

    useEffect(() => {
        const articleFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

        if (articleFromLocalStorage) {
            setAllArticles(articleFromLocalStorage);
        }

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await getSummary({ articleApi: articles.url })
        if (data?.summary) {
            const newArticle = { ...articles, summary: data.summary }
            const updatedAllArticles = [newArticle, ...allArticles]
            setArticles(newArticle)
            setAllArticles(updatedAllArticles)
            localStorage.setItem('articles', JSON.stringify(updatedAllArticles)
            )
            setArticles((prevArticle) => ({
                ...prevArticle,
                url: "",
            }));
        }
    }
    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 1000);
    }

    const handleCopyArticle = (copySummry) => {
        setCopyArticle(copySummry);
        navigator.clipboard.writeText(copySummry);
        setTimeout(() => setCopyArticle(false), 1000);
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className='relative flex justify-center items-center'>
                <input placeholder='Paste your URL' value={(e) => setArticles({ ...articles, url: e.target.value })}></input>
                <button type='submit'>Submit</button>
            </form>
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                {allArticles.slice(0, 3).map((item, index) => (
                    <div className="link_card" key={`link-${index}`} onClick={() => setArticles(item)}>
                        <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                            <div>checking it </div>
                            <img src={copied === item.url ? tick : copy} alt="copy_icon" className="w-[40%] h-[40%] object-contain" />
                        </div>
                        <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{item.url}</p>
                    </div>
                ))}
            </div>
            <div>
                {isFetched ? (
                    <h1>it is loading</h1>
                ) : error ? (
                    <h2>Sorry these is an error</h2>
                ) : (articles.summary && (
                    <div>{articles.summary}</div>
                ))}
            </div>
        </div>
    )
}


export default MainPage;