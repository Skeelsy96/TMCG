import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, FileText, Plus } from 'lucide-react';
import ImportEarlyBirdProductsButton from '../components/admin/ImportEarlyBirdProductsButton';

export default function AdminContent() {
  const contentCategories = [
    { 
      title: 'Blog Articles', 
      description: 'Manage blog posts and articles',
      count: 3,
      link: createPageUrl('Blog')
    },
    { 
      title: 'Resource Guides', 
      description: 'Manage downloadable resources',
      count: 8,
      link: createPageUrl('Resources')
    },
    { 
      title: 'Operator Profiles', 
      description: 'Featured operator showcases',
      count: 12,
      link: createPageUrl('BrowseOperators')
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-black py-12 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to={createPageUrl('AdminDashboard')}
            className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            Content <span className="text-[#FDD202]">Management</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Manage platform content and resources
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {contentCategories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="bg-white rounded-2xl p-8 border border-[#DBDBDB] hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-[#FDD202]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FDD202]/20 transition-colors">
                <FileText className="w-6 h-6 text-[#FDD202]" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">{category.title}</h3>
              <p className="text-sm text-[#969696] mb-4">{category.description}</p>
              <div className="text-2xl font-bold text-[#FDD202]">{category.count}</div>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-6">
          <ImportEarlyBirdProductsButton />

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
          <h3 className="font-bold text-black mb-2">Content Management Note</h3>
          <p className="text-sm text-[#333333]">
            Content management functionality is currently being developed. For now, you can view existing content through the links above. Direct editing capabilities will be added in future updates.
          </p>
        </div>
      </div>
    </div>
  );
}