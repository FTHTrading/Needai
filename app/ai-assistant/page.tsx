'use client';

import Navigation from '../../components/Navigation';
import { useState } from 'react';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant for setting up CallRail OS configurations. I can help you:\n\n• Configure AI assistants for your numbers\n• Set up call routing rules\n• Create custom responses\n• Preview configurations\n• Integrate with your systems\n\nWhat would you like to set up today?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: 'I understand you want to ' + input.toLowerCase() + '. Let me help you configure that. Here\'s what I recommend:\n\n1. First, select the phone number you want to configure\n2. Define the AI personality and tone\n3. Set up call handling rules\n4. Configure transfer conditions\n5. Test the setup with our preview system\n\nWould you like me to walk you through each step?'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">AI Configuration Assistant</h1>
        <p className="text-xl text-gray-700 mb-8">
          Let our AI assistant help you set up and configure your phone numbers and AI systems.
        </p>

        <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <h2 className="text-xl font-semibold">CallRail OS AI Assistant</h2>
            <p className="text-blue-100">Available 24/7 to help with your configurations</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setInput('Help me set up a new AI assistant')}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
              >
                Set up AI Assistant
              </button>
              <button
                onClick={() => setInput('Configure call routing')}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
              >
                Configure Routing
              </button>
              <button
                onClick={() => setInput('Preview my configuration')}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
              >
                Preview Setup
              </button>
              <button
                onClick={() => setInput('Integrate with my CRM')}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
              >
                CRM Integration
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about configuring your AI systems..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Configuration</h3>
            <p className="text-gray-600 text-sm">AI-guided setup for optimal performance</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Preview</h3>
            <p className="text-gray-600 text-sm">Test configurations before going live</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-2xl mb-2">🔧</div>
            <h3 className="font-semibold text-gray-900 mb-2">Auto-Optimization</h3>
            <p className="text-gray-600 text-sm">Continuous improvement based on call data</p>
          </div>
        </div>
      </main>
    </div>
  );
}