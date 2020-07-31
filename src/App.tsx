import React, {useCallback, useEffect, useState} from 'react';
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './App.scss';

interface QuoteInterface {
  quote: string;
  author: string;
}

type Quotes = QuoteInterface[];

function App() {
  const [quotes, setQuotes] = useState<Quotes | null>();
  const [currentQuoteText, setCurrentQuoteText] = useState<string|null>();
  const [currentAuthorQuote, setCurrentAuthorQuote] = useState<string|null>();
  const [currentColorQuote, setCurrentColorQuote] = useState<string>('#333');

  const getQuotes = async () => {
    try {
      const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json");
      const jsonRes = await response.json();
      setQuotes(jsonRes.quotes);
    } catch (e) {
      throw new Error(e);
    }
  };

  const setCurrentQuote = useCallback(async () => {
    if (quotes) {
      const currentQuote = quotes?.[getRandomInt(quotes.length)];
      currentQuote && setCurrentQuoteText(currentQuote.quote);
      currentQuote && setCurrentAuthorQuote(currentQuote.author);
      const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
      setCurrentColorQuote(randomColor);
      document.body.style.backgroundColor = randomColor;
      document.body.style.color = randomColor;
    }
  }, [quotes]);

  useEffect(() => {
    getQuotes().then().catch((e) => {
      setCurrentQuoteText('Apologies there was an error generating the quote. Please refresh the page and try again.')
      setCurrentAuthorQuote(e?.message);
    });
  }, []);

  useEffect(() => {
    quotes && setCurrentQuote();
  }, [quotes, setCurrentQuote])

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  return (
    <div className="App">
      <div id="wrapper">
        <div id="quote-box">
          <div className="quote-text">
            <span id="text">{currentQuoteText}</span>
          </div>
          <div className="quote-author">
            <span id="author">- {currentAuthorQuote}</span>
          </div>
          <div className="buttons">
            <a href="https://twitter.com/intent/tweet" className="button" id="tweet-quote" title="Tweet this quote!" target="_blank" rel="noopener noreferrer" style={{backgroundColor: currentColorQuote}}>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <button className="button" id="new-quote" onClick={setCurrentQuote} style={{backgroundColor: currentColorQuote}}>New quote</button>
          </div>
        </div>
        <div className="footer"> by <a href="https://github.com/CristyTarantino">CristyTarantino</a></div>
      </div>
    </div>
  );
}

export default App;
