import React, { useState } from 'react';
import Header from './Header'

const Mianpage = () => {
    const [articles, setArticles]=useState({

        url:'',
        summary:''
    })
    cosnt [allArticles,setAllArticles]=useState([])
    return (
        <div>

            <div>
                <form>
                <input
                value={articles.url}
                onChange={(e)=>setArticles({...articles,url:e.target.value})}
                    type="url" placeholder='Pastes link here' />


                <button type='submit'>Summerize</button>
                </form>
            </div>
        </div>
    )
}

export default Mianpage;
