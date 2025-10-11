import React, { useState } from 'react';
import { Award, Calendar, ExternalLink, CheckCircle, Shield, Star, Filter, Search, Download } from 'lucide-react';
import LazyImage from './LazyImage';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl?: string;
  verificationUrl?: string;
  description: string;
  skills: string[];
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  image: string;
  status: 'Active' | 'Expired' | 'Renewed';
  certificateUrl?: string;
}

const Certifications: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);

  const certifications: Certification[] = [
    {
      id: '1',
      title: 'AWS Solutions Architect - Professional',
      issuer: 'Amazon Web Services',
      issueDate: '2023-09-15',
      expiryDate: '2026-09-15',
      credentialId: 'AWS-SAP-2023-001234',
      credentialUrl: 'https://aws.amazon.com/verification',
      verificationUrl: 'https://aws.amazon.com/verify/AWS-SAP-2023-001234',
      description: 'Validates advanced technical skills and experience in designing distributed applications and systems on the AWS platform.',
      skills: ['AWS Architecture', 'Cloud Design', 'Security', 'Cost Optimization', 'Migration Strategies'],
      category: 'Cloud Computing',
      level: 'Professional',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&h=200',
      status: 'Active',
      certificateUrl: '/certificates/aws-solutions-architect-professional.pdf'
    },
    {
      id: '2',
      title: 'Kubernetes Certified Application Developer (CKAD)',
      issuer: 'Cloud Native Computing Foundation',
      issueDate: '2023-06-20',
      expiryDate: '2026-06-20',
      credentialId: 'CKAD-2023-567890',
      credentialUrl: 'https://training.linuxfoundation.org/certification/verify',
      verificationUrl: 'https://training.linuxfoundation.org/certification/verify/CKAD-2023-567890',
      description: 'Demonstrates the ability to design, build, configure, and expose cloud native applications for Kubernetes.',
      skills: ['Kubernetes', 'Container Orchestration', 'Application Deployment', 'Troubleshooting'],
      category: 'DevOps',
      level: 'Professional',
      image: 'https://images.unsplash.com/photo-1605481178919-05b4de3ad4b9?auto=format&fit=crop&w=400&h=200',
      status: 'Active'
    },
    {
      id: '3',
      title: 'Google Professional Data Engineer',
      issuer: 'Google Cloud',
      issueDate: '2023-04-10',
      expiryDate: '2025-04-10',
      credentialId: 'GCP-PDE-2023-345678',
      credentialUrl: 'https://cloud.google.com/certification/verify',
      description: 'Validates expertise in designing, building, operationalizing, securing, and monitoring data processing systems.',
      skills: ['BigQuery', 'Cloud Dataflow', 'Machine Learning', 'Data Pipeline', 'Analytics'],
      category: 'Data Engineering',
      level: 'Professional',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&h=200',
      status: 'Active'
    },
    {
      id: '4',
      title: 'MongoDB Certified Developer Associate',
      issuer: 'MongoDB University',
      issueDate: '2023-02-15',
      credentialId: 'MDB-DEV-2023-123456',
      credentialUrl: 'https://university.mongodb.com/certification/verify',
      description: 'Demonstrates proficiency in developing applications with MongoDB, including data modeling and query optimization.',
      skills: ['MongoDB', 'NoSQL', 'Database Design', 'Aggregation Framework', 'Indexing'],
      category: 'Database',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=400&h=200',
      status: 'Active'
    },
    {
      id: '5',
      title: 'Certified Kubernetes Security Specialist (CKS)',
      issuer: 'Cloud Native Computing Foundation',
      issueDate: '2022-11-30',
      expiryDate: '2025-11-30',
      credentialId: 'CKS-2022-789012',
      credentialUrl: 'https://training.linuxfoundation.org/certification/verify',
      description: 'Validates skills required to secure container-based applications and Kubernetes platforms during build, deployment, and runtime.',
      skills: ['Kubernetes Security', 'Container Security', 'Network Policies', 'RBAC', 'Security Scanning'],
      category: 'Security',
      level: 'Professional',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&h=200',
      status: 'Active'
    },
    {
      id: '6',
      title: 'Microsoft Azure Solutions Architect Expert',
      issuer: 'Microsoft',
      issueDate: '2022-08-20',
      expiryDate: '2024-08-20',
      credentialId: 'AZ-305-2022-456789',
      credentialUrl: 'https://learn.microsoft.com/en-us/certifications',
      description: 'Validates advanced skills in designing solutions that run on Azure, including compute, network, storage, and security.',
      skills: ['Azure Architecture', 'Cloud Security', 'Identity Management', 'Cost Management'],
      category: 'Cloud Computing',
      level: 'Professional',
      image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=400&h=200',
      status: 'Expired'
    }
  ];

  const categories = ['All', 'Cloud Computing', 'DevOps', 'Data Engineering', 'Database', 'Security'];

  const filteredCertifications = certifications.filter(cert => {
    const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
    const matchesSearch = 
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Cloud Computing': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'DevOps': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300',
      'Data Engineering': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      'Database': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
      'Security': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'Beginner': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      'Intermediate': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      'Advanced': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
      'Professional': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300',
      'Expired': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      'Renewed': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  };

  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            <Award className="h-4 w-4" />
            Professional Certifications
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            Certifications & Credentials
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Industry-recognized certifications demonstrating expertise in cloud computing, DevOps, data engineering, and security
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search certifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
              </div>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertifications.map((cert) => (
            <div key={cert.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              {/* Certificate Image */}
              <div className="relative overflow-hidden h-48">
                <LazyImage
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(cert.status)}`}>
                    {cert.status}
                  </span>
                </div>

                {/* Level Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(cert.level)}`}>
                    {cert.level}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getCategoryColor(cert.category)}`}>
                    {cert.category}
                  </span>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                    {cert.issuer}
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {cert.description}
                </p>

                {/* Date Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(cert.issueDate)}
                  </div>
                  {cert.expiryDate && (
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      Expires {formatDate(cert.expiryDate)}
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setSelectedCertification(cert)}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200"
                  >
                    <Award className="h-4 w-4" />
                    View Details
                  </button>

                  <div className="flex gap-2">
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        title="Verify Certificate"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </a>
                    )}
                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                        title="Download Certificate"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    )}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                        title="View Credential"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { 
              number: filteredCertifications.filter(cert => cert.status === 'Active').length.toString(), 
              label: 'Active Certifications', 
              icon: CheckCircle 
            },
            { 
              number: new Set(filteredCertifications.map(cert => cert.category)).size.toString(), 
              label: 'Technology Areas', 
              icon: Award 
            },
            { 
              number: new Set(filteredCertifications.map(cert => cert.issuer)).size.toString(), 
              label: 'Certification Bodies', 
              icon: Shield 
            },
            { 
              number: filteredCertifications.filter(cert => cert.level === 'Professional').length.toString(), 
              label: 'Professional Level', 
              icon: Star 
            }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-4">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCertifications.length === 0 && (
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No certifications found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Certification Detail Modal */}
        {selectedCertification && (
          <CertificationModal
            certification={selectedCertification}
            onClose={() => setSelectedCertification(null)}
          />
        )}
      </div>
    </section>
  );
};

const CertificationModal: React.FC<{ certification: Certification; onClose: () => void }> = ({ 
  certification, 
  onClose 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <LazyImage
            src={certification.image}
            alt={certification.title}
            className="w-full h-64"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors duration-200"
          >
            <span className="text-xl">×</span>
          </button>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {certification.title}
            </h3>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-4">
              {certification.issuer}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(certification.category)}`}>
                {certification.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(certification.level)}`}>
                {certification.level}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(certification.status)}`}>
                {certification.status}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Certificate Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Issue Date:</span>
                  <span className="font-medium">{formatDate(certification.issueDate)}</span>
                </div>
                {certification.expiryDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Expiry Date:</span>
                    <span className="font-medium">{formatDate(certification.expiryDate)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Credential ID:</span>
                  <span className="font-medium font-mono text-sm">{certification.credentialId}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Skills Validated</h4>
              <div className="flex flex-wrap gap-2">
                {certification.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Description</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {certification.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            {certification.verificationUrl && (
              <a
                href={certification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                <CheckCircle className="h-4 w-4" />
                Verify Certificate
              </a>
            )}
            {certification.certificateUrl && (
              <a
                href={certification.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Download className="h-4 w-4" />
                Download Certificate
              </a>
            )}
            {certification.credentialUrl && (
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <ExternalLink className="h-4 w-4" />
                View Credential
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for color mapping
const getCategoryColor = (category: string) => {
  const colors = {
    'Cloud Computing': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    'DevOps': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300',
    'Data Engineering': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
    'Database': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
    'Security': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
};

const getLevelColor = (level: string) => {
  const colors = {
    'Beginner': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    'Intermediate': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    'Advanced': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
    'Professional': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
  };
  return colors[level as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
};

const getStatusColor = (status: string) => {
  const colors = {
    'Active': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300',
    'Expired': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
    'Renewed': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
};

export default Certifications;