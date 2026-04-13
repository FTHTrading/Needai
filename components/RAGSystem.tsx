'use client';

import { useState } from 'react';

interface RAGDocument {
  id: string;
  title: string;
  content: string;
  category: string;
  lastUpdated: string;
  relevance: number;
}

interface RAGQuery {
  id: string;
  query: string;
  response: string;
  timestamp: string;
  confidence: number;
  sources: string[];
}

interface RAGSystemProps {
  targetArea?: string;
  category?: string;
}

const RAG_DOCUMENTS: RAGDocument[] = [
  {
    id: '1',
    title: 'Storm Damage Response Protocols',
    content:
      'When severe weather strikes, immediate response is critical. Deploy local marketing claiming presence in affected areas...',
    category: 'Weather',
    lastUpdated: '2024-01-30',
    relevance: 95
  },
  {
    id: '2',
    title: 'High-Demand Area Targeting',
    content:
      'Areas with population density >500/sq mi and income >$75k show highest conversion rates...',
    category: 'Demographics',
    lastUpdated: '2024-01-29',
    relevance: 88
  },
  {
    id: '3',
    title: 'Seasonal Marketing Calendar',
    content: 'Spring brings roofing season with hail risk areas requiring proactive campaigns...',
    category: 'Seasonal',
    lastUpdated: '2024-01-28',
    relevance: 82
  }
];

export default function RAGSystem({ targetArea = 'All', category = 'General' }: RAGSystemProps) {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<RAGQuery | null>(null);
  const [documentCount, setDocumentCount] = useState(RAG_DOCUMENTS.length);
  const [isLearning, setIsLearning] = useState(false);

  // Mock RAG documents database
  const ragDocuments = RAG_DOCUMENTS;

  // Mock query history
  const [queryHistory, setQueryHistory] = useState<RAGQuery[]>([
    {
      id: '1',
      query: 'How to target storm-damaged areas in Texas?',
      response: 'Deploy immediate local marketing claiming "We\'re in [City], TX" presence. Focus on 24/7 availability and rapid response teams...',
      timestamp: '2024-01-30T10:30:00Z',
      confidence: 94,
      sources: ['Storm Damage Response Protocols', 'Texas Market Analysis']
    },
    {
      id: '2',
      query: 'Best times for Florida hurricane marketing?',
      response: 'Peak effectiveness during hurricane season (June-November). Target 2 hours before landfall with emergency response messaging...',
      timestamp: '2024-01-30T09:15:00Z',
      confidence: 89,
      sources: ['Weather Pattern Analysis', 'Florida Emergency Response']
    }
  ]);

  const handleQuery = async () => {
    if (!query.trim()) return;

    setIsProcessing(true);
    setIsLearning(true);

    // Simulate RAG processing
    setTimeout(() => {
      const mockResponse: RAGQuery = {
        id: Date.now().toString(),
        query: query,
        response: generateRAGResponse(query),
        timestamp: new Date().toISOString(),
        confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
        sources: ['Knowledge Base', 'Historical Data', 'Market Intelligence']
      };

      setCurrentResponse(mockResponse);
      setQueryHistory(prev => [mockResponse, ...prev.slice(0, 9)]); // Keep last 10
      setQuery('');
      setIsProcessing(false);
      setIsLearning(false);
    }, 2000);
  };

  const generateRAGResponse = (userQuery: string): string => {
    const lowerQuery = userQuery.toLowerCase();

    if (lowerQuery.includes('storm') || lowerQuery.includes('weather')) {
      return `Based on our RAG knowledge base: Deploy immediate local marketing claiming "We're in [Affected City]" presence. Focus on 24/7 availability, rapid response teams, and emergency assessment services. Target areas within storm path with population density >300/sq mi. Historical data shows 87% higher conversion rates during active weather events.`;
    }

    if (lowerQuery.includes('demand') || lowerQuery.includes('targeting')) {
      return `Algorithmic targeting analysis: Focus on areas with population density >500/sq mi, median income >$75k, and recent claims activity. Use geo-fencing to target within 10-mile radius of high-demand zones. Deploy local messaging claiming "Your [City] [Service] Experts" to build trust and immediate response capability.`;
    }

    if (lowerQuery.includes('seasonal') || lowerQuery.includes('calendar')) {
      return `Seasonal optimization: Spring (March-May) brings roofing season with hail risk areas. Summer focuses on AC repair in high-heat zones. Fall targets water damage from hurricanes. Winter emphasizes emergency services. Each season requires specific local messaging and 24/7 availability claims.`;
    }

    return `RAG Analysis: For optimal targeting in ${targetArea}, combine weather pattern data with demographic analysis. Deploy local presence messaging ("We're in [City]") across all social platforms. Focus on high-demand areas with algorithmic area code selection. Maintain 24/7 AI monitoring for real-time optimization.`;
  };

  const addNewDocument = () => {
    // In real implementation, this would update the database
    setDocumentCount(prev => prev + 1);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">RAG Knowledge System</h3>
          <p className="text-sm text-gray-600">
            Retrieval-Augmented Generation for Marketing Intelligence â€¢ Category: {category}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{documentCount}</div>
            <div className="text-xs text-gray-500">Documents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{queryHistory.length}</div>
            <div className="text-xs text-gray-500">Queries</div>
          </div>
        </div>
      </div>

      {/* Query Interface */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask about ${targetArea} marketing strategies, weather targeting, or demand analysis...`}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
          />
          <button
            onClick={handleQuery}
            disabled={isProcessing || !query.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Query RAG'}
          </button>
        </div>
      </div>

      {/* Current Response */}
      {currentResponse && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">RAG Response</h4>
            <span className="text-sm text-gray-600">Confidence: {currentResponse.confidence}%</span>
          </div>
          <p className="text-gray-700 mb-2">{currentResponse.response}</p>
          <div className="text-sm text-gray-600">
            Sources: {currentResponse.sources.join(', ')}
          </div>
        </div>
      )}

      {/* Learning Status */}
      {isLearning && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500 mr-2"></div>
            <span className="text-sm text-yellow-800">RAG System learning from query patterns...</span>
          </div>
        </div>
      )}

      {/* Query History */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Recent Queries</h4>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {queryHistory.slice(0, 5).map((q) => (
            <div key={q.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900 mb-1">{q.query}</div>
              <div className="text-sm text-gray-700 line-clamp-2">{q.response}</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(q.timestamp).toLocaleString()} • {q.confidence}% confidence
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Knowledge Base Management */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">Knowledge Base</h4>
            <p className="text-sm text-gray-600">Continuously updated with market intelligence</p>
          </div>
          <button
            onClick={addNewDocument}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            Add Document
          </button>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {ragDocuments.slice(0, 3).map((doc) => (
            <div key={doc.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 text-sm">{doc.title}</div>
              <div className="text-xs text-gray-600 mt-1">{doc.category}</div>
              <div className="text-xs text-gray-500 mt-1">Relevance: {doc.relevance}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
