import {
  Users,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp } from
'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar } from
'recharts';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
const revenueData = [
{
  name: 'Jan',
  total: 12000
},
{
  name: 'Feb',
  total: 19000
},
{
  name: 'Mar',
  total: 15000
},
{
  name: 'Apr',
  total: 28000
},
{
  name: 'May',
  total: 22000
},
{
  name: 'Jun',
  total: 35000
},
{
  name: 'Jul',
  total: 42000
}];

const salesData = [
{
  name: 'Laptops',
  sales: 4000
},
{
  name: 'Accessories',
  sales: 3000
},
{
  name: 'Monitors',
  sales: 2000
},
{
  name: 'Audio',
  sales: 1500
}];

const recentOrders = [
{
  id: 'ORD-001',
  customer: 'Alex Johnson',
  date: '2026-03-10',
  total: 3499,
  status: 'completed'
},
{
  id: 'ORD-002',
  customer: 'Sarah Smith',
  date: '2026-03-09',
  total: 199,
  status: 'processing'
},
{
  id: 'ORD-003',
  customer: 'Mike Brown',
  date: '2026-03-09',
  total: 2299,
  status: 'shipped'
},
{
  id: 'ORD-004',
  customer: 'Emily Davis',
  date: '2026-03-08',
  total: 99,
  status: 'completed'
}];

export function AdminDashboard() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Dashboard Overview
          </h1>
          <p className="text-body text-sm mt-1">
            Welcome back, Admin. Here's what's happening today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
        {
          title: 'Total Revenue',
          value: '$128,430',
          icon: DollarSign,
          trend: '+12.5%',
          color: 'text-accent-gold'
        },
        {
          title: 'Total Orders',
          value: '1,423',
          icon: ShoppingBag,
          trend: '+8.2%',
          color: 'text-accent-blue'
        },
        {
          title: 'Total Products',
          value: '342',
          icon: Package,
          trend: '+2.4%',
          color: 'text-status-success'
        },
        {
          title: 'Active Users',
          value: '8,942',
          icon: Users,
          trend: '+15.3%',
          color: 'text-primary'
        }].
        map((stat, i) =>
        <Card key={i} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-muted">{stat.title}</p>
                <h3 className="text-2xl font-bold text-primary mt-1">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-3 rounded-lg bg-elevated ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-status-success mr-1" />
              <span className="text-status-success font-medium">
                {stat.trend}
              </span>
              <span className="text-muted ml-2">vs last month</span>
            </div>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Revenue Chart */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-primary mb-6">
            Revenue Overview
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0
                }}>

                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e3b341" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#e3b341" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#373e47"
                  vertical={false} />

                <XAxis
                  dataKey="name"
                  stroke="#8f959c"
                  axisLine={false}
                  tickLine={false} />

                <YAxis
                  stroke="#8f959c"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`} />

                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2d333b',
                    borderColor: '#5c6269',
                    color: '#e7eaed'
                  }}
                  itemStyle={{
                    color: '#e3b341'
                  }} />

                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#e3b341"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorTotal)" />

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Sales by Category */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-primary mb-6">
            Sales by Category
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0
                }}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#373e47"
                  vertical={false} />

                <XAxis
                  dataKey="name"
                  stroke="#8f959c"
                  axisLine={false}
                  tickLine={false} />

                <YAxis stroke="#8f959c" axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{
                    fill: '#373e47'
                  }}
                  contentStyle={{
                    backgroundColor: '#2d333b',
                    borderColor: '#5c6269',
                    color: '#e7eaed'
                  }} />

                <Bar dataKey="sales" fill="#539bf5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-subtle/30 flex justify-between items-center">
          <h3 className="text-lg font-bold text-primary">Recent Orders</h3>
          <button className="text-sm text-accent-blue hover:text-accent-blueHover font-medium transition-colors">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-elevated/50 text-muted text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle/20">
              {recentOrders.map((order) =>
              <tr
                key={order.id}
                className="hover:bg-elevated/30 transition-colors">

                  <td className="p-4 text-primary font-medium">{order.id}</td>
                  <td className="p-4 text-body">{order.customer}</td>
                  <td className="p-4 text-body">{order.date}</td>
                  <td className="p-4 text-primary font-medium">
                    ${order.total.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <Badge
                    variant={
                    order.status === 'completed' ?
                    'success' :
                    order.status === 'processing' ?
                    'warning' :
                    'blue'
                    }
                    className="capitalize">

                      {order.status}
                    </Badge>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>);

}
