import React, { useState } from 'react';
import { Plus, Eye, Check, XCircle, RefreshCw, Briefcase, LogOut, Users, FileText, DollarSign, BarChart3, Upload, Printer } from 'lucide-react';

const Modal = ({ onClose, title, children, wide }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className={`bg-white rounded-lg shadow-xl ${wide ? 'max-w-4xl' : 'max-w-md'} w-full max-h-screen overflow-y-auto`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        {children}
      </div>
    </div>
  </div>
);

const Estimer = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [users] = useState([
    { user_id: 1, full_name: 'Admin User', email: 'admin@company.com', role_name: 'Admin' },
    { user_id: 2, full_name: 'John Client', email: 'john@client.com', role_name: 'Client' },
  ]);

  const [clients, setClients] = useState([
    { client_id: 1, client_name: 'Tech Corp', email: 'john@client.com', phone: '1234567890', address: '123 Main St', user_id: 2 }
  ]);

  const [projects, setProjects] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [milestones, setMilestones] = useState([]);

  const handleLogin = (email) => {
    const user = users.find(u => u.email === email);
    if (user) setCurrentUser(user);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const isAdmin = currentUser.role_name === 'Admin';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={currentUser} onLogout={() => setCurrentUser(null)} />
      
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={isAdmin} />
        
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && <Dashboard user={currentUser} clients={clients} projects={projects} estimates={estimates} invoices={invoices} />}
          {activeTab === 'clients' && <ClientsTab clients={clients} setClients={setClients} />}
          {activeTab === 'projects' && <ProjectsTab projects={projects} setProjects={setProjects} clients={clients} user={currentUser} milestones={milestones} setMilestones={setMilestones} />}
          {activeTab === 'estimates' && <EstimatesTab estimates={estimates} setEstimates={setEstimates} projects={projects} clients={clients} user={currentUser} />}
          {activeTab === 'invoices' && <InvoicesTab invoices={invoices} setInvoices={setInvoices} projects={projects} clients={clients} user={currentUser} payments={payments} setPayments={setPayments} milestones={milestones} />}
        </main>
      </div>
    </div>
  );
};

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Briefcase className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">GenXthofa Technologies</h1>
          <p className="text-gray-600 mt-2">Project Management System</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
          />
          
          <button
            onClick={() => onLogin(email)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Sign In
          </button>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm">
            <p className="font-semibold mb-2">Demo Accounts:</p>
            <p className="text-gray-600">Admin: admin@company.com</p>
            <p className="text-gray-600">Client: john@client.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ user, onLogout }) => (
  <header className="bg-white shadow-sm border-b border-gray-200">
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-4">
        <Briefcase className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-xl font-bold text-gray-800">GenXthofa Technologies</h1>
          <p className="text-xs text-gray-500">Project Management System</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">{user.full_name}</p>
          <p className="text-xs text-gray-500">{user.role_name}</p>
        </div>
        <button onClick={onLogout} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  </header>
);

const Sidebar = ({ activeTab, setActiveTab, isAdmin }) => {
  const tabs = isAdmin ? [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'estimates', label: 'Estimates', icon: FileText },
    { id: 'invoices', label: 'Invoices', icon: DollarSign },
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'projects', label: 'My Projects', icon: Briefcase },
    { id: 'estimates', label: 'Estimates', icon: FileText },
    { id: 'invoices', label: 'Invoices', icon: DollarSign },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

