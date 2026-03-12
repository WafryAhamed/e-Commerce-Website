import { useState } from 'react';
import { Search, Filter, Eye, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
// Mock orders data for admin
const mockAdminOrders = [
{
  id: 'ORD-2026-0847',
  customer: 'Alex Johnson',
  email: 'alex@example.com',
  date: '2026-03-10',
  total: 3499.0,
  items: 2,
  status: 'pending',
  payment: 'paid'
},
{
  id: 'ORD-2026-0846',
  customer: 'Sarah Smith',
  email: 'sarah@example.com',
  date: '2026-03-09',
  total: 199.0,
  items: 1,
  status: 'processing',
  payment: 'paid'
},
{
  id: 'ORD-2026-0845',
  customer: 'Mike Brown',
  email: 'mike@example.com',
  date: '2026-03-09',
  total: 2299.0,
  items: 1,
  status: 'shipped',
  payment: 'paid'
},
{
  id: 'ORD-2026-0844',
  customer: 'Emily Davis',
  email: 'emily@example.com',
  date: '2026-03-08',
  total: 99.0,
  items: 1,
  status: 'delivered',
  payment: 'paid'
},
{
  id: 'ORD-2026-0843',
  customer: 'David Wilson',
  email: 'david@example.com',
  date: '2026-03-07',
  total: 4598.0,
  items: 3,
  status: 'cancelled',
  payment: 'refunded'
},
{
  id: 'ORD-2026-0842',
  customer: 'Jessica Taylor',
  email: 'jessica@example.com',
  date: '2026-03-06',
  total: 849.0,
  items: 2,
  status: 'delivered',
  payment: 'paid'
},
{
  id: 'ORD-2026-0841',
  customer: 'Thomas Anderson',
  email: 'thomas@example.com',
  date: '2026-03-05',
  total: 1299.0,
  items: 1,
  status: 'shipped',
  payment: 'paid'
},
{
  id: 'ORD-2026-0840',
  customer: 'Lisa Martin',
  email: 'lisa@example.com',
  date: '2026-03-04',
  total: 349.0,
  items: 4,
  status: 'delivered',
  payment: 'paid'
}];

export function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const tabs = [
  {
    id: 'all',
    label: 'All Orders'
  },
  {
    id: 'pending',
    label: 'Pending'
  },
  {
    id: 'processing',
    label: 'Processing'
  },
  {
    id: 'shipped',
    label: 'Shipped'
  },
  {
    id: 'delivered',
    label: 'Delivered'
  },
  {
    id: 'cancelled',
    label: 'Cancelled'
  }];

  const filteredOrders = mockAdminOrders.filter((order) => {
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    const matchesSearch =
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge variant="success">Delivered</Badge>;
      case 'shipped':
        return <Badge variant="blue">Shipped</Badge>;
      case 'processing':
        return <Badge variant="warning">Processing</Badge>;
      case 'pending':
        return <Badge variant="gold">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="error">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Paid</Badge>;
      case 'refunded':
        return <Badge variant="default">Refunded</Badge>;
      case 'failed':
        return <Badge variant="error">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Orders Management</h1>
          <p className="text-body text-sm mt-1">
            View and process customer orders.
          </p>
        </div>
        <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
          Export CSV
        </Button>
      </div>

      {/* Tabs & Search */}
      <Card className="p-0 overflow-hidden">
        <div className="flex overflow-x-auto custom-scrollbar border-b border-subtle/30">
          {tabs.map((tab) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors relative ${activeTab === tab.id ? 'text-accent-gold' : 'text-muted hover:text-primary'}`}>

              {tab.label}
              {activeTab === tab.id &&
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold" />

            }
            </button>
          )}
        </div>

        <div className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-center bg-elevated/20">
          <div className="w-full sm:w-96 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background border border-subtle/50 rounded-lg py-2 pl-9 pr-4 text-sm text-primary focus:outline-none focus:border-accent-blue transition-colors" />

          </div>
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            More Filters
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-elevated/50 text-muted text-xs uppercase tracking-wider border-b border-subtle/30">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Items</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Payment</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle/20">
              {filteredOrders.map((order) =>
              <motion.tr
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                key={order.id}
                className="hover:bg-elevated/30 transition-colors group">

                  <td className="p-4">
                    <span className="text-sm font-medium text-primary">
                      {order.id}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-primary">
                      {order.customer}
                    </p>
                    <p className="text-xs text-muted">{order.email}</p>
                  </td>
                  <td className="p-4 text-sm text-body">{order.date}</td>
                  <td className="p-4 text-sm text-body">{order.items} items</td>
                  <td className="p-4 text-sm font-medium text-primary">
                    $
                    {order.total.toLocaleString(undefined, {
                    minimumFractionDigits: 2
                  })}
                  </td>
                  <td className="p-4">{getPaymentBadge(order.payment)}</td>
                  <td className="p-4">{getStatusBadge(order.status)}</td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 text-muted hover:text-accent-blue hover:bg-accent-blue/10 rounded transition-colors inline-flex items-center gap-1 text-xs font-medium">
                      <Eye className="w-4 h-4" /> View
                    </button>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 &&
        <div className="p-12 text-center text-muted">
            No orders found matching your criteria.
          </div>
        }

        <div className="p-4 border-t border-subtle/30 flex items-center justify-between text-sm text-muted">
          <span>Showing {filteredOrders.length} orders</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded border border-subtle/30 hover:bg-elevated disabled:opacity-50">
              Prev
            </button>
            <button className="px-3 py-1 rounded bg-accent-blue text-background font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded border border-subtle/30 hover:bg-elevated">
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>);

}
