
"use client"
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react'; // Add this import to resolve JSX namespace

type FAQItem = {
  id: string;
  question: string;
  answer: string | React.ReactNode; // Changed JSX.Element to React.ReactNode
};

const faqData: FAQItem[] = [
    {
      id: 'what-is',
      question: 'What is GDG on Campus RBU?',
      answer: 'GDG on Campus RBU is a student-led community that helps students explore and learn Google technologies through workshops, hackathons, and tech talks.'
    },
    {
      id: 'who-can-join',
      question: 'Who can join GDG on Campus RBU?',
      answer: 'Any student at RBU interested in tech—whether a beginner or an expert—can join us.'
    },
    {
      id: 'events',
      question: 'What happens at GDG events?',
      answer: 'We host workshops, hackathons, tech talks, and hands-on coding sessions to help students learn and collaborate.'
    },
    {
      id: 'is-free',
      question: 'Is joining GDG on Campus RBU free?',
      answer: 'Yes! There are no membership fees—our events and resources are completely free.'
    },
    {
      id: 'how-to-join',
      question: 'How can I join GDG on Campus RBU?',
      answer: 'You can join by following our social media for updates and attending our upcoming events at RBU.'
    }
  ];
  
export default function FAQSection() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="w-full bg-black text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-7xl font-bold mb-6 leading-tight flex justify-center">FAQ</h2>
          <p className="text-base md:text-lg text-gray-400 flex text-center">
            Everything you need to know about GDG On Campus RBU . Can't find the answer you're looking for?
            Feel free to contact our management team.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item) => (
            <div 
              key={item.id} 
              className="border-b border-gray-800 last:border-0"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="flex justify-between items-center w-full py-5 text-left focus:outline-none"
                aria-expanded={openItems[item.id]}
                aria-controls={`faq-answer-${item.id}`}
              >
                <span className="text-lg font-medium">{item.question}</span>
                <span className="ml-4 flex-shrink-0">
                  {openItems[item.id] ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </span>
              </button>
              <div
                id={`faq-answer-${item.id}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openItems[item.id] ? 'max-h-96 pb-5' : 'max-h-0'
                }`}
              >
                <div className="text-gray-400">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 bg-gray-900 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex -space-x-4">
              <div className="h-12 w-12 rounded-full border-2 border-black bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src="/api/placeholder/40/40" alt="User" className="h-full w-full object-cover" />
              </div>
              <div className="h-12 w-12 rounded-full border-2 border-black bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src="/api/placeholder/40/40" alt="User" className="h-full w-full object-cover" />
              </div>
              <div className="h-12 w-12 rounded-full border-2 border-black bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src="/api/placeholder/40/40" alt="User" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
          <p className="text-gray-400 mb-6">
            Can't find the answer you're looking for? Our support team is here to help with any technical questions or concerns.
          </p>
          <button className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-black font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all">
            Contact Support
          </button>
        </div> */}
      </div>
    </section>
  );
}