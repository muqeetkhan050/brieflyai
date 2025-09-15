import { useState, useEffect } from 'react';
import { useLazyGetSummaryQuery } from '../services/article';


const MainPage = () => {
    const [articles, setArticles] = useState({
        url: '',
        summary: ''
    });
    const [allArticles,setAllArticles]=useState([])
    const[coppied,setCopied]=useState("");
    const [copyArticle,setCopyArticle]=useState('');
    const [getSummary,{error,isFetched}]=useLazyGetSummaryQuery
        return (
        <div>
            this is main page
        </div>
    )
}


export default MainPage;