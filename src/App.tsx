import React, { useState, useCallback } from 'react';
import { PenTool } from 'lucide-react';
import TextStats from './components/TextStats';
import TextTools from './components/TextTools';
import KeywordDensity from './components/KeywordDensity';
import TextComparison from './components/TextComparison';
import { 
  countWords, 
  countCharacters, 
  countParagraphs, 
  countSentences,
  getLongestWord,
  getShortestWord,
  getAverageWordLength,
  getKeywordDensity
} from './utils/textAnalytics';

function App() {
  const [text, setText] = useState('');

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  const handleTransform = useCallback((transformation: (text: string) => string) => {
    setText(transformation(text));
  }, [text]);

  const handleClear = useCallback(() => {
    setText('');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <PenTool className="text-blue-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Text Analyst</h1>
          </div>
          <p className="text-gray-600">
            Analyze and transform your text with advanced metrics
          </p>
        </div>

        <TextStats
          words={countWords(text)}
          characters={countCharacters(text)}
          charactersNoSpaces={countCharacters(text, false)}
          paragraphs={countParagraphs(text)}
          sentences={countSentences(text)}
          longestWord={getLongestWord(text)}
          shortestWord={getShortestWord(text)}
          averageWordLength={getAverageWordLength(text)}
        />

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <TextTools 
            text={text}
            onTransform={handleTransform} 
            onClear={handleClear} 
          />
          
          <textarea
            className="w-full h-64 p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none transition-colors font-medium"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={handleTextChange}
          ></textarea>
        </div>

        <KeywordDensity keywords={getKeywordDensity(text)} />
        <TextComparison primaryText={text} />

        <div className="text-center text-sm text-gray-500">
          Start typing or paste your text to see the statistics update in real-time
        </div>
      </div>
    </div>
  );
}

export default App;