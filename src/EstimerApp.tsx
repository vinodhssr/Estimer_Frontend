import React, { useState } from 'react';
import { FileText, Users, DollarSign, TrendingUp, CheckCircle, Clock, AlertCircle, Menu, X, Home, Briefcase, Calculator, BarChart3, Settings, LogOut, Plus, Edit, Trash2, Eye, Download, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const EstimerApp = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const dashboardStats = [
    { title: 'Active Projects', value: '24', icon: Briefcase, color: 'bg-blue-500', trend: '+12%' },
    { title: 'Pending Approvals', value: '8', icon: Clock, color: 'bg-yellow-500', trend: '+3' },
    { title: 'Total Revenue', value: '₹45.2L', icon: DollarSign, color: 'bg-green-500', trend: '+18%' },
    { title: 'Completed', value: '156', icon: CheckCircle, color: 'bg-purple-500', trend: '+24' }
  ];

  const recentEstimations = [
    { id: 'EST-2025-001', client: 'Tech Corp', amount: '₹8,50,000', status: 'Approved', date: '2025-12-01' },
    { id: 'EST-2025-002', client: 'StartUp Inc', amount: '₹3,20,000', status: 'Under Negotiation', date: '2025-11-28' },
    { id: 'EST-2025-003', client: 'Global Systems', amount: '₹12,00,000', status: 'Sent to Client', date: '2025-11-25' },
    { id: 'EST-2025-004', client: 'Digital Solutions', amount: '₹5,75,000', status: 'Rejected', date: '2025-11-20' }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'estimations', label: 'Estimations', icon: Calculator },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const openModal = (type:any) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  const getStatusColor = (status:any) => {
    const colors = {
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Sent to Client': 'bg-blue-100 text-blue-800',
      'Under Negotiation': 'bg-yellow-100 text-yellow-800',
      'Expired': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const NewClientModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">Add New Client</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Company Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>New</option>
                    <option>Existing</option>
                    <option>Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Net 30</option>
                    <option>Net 45</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Client</button>
          </div>
        </div>
      </div>
    </div>
  );

  const NewEstimationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">Create New Estimation</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Select Client</option>
                    <option>Tech Corp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Validity</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>30 days</option>
                    <option>60 days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profit Margin</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue="15" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">HR Costs</h3>
                <button className="text-blue-600 text-sm flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Rate</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Hours</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3">
                        <select className="w-full px-2 py-1 border rounded text-sm">
                          <option>Developer</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input type="number" className="w-full px-2 py-1 border rounded text-sm" defaultValue="500" />
                      </td>
                      <td className="px-4 py-3">
                        <input type="number" className="w-full px-2 py-1 border rounded text-sm" defaultValue="160" />
                      </td>
                      <td className="px-4 py-3 font-semibold">₹80,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Direct Costs:</span>
                  <span className="font-semibold">₹1,25,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Profit:</span>
                  <span className="font-semibold">₹18,750</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span className="font-semibold">₹25,875</span>
                </div>
                <div className="border-t-2 pt-2 flex justify-between">
                  <span className="font-bold">Final:</span>
                  <span className="font-bold text-blue-600 text-xl">₹1,69,625</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={closeModal} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );

  const NewProjectModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold">Create Project</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Project Code</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="PRJ-2025-001" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Estimation</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>Select Estimation</option>
                <option>EST-2025-001</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <input type="date" className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={closeModal} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create</button>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button onClick={() => openModal('estimation')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          New Estimation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Estimations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentEstimations.map((est) => (
                <tr key={est.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">{est.id}</td>
                  <td className="px-6 py-4 text-sm">{est.client}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{est.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(est.status)}`}>
                      {est.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{est.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ClientsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clients</h1>
        <button onClick={() => openModal('client')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Client
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-8 border text-center">
        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Client list will appear here</p>
      </div>
    </div>
  );

  const ProjectsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button onClick={() => openModal('project')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Create Project
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-8 border text-center">
        <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Project list will appear here</p>
      </div>
    </div>
  );

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'clients': return <ClientsView />;
      case 'projects': return <ProjectsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {showModal && modalType === 'client' && <NewClientModal />}
      {showModal && modalType === 'estimation' && <NewEstimationModal />}
      {showModal && modalType === 'project' && <NewProjectModal />}

      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-6 flex items-center justify-between border-b border-gray-800">
          {sidebarOpen && <h1 className="text-xl font-bold">ESTIMER</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded-lg">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeView === item.id ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="text-xl font-semibold">Project Manager</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <AlertCircle className="w-6 h-6 text-gray-600 cursor-pointer" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                PM
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default EstimerApp;