const Dashboard = ({ user, clients, projects, estimates, invoices }) => {
  const isAdmin = user.role_name === 'Admin';
  
  const stats = isAdmin ? [
    { label: 'Total Clients', value: clients.length },
    { label: 'Active Projects', value: projects.length },
    { label: 'Pending Estimates', value: estimates.filter(e => e.status === 'Pending').length },
    { label: 'Total Invoices', value: invoices.length },
  ] : [
    { label: 'My Projects', value: projects.length },
    { label: 'Pending Estimates', value: estimates.filter(e => e.status === 'Pending').length },
    { label: 'Invoices', value: invoices.length },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ClientsTab = ({ clients, setClients }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ client_name: '', email: '', phone: '', address: '' });

  const handleSubmit = () => {
    setClients([...clients, { client_id: clients.length + 1, ...formData }]);
    setShowModal(false);
    setFormData({ client_name: '', email: '', phone: '', address: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Clients</h2>
        <button onClick={() => setShowModal(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          <span>Add Client</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {clients.map(client => (
              <tr key={client.client_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{client.client_name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{client.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{client.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{client.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Add New Client">
          <div className="space-y-4">
            <input placeholder="Client Name" value={formData.client_name} onChange={(e) => setFormData({...formData, client_name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            <input placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            <input placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            <input placeholder="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Create Client</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

const ProjectsTab = ({ projects, setProjects, clients, user, milestones, setMilestones }) => {
  const [showModal, setShowModal] = useState(false);
  const [viewProject, setViewProject] = useState(null);
  const [formData, setFormData] = useState({ project_name: '', project_code: '', client_id: '', start_date: '', planned_end_date: '', payment_terms: 30 });

  const handleSubmit = () => {
    setProjects([...projects, { project_id: projects.length + 1, ...formData, status: 'Active' }]);
    setShowModal(false);
    setFormData({ project_name: '', project_code: '', client_id: '', start_date: '', planned_end_date: '', payment_terms: 30 });
  };

  const isAdmin = user.role_name === 'Admin';

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        {isAdmin && (
          <button onClick={() => setShowModal(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            <span>Create Project</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => {
          const client = clients.find(c => c.client_id === parseInt(project.client_id));
          return (
            <div key={project.project_id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{project.project_name}</h3>
                <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">{project.status}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Code:</span> {project.project_code}</p>
              <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Client:</span> {client?.client_name}</p>
              <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Start:</span> {project.start_date}</p>
              <p className="text-sm text-gray-600 mb-4"><span className="font-medium">Payment Terms:</span> {project.payment_terms} days</p>
              <button onClick={() => setViewProject(project)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                View Milestones
              </button>
            </div>
          );
        })}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Create New Project">
          <div className="space-y-4">
            <input placeholder="Project Name" value={formData.project_name} onChange={(e) => setFormData({...formData, project_name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            <input placeholder="Project Code" value={formData.project_code} onChange={(e) => setFormData({...formData, project_code: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            <select value={formData.client_id} onChange={(e) => setFormData({...formData, client_id: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select Client</option>
              {clients.map(c => <option key={c.client_id} value={c.client_id}>{c.client_name}</option>)}
            </select>
            <input type="date" value={formData.start_date} onChange={(e) => setFormData({...formData, start_date: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Start Date" />
            <input type="date" value={formData.planned_end_date} onChange={(e) => setFormData({...formData, planned_end_date: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="End Date" />
            <input type="number" value={formData.payment_terms} onChange={(e) => setFormData({...formData, payment_terms: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Payment Terms (days)" />
            <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Create Project</button>
          </div>
        </Modal>
      )}

      {viewProject && (
        <ProjectMilestonesModal project={viewProject} milestones={milestones} setMilestones={setMilestones} onClose={() => setViewProject(null)} isAdmin={isAdmin} />
      )}
    </div>
  );
};

const ProjectMilestonesModal = ({ project, milestones, setMilestones, onClose, isAdmin }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', percentage: '', amount: '', date: '' });
  
  const projectMilestones = milestones.filter(m => m.project_id === project.project_id);

  const handleAdd = () => {
    setMilestones([...milestones, {
      milestone_id: milestones.length + 1,
      project_id: project.project_id,
      milestone_name: formData.name,
      description: formData.description,
      payment_percentage: parseFloat(formData.percentage),
      milestone_amount: parseFloat(formData.amount),
      planned_completion_date: formData.date,
      status: 'Pending'
    }]);
    setShowAdd(false);
    setFormData({ name: '', description: '', percentage: '', amount: '', date: '' });
  };

  return (
    <Modal onClose={onClose} title={`Milestones - ${project.project_name}`} wide>
      <div className="space-y-4">
        {isAdmin && (
          <button onClick={() => setShowAdd(!showAdd)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 inline mr-2" />Add Milestone
          </button>
        )}

        {showAdd && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <input placeholder="Milestone Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded" />
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border rounded" rows="2" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Payment %" value={formData.percentage} onChange={(e) => setFormData({...formData, percentage: e.target.value})} className="px-3 py-2 border rounded" />
              <input type="number" placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="px-3 py-2 border rounded" />
            </div>
            <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border rounded" />
            <button onClick={handleAdd} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Add Milestone</button>
          </div>
        )}

        <div className="space-y-3">
          {projectMilestones.map(ms => (
            <div key={ms.milestone_id} className="bg-white border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-lg">{ms.milestone_name}</h4>
                  <p className="text-sm text-gray-600">{ms.description}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  ms.status === 'Completed' ? 'bg-green-100 text-green-600' :
                  ms.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {ms.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Payment %</p>
                  <p className="font-semibold">{ms.payment_percentage}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Amount</p>
                  <p className="font-semibold">₹{ms.milestone_amount?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Due Date</p>
                  <p className="font-semibold">{ms.planned_completion_date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

const EstimatesTab = ({ estimates, setEstimates, projects, clients, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [viewEstimate, setViewEstimate] = useState(null);
  const [editEstimate, setEditEstimate] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [directCosts, setDirectCosts] = useState([{ name: '', qty: '', rate: '', months: 1 }]);
  const [indirectCosts, setIndirectCosts] = useState([{ name: '', amount: '' }]);
  const [additionalCosts, setAdditionalCosts] = useState([{ name: '', amount: '' }]);
  const [profit, setProfit] = useState(15);
  const [tax, setTax] = useState(18);
  const [changeComment, setChangeComment] = useState('');

  const isAdmin = user.role_name === 'Admin';

  const calcTotal = () => {
    const dc = directCosts.reduce((s, c) => s + (parseFloat(c.qty || 0) * parseFloat(c.rate || 0) * parseFloat(c.months || 1)), 0);
    const ic = indirectCosts.reduce((s, c) => s + parseFloat(c.amount || 0), 0);
    const ac = additionalCosts.reduce((s, c) => s + parseFloat(c.amount || 0), 0);
    const sub = dc + ic + ac;
    const pAmt = (sub * profit) / 100;
    const tAmt = ((sub + pAmt) * tax) / 100;
    const final = sub + pAmt + tAmt;
    return { dc, ic, ac, sub, pAmt, tAmt, final };
  };

  const handleSubmit = () => {
    const t = calcTotal();
    const versionNum = estimates.filter(e => e.project_id === parseInt(selectedProject)).length + 1;
    setEstimates([...estimates, {
      estimation_id: estimates.length + 1,
      project_id: parseInt(selectedProject),
      version: versionNum,
      status: 'Pending',
      directCosts, indirectCosts, additionalCosts,
      profit, tax, ...t,
      created_at: new Date().toISOString()
    }]);
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedProject('');
    setDirectCosts([{ name: '', qty: '', rate: '', months: 1 }]);
    setIndirectCosts([{ name: '', amount: '' }]);
    setAdditionalCosts([{ name: '', amount: '' }]);
    setProfit(15);
    setTax(18);
    setChangeComment('');
  };

  const handleChangeRequest = (estId, comment) => {
    setEstimates(estimates.map(e => e.estimation_id === estId ? {...e, status: 'Change Requested', change_comment: comment} : e));
  };

  const handleEdit = (est) => {
    setEditEstimate(est);
    setSelectedProject(est.project_id.toString());
    setDirectCosts(est.directCosts);
    setIndirectCosts(est.indirectCosts);
    setAdditionalCosts(est.additionalCosts);
    setProfit(est.profit);
    setTax(est.tax);
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Estimates</h2>
        {isAdmin && (
          <button onClick={() => { setEditEstimate(null); setShowModal(true); }} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            <span>Create</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {estimates.map(est => {
          const proj = projects.find(p => p.project_id === est.project_id);
          const cli = clients.find(c => c.client_id === parseInt(proj?.client_id));
          
          return (
            <div key={est.estimation_id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{proj?.project_name}</h3>
                  <p className="text-sm text-gray-600">Client: {cli?.client_name}</p>
                  <p className="text-xs text-gray-500">Version {est.version}</p>
                  {est.change_comment && (
                    <div className="mt-2 bg-orange-50 border-l-4 border-orange-500 p-2 rounded">
                      <p className="text-xs font-semibold text-orange-800">Change Request:</p>
                      <p className="text-xs text-orange-700">{est.change_comment}</p>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    est.status === 'Approved' ? 'bg-green-100 text-green-600' :
                    est.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                    est.status === 'Change Requested' ? 'bg-orange-100 text-orange-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {est.status}
                  </span>
                  <p className="text-2xl font-bold mt-2">₹{est.final?.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Direct</p>
                  <p className="text-lg font-semibold">₹{est.dc?.toFixed(2)}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Indirect</p>
                  <p className="text-lg font-semibold">₹{est.ic?.toFixed(2)}</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Additional</p>
                  <p className="text-lg font-semibold">₹{est.ac?.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button onClick={() => setViewEstimate(est)} className="flex-1 bg-gray-100 py-2 rounded hover:bg-gray-200">
                  <Eye className="w-4 h-4 inline mr-1" />View
                </button>
                
                {!isAdmin && est.status === 'Pending' && (
                  <>
                    <button onClick={() => setEstimates(estimates.map(e => e.estimation_id === est.estimation_id ? {...e, status: 'Approved'} : e))} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">
                      <Check className="w-4 h-4 inline mr-1" />Approve
                    </button>
                    <button onClick={() => setEstimates(estimates.map(e => e.estimation_id === est.estimation_id ? {...e, status: 'Rejected'} : e))} className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700">
                      <XCircle className="w-4 h-4 inline mr-1" />Reject
                    </button>
                    <button onClick={() => {
                      const comment = prompt('Enter change request comment:');
                      if (comment) handleChangeRequest(est.estimation_id, comment);
                    }} className="flex-1 bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
                      <RefreshCw className="w-4 h-4 inline mr-1" />Change
                    </button>
                  </>
                )}
                
                {isAdmin && est.status === 'Change Requested' && (
                  <button onClick={() => handleEdit(est)} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Edit & Resubmit
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <Modal onClose={() => { setShowModal(false); resetForm(); }} title={editEstimate ? "Edit Estimate" : "Create Estimate"} wide>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} className="w-full px-4 py-2 border rounded-lg" disabled={editEstimate}>
              <option value="">Select Project</option>
              {projects.map(p => <option key={p.project_id} value={p.project_id}>{p.project_name}</option>)}
            </select>

            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">Direct Costs</h3>
                <button onClick={() => setDirectCosts([...directCosts, { name: '', qty: '', rate: '', months: 1 }])} className="text-blue-600 text-sm">
                  <Plus className="w-4 h-4 inline" />
                </button>
              </div>
              {directCosts.map((c, i) => (
                <div key={i} className="bg-blue-50 p-2 rounded mb-2 grid grid-cols-4 gap-2">
                  <input placeholder="Name" value={c.name} onChange={(e) => {
                    const u = [...directCosts];
                    u[i].name = e.target.value;
                    setDirectCosts(u);
                  }} className="px-2 py-1 border rounded text-sm" />
                  <input type="number" placeholder="Qty" value={c.qty} onChange={(e) => {
                    const u = [...directCosts];
                    u[i].qty = e.target.value;
                    setDirectCosts(u);
                  }} className="px-2 py-1 border rounded text-sm" />
                  <input type="number" placeholder="Rate" value={c.rate} onChange={(e) => {
                    const u = [...directCosts];
                    u[i].rate = e.target.value;
                    setDirectCosts(u);
                  }} className="px-2 py-1 border rounded text-sm" />
                  <input type="number" placeholder="Mo" value={c.months} onChange={(e) => {
                    const u = [...directCosts];
                    u[i].months = e.target.value;
                    setDirectCosts(u);
                  }} className="px-2 py-1 border rounded text-sm" />
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">Indirect Costs</h3>
                <button onClick={() => setIndirectCosts([...indirectCosts, { name: '', amount: '' }])} className="text-purple-600 text-sm">
                  <Plus className="w-4 h-4 inline" />
                </button>
              </div>
              {indirectCosts.map((c, i) => (
                <div key={i} className="bg-purple-50 p-2 rounded mb-2 grid grid-cols-2 gap-2">
                  <input placeholder="Name" value={c.name} onChange={(e) => {
                    const u = [...indirectCosts];
                    u[i].name = e.target.value;
                    setIndirectCosts(u);
                  }} className="px-2 py-1 border rounded text-sm" />
                  <input type="number" placeholder="Amount" value={c.amount} onChange={(e) => {
                    const u = [...indirectCosts];
                    u[i].amount = e.target.value;
                    setIndirectCosts(u);
                  }} className="px-2 py-1 border rounded text-sm" />
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">Additional Costs</h3>
                <button onClick={() => setAdditionalCosts([...additionalCosts, { name: '', amount: '' }])} className="text-green-600 text-sm">
                  <Plus className="w-4 h-4 inline" />
                </button>
              </div>
              {additionalCosts.map((c, i) => (
                <div key={i} className="bg-green-50 p-2 rounded mb-2 grid grid-cols-2 gap-2">
                  <input placeholder="Name" value={c.name} onChange={(e) => {
                    const u = [...additionalCosts];
                    u[i].name = e.target.value;
                    setAdditionalCosts(u);
                  }} className="px-2 py-1 border rounded text-sm" />
                  <input type="number" placeholder="Amount" value={c.amount} onChange={(e) => {
                    const u = [...additionalCosts];
                    u[i].amount = e.target.value;
                    setAdditionalCosts(u);
                  }} className="px-2 py-1 border rounded text-sm" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Profit %</label>
                <input type="number" value={profit} onChange={(e) => setProfit(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm mb-1">Tax %</label>
                <input type="number" value={tax} onChange={(e) => setTax(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded" />
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded">
              <div className="flex justify-between text-sm mb-1">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{calcTotal().sub.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Profit ({profit}%):</span>
                <span className="font-semibold text-green-600">₹{calcTotal().pAmt.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Tax ({tax}%):</span>
                <span className="font-semibold text-blue-600">₹{calcTotal().tAmt.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                <span>Final Amount:</span>
                <span className="text-blue-600">₹{calcTotal().final.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              {editEstimate ? 'Update Estimate' : 'Create Estimate'}
            </button>
          </div>
        </Modal>
      )}

      {viewEstimate && (
        <Modal onClose={() => setViewEstimate(null)} title="Estimate Details" wide>
          <div className="space-y-4">
            {viewEstimate.change_comment && (
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <p className="font-semibold text-orange-800 mb-1">Change Request Comment:</p>
                <p className="text-orange-700">{viewEstimate.change_comment}</p>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Direct Costs</h4>
              {viewEstimate.directCosts.map((c, i) => (
                <div key={i} className="flex justify-between text-sm mb-1">
                  <span>{c.name} ({c.qty} × ₹{c.rate} × {c.months} months)</span>
                  <span className="font-medium">₹{(c.qty * c.rate * c.months).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-sm mt-2 pt-2 border-t">
                <span>Total Direct Costs:</span>
                <span>₹{viewEstimate.dc.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Indirect Costs</h4>
              {viewEstimate.indirectCosts.map((c, i) => (
                <div key={i} className="flex justify-between text-sm mb-1">
                  <span>{c.name}</span>
                  <span className="font-medium">₹{parseFloat(c.amount).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-sm mt-2 pt-2 border-t">
                <span>Total Indirect Costs:</span>
                <span>₹{viewEstimate.ic.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Additional Costs</h4>
              {viewEstimate.additionalCosts.map((c, i) => (
                <div key={i} className="flex justify-between text-sm mb-1">
                  <span>{c.name}</span>
                  <span className="font-medium">₹{parseFloat(c.amount).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-sm mt-2 pt-2 border-t">
                <span>Total Additional Costs:</span>
                <span>₹{viewEstimate.ac.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded border-2 border-blue-200">
              <h4 className="font-semibold mb-3 text-blue-800">Cost Summary</h4>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{viewEstimate.sub.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Profit ({viewEstimate.profit}%):</span>
                <span className="font-semibold text-green-600">₹{viewEstimate.pAmt.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span>Tax ({viewEstimate.tax}%):</span>
                <span className="font-semibold text-blue-600">₹{viewEstimate.tAmt.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t-2 border-blue-300 pt-3 mt-2">
                <span>Final Amount:</span>
                <span className="text-blue-600">₹{viewEstimate.final.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const InvoicesTab = ({ invoices, setInvoices, projects, clients, user, payments, setPayments, milestones }) => {
  const [showModal, setShowModal] = useState(false);
  const [viewInvoice, setViewInvoice] = useState(null);
  const [showPayment, setShowPayment] = useState(null);
  const [projId, setProjId] = useState('');
  const [milestoneId, setMilestoneId] = useState('');
  const [invDate, setInvDate] = useState('');
  const [amount, setAmount] = useState('');
  const [taxRate, setTaxRate] = useState(18);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [paymentRef, setPaymentRef] = useState('');

  const isAdmin = user.role_name === 'Admin';

  const handleCreate = () => {
    const proj = projects.find(p => p.project_id === parseInt(projId));
    const taxAmt = (parseFloat(amount) * taxRate) / 100;
    const total = parseFloat(amount) + taxAmt;
    
    // Calculate due date based on payment terms
    const invoiceDate = new Date(invDate);
    const paymentTerms = parseInt(proj?.payment_terms || 30);
    const calculatedDueDate = new Date(invoiceDate);
    calculatedDueDate.setDate(calculatedDueDate.getDate() + paymentTerms);
    const dueDateStr = calculatedDueDate.toISOString().split('T')[0];

    setInvoices([...invoices, {
      invoice_id: invoices.length + 1,
      invoice_number: `INV-${Date.now()}`,
      project_id: parseInt(projId),
      milestone_id: milestoneId ? parseInt(milestoneId) : null,
      client_id: proj?.client_id,
      invoice_date: invDate,
      due_date: dueDateStr,
      amount: parseFloat(amount),
      tax_rate: taxRate,
      tax_amount: taxAmt,
      total_amount: total,
      paid_amount: 0,
      balance: total,
      status: 'Unpaid'
    }]);
    setShowModal(false);
    setProjId('');
    setMilestoneId('');
    setInvDate('');
    setAmount('');
    setTaxRate(18);
  };

  const handlePayment = (invId) => {
    const inv = invoices.find(i => i.invoice_id === invId);
    const newPayment = {
      payment_id: payments.length + 1,
      invoice_id: invId,
      amount: parseFloat(paymentAmount),
      payment_date: paymentDate,
      payment_mode: paymentMode,
      reference: paymentRef
    };
    
    setPayments([...payments, newPayment]);
    
    const newPaid = inv.paid_amount + parseFloat(paymentAmount);
    const newBalance = inv.total_amount - newPaid;
    const newStatus = newBalance === 0 ? 'Paid' : newBalance < inv.total_amount ? 'Partially Paid' : 'Unpaid';
    
    setInvoices(invoices.map(i => i.invoice_id === invId ? {
      ...i,
      paid_amount: newPaid,
      balance: newBalance,
      status: newStatus
    } : i));
    
    // If invoice is fully paid and linked to a milestone, mark milestone as completed
    if (newBalance === 0 && inv.milestone_id) {
      setMilestones(milestones.map(m => 
        m.milestone_id === inv.milestone_id ? {...m, status: 'Completed'} : m
      ));
    }
    
    setShowPayment(null);
    setPaymentAmount('');
    setPaymentDate('');
    setPaymentMode('');
    setPaymentRef('');
  };

  const printInvoice = (inv) => {
    const proj = projects.find(p => p.project_id === inv.project_id);
    const cli = clients.find(c => c.client_id === parseInt(inv.client_id));
    const milestone = milestones.find(m => m.milestone_id === inv.milestone_id);
    const invPayments = payments.filter(p => p.invoice_id === inv.invoice_id);
    
    const printContent = `
      <html>
        <head>
          <title>Invoice ${inv.invoice_number}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
            .company-name { font-size: 28px; font-weight: bold; color: #2563eb; margin-bottom: 5px; }
            .company-tagline { font-size: 14px; color: #666; margin-bottom: 15px; }
            .invoice-title { font-size: 24px; font-weight: bold; margin-top: 10px; color: #333; }
            .invoice-meta { display: flex; justify-content: space-between; margin: 30px 0; }
            .invoice-number { font-size: 18px; font-weight: bold; color: #2563eb; }
            .details-section { margin: 30px 0; }
            .section-title { font-size: 14px; font-weight: bold; color: #666; margin-bottom: 10px; text-transform: uppercase; }
            .client-details { background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .client-name { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
            .project-details { background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; }
            table { width: 100%; border-collapse: collapse; margin: 30px 0; }
            th { background-color: #2563eb; color: white; padding: 15px; text-align: left; font-weight: bold; }
            td { border: 1px solid #e5e7eb; padding: 12px; }
            .amount-cell { text-align: right; font-weight: 600; }
            .subtotal-row td { background-color: #f9fafb; font-weight: 600; }
            .total-row td { background-color: #2563eb; color: white; font-weight: bold; font-size: 16px; }
            .payment-history { background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 30px 0; }
            .payment-item { padding: 10px 0; border-bottom: 1px solid #d1fae5; }
            .payment-item:last-child { border-bottom: none; }
            .footer { margin-top: 60px; text-align: center; color: #666; border-top: 2px solid #e5e7eb; padding-top: 30px; }
            .thank-you { font-size: 18px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
            .status-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }
            .status-paid { background: #dcfce7; color: #166534; }
            .status-partial { background: #fef3c7; color: #92400e; }
            .status-unpaid { background: #fee2e2; color: #991b1b; }
            @media print {
              body { padding: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">GENXTHOFA TECHNOLOGIES</div>
            <div class="company-tagline">Project Management & Development Solutions</div>
            <div class="invoice-title">TAX INVOICE</div>
          </div>
          
          <div class="invoice-meta">
            <div>
              <div class="invoice-number">Invoice #${inv.invoice_number}</div>
              <div style="margin-top: 5px;">
                <span class="status-badge status-${inv.status === 'Paid' ? 'paid' : inv.status === 'Partially Paid' ? 'partial' : 'unpaid'}">
                  ${inv.status.toUpperCase()}
                </span>
              </div>
            </div>
            <div style="text-align: right;">
              <div><strong>Invoice Date:</strong> ${inv.invoice_date}</div>
              <div><strong>Due Date:</strong> ${inv.due_date}</div>
            </div>
          </div>
          
          <div class="details-section">
            <div class="section-title">Bill To</div>
            <div class="client-details">
              <div class="client-name">${cli?.client_name || 'N/A'}</div>
              <div>${cli?.email || 'N/A'}</div>
              <div>${cli?.phone || 'N/A'}</div>
              <div>${cli?.address || 'N/A'}</div>
            </div>
          </div>
          
          <div class="details-section">
            <div class="section-title">Project Information</div>
            <div class="project-details">
              <div><strong>Project Name:</strong> ${proj?.project_name || 'N/A'}</div>
              <div><strong>Project Code:</strong> ${proj?.project_code || 'N/A'}</div>
              ${milestone ? `<div><strong>Milestone:</strong> ${milestone.milestone_name}</div>` : ''}
              ${milestone?.description ? `<div><strong>Description:</strong> ${milestone.description}</div>` : ''}
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th style="width: 60%">Description</th>
                <th style="width: 40%; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${milestone ? milestone.milestone_name : 'Project Payment'}</td>
                <td class="amount-cell">₹${inv.amount.toFixed(2)}</td>
              </tr>
              <tr class="subtotal-row">
                <td>Subtotal</td>
                <td class="amount-cell">₹${inv.amount.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Tax (${inv.tax_rate}%)</td>
                <td class="amount-cell">₹${inv.tax_amount.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td>TOTAL AMOUNT</td>
                <td class="amount-cell">₹${inv.total_amount.toFixed(2)}</td>
              </tr>
              ${inv.paid_amount > 0 ? `
              <tr>
                <td style="color: #059669; font-weight: 600;">Amount Paid</td>
                <td class="amount-cell" style="color: #059669; font-weight: 600;">₹${inv.paid_amount.toFixed(2)}</td>
              </tr>
              ` : ''}
              ${inv.balance > 0 ? `
              <tr style="background: #fef2f2;">
                <td style="color: #dc2626; font-weight: 600;">BALANCE DUE</td>
                <td class="amount-cell" style="color: #dc2626; font-weight: 600;">₹${inv.balance.toFixed(2)}</td>
              </tr>
              ` : ''}
            </tbody>
          </table>
          
          ${invPayments.length > 0 ? `
          <div class="payment-history">
            <div class="section-title" style="color: #059669;">Payment History</div>
            ${invPayments.map(pmt => `
              <div class="payment-item">
                <div style="display: flex; justify-content: space-between;">
                  <div>
                    <strong>₹${pmt.amount.toFixed(2)}</strong> - ${pmt.payment_date}
                  </div>
                  <div>${pmt.payment_mode} (Ref: ${pmt.reference})</div>
                </div>
              </div>
            `).join('')}
          </div>
          ` : ''}
          
          <div class="footer">
            <div class="thank-you">Thank You For Your Business!</div>
            <div>GenXthofa Technologies</div>
            <div style="margin-top: 5px; font-size: 12px;">This is a computer generated invoice</div>
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Invoices</h2>
        {isAdmin && (
          <button onClick={() => setShowModal(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            <span>Create Invoice</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {invoices.map(inv => {
          const proj = projects.find(p => p.project_id === inv.project_id);
          const cli = clients.find(c => c.client_id === parseInt(inv.client_id));
          const milestone = milestones.find(m => m.milestone_id === inv.milestone_id);
          const invPayments = payments.filter(p => p.invoice_id === inv.invoice_id);

          return (
            <div key={inv.invoice_id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{inv.invoice_number}</h3>
                  <p className="text-sm text-gray-600">Project: {proj?.project_name}</p>
                  <p className="text-sm text-gray-600">Client: {cli?.client_name}</p>
                  {milestone && <p className="text-xs text-gray-500">Milestone: {milestone.milestone_name}</p>}
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    inv.status === 'Paid' ? 'bg-green-100 text-green-600' :
                    inv.status === 'Partially Paid' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {inv.status}
                  </span>
                  <p className="text-2xl font-bold mt-2">₹{inv.total_amount?.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded mb-4">
                <div>
                  <p className="text-xs text-gray-600">Invoice Date</p>
                  <p className="font-semibold">{inv.invoice_date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Due Date</p>
                  <p className="font-semibold">{inv.due_date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Amount</p>
                  <p className="font-semibold">₹{inv.amount?.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Tax ({inv.tax_rate}%)</p>
                  <p className="font-semibold">₹{inv.tax_amount?.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Paid</p>
                  <p className="font-semibold text-green-600">₹{inv.paid_amount?.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Balance</p>
                  <p className="font-semibold text-red-600">₹{inv.balance?.toFixed(2)}</p>
                </div>
              </div>

              {invPayments.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Payment History</h4>
                  {invPayments.map(pmt => (
                    <div key={pmt.payment_id} className="text-xs bg-green-50 p-2 rounded mb-1">
                      ₹{pmt.amount.toFixed(2)} - {pmt.payment_date} - {pmt.payment_mode} ({pmt.reference})
                    </div>
                  ))}
                </div>
              )}

              <div className="flex space-x-2">
                <button onClick={() => printInvoice(inv)} className="flex-1 bg-gray-100 py-2 rounded hover:bg-gray-200">
                  <Printer className="w-4 h-4 inline mr-1" />Print
                </button>
                <button onClick={() => setViewInvoice(inv)} className="flex-1 bg-blue-100 text-blue-600 py-2 rounded hover:bg-blue-200">
                  <Eye className="w-4 h-4 inline mr-1" />View
                </button>
                {!isAdmin && inv.balance > 0 && (
                  <button onClick={() => setShowPayment(inv.invoice_id)} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    <Upload className="w-4 h-4 inline mr-1" />Pay
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Create Invoice">
          <div className="space-y-4">
            <select value={projId} onChange={(e) => {
              setProjId(e.target.value);
              setMilestoneId('');
            }} className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select Project</option>
              {projects.map(p => <option key={p.project_id} value={p.project_id}>{p.project_name}</option>)}
            </select>
            
            {projId && (
              <select value={milestoneId} onChange={(e) => setMilestoneId(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                <option value="">Select Milestone (Optional)</option>
                {milestones.filter(m => m.project_id === parseInt(projId)).map(m => 
                  <option key={m.milestone_id} value={m.milestone_id}>{m.milestone_name}</option>
                )}
              </select>
            )}
            
            <input type="date" value={invDate} onChange={(e) => setInvDate(e.target.value)} placeholder="Invoice Date" className="w-full px-4 py-2 border rounded-lg" />
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due Date" className="w-full px-4 py-2 border rounded-lg" />
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="w-full px-4 py-2 border rounded-lg" />
            <input type="number" value={taxRate} onChange={(e) => setTaxRate(parseFloat(e.target.value))} placeholder="Tax %" className="w-full px-4 py-2 border rounded-lg" />
            
            {amount && (
              <div className="bg-gray-100 p-4 rounded">
                <div className="flex justify-between text-sm mb-1">
                  <span>Amount:</span>
                  <span>₹{parseFloat(amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Tax ({taxRate}%):</span>
                  <span>₹{((parseFloat(amount) * taxRate) / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span>₹{(parseFloat(amount) + (parseFloat(amount) * taxRate) / 100).toFixed(2)}</span>
                </div>
              </div>
            )}

            <button onClick={handleCreate} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Create Invoice
            </button>
          </div>
        </Modal>
      )}

      {showPayment && (
        <Modal onClose={() => setShowPayment(null)} title="Record Payment">
          <div className="space-y-4">
            <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="Payment Amount" className="w-full px-4 py-2 border rounded-lg" />
            <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
            <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select Payment Mode</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
            </select>
            <input value={paymentRef} onChange={(e) => setPaymentRef(e.target.value)} placeholder="Transaction Reference" className="w-full px-4 py-2 border rounded-lg" />
            <button onClick={() => handlePayment(showPayment)} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Submit Payment
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Estimer;