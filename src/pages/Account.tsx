import React, { useState } from 'react';
import { User, Package, MapPin, Heart, Settings, LogOut } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { mockProducts } from '../data/mock';
export function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const tabs = [
  {
    id: 'profile',
    label: 'Profile',
    icon: User
  },
  {
    id: 'orders',
    label: 'My Orders',
    icon: Package
  },
  {
    id: 'addresses',
    label: 'Addresses',
    icon: MapPin
  }];

  const mockOrders = [
  {
    id: '#TTV-2026-0847',
    date: 'Mar 10, 2026',
    total: 3598.0,
    status: 'processing',
    items: 2
  },
  {
    id: '#TTV-2025-1122',
    date: 'Nov 22, 2025',
    total: 199.0,
    status: 'delivered',
    items: 1
  },
  {
    id: '#TTV-2025-0615',
    date: 'Jun 15, 2025',
    total: 2499.0,
    status: 'delivered',
    items: 1
  }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-subtle/30 text-center">
              <div className="w-20 h-20 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent-blue/30">
                <User className="w-10 h-10 text-accent-blue" />
              </div>
              <h3 className="font-bold text-primary">John Doe</h3>
              <p className="text-sm text-muted">john.doe@example.com</p>
            </div>
            <nav className="flex flex-col p-2">
              {tabs.map((tab) =>
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-accent-gold/10 text-accent-gold' : 'text-body hover:bg-elevated hover:text-primary'}`}>

                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              )}
              <div className="my-2 border-t border-subtle/30"></div>
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-status-error hover:bg-status-error/10 transition-colors">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </nav>
          </Card>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'profile' &&
          <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Personal Information
              </h2>
              <form className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="First Name" defaultValue="John" />
                  <Input label="Last Name" defaultValue="Doe" />
                  <Input
                  label="Email Address"
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="md:col-span-2" />

                  <Input
                  label="Phone Number"
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="md:col-span-2" />

                </div>
                <div className="pt-4 border-t border-subtle/30">
                  <h3 className="text-lg font-bold text-primary mb-4">
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <Input label="Current Password" type="password" />
                    <Input label="New Password" type="password" />
                    <Input label="Confirm New Password" type="password" />
                  </div>
                </div>
                <div className="pt-4">
                  <Button type="button">Save Changes</Button>
                </div>
              </form>
            </Card>
          }

          {activeTab === 'orders' &&
          <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Order History
              </h2>
              <div className="space-y-4">
                {mockOrders.map((order) =>
              <div
                key={order.id}
                className="border border-subtle/30 rounded-xl p-6 hover:border-subtle/60 transition-colors">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-bold text-primary">{order.id}</h3>
                        <p className="text-sm text-muted">
                          Placed on {order.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-primary">
                          ${order.total.toFixed(2)}
                        </span>
                        <Badge
                      variant={
                      order.status === 'delivered' ? 'success' : 'warning'
                      }
                      className="capitalize">

                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-subtle/30">
                      <span className="text-sm text-body">
                        {order.items} item(s)
                      </span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
              )}
              </div>
            </Card>
          }

          {activeTab === 'addresses' &&
          <Card className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">
                  Saved Addresses
                </h2>
                <Button size="sm">Add New</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-accent-gold rounded-xl p-6 relative">
                  <Badge variant="gold" className="absolute top-4 right-4">
                    Default
                  </Badge>
                  <h3 className="font-bold text-primary mb-2">Home</h3>
                  <p className="text-sm text-body leading-relaxed mb-4">
                    John Doe
                    <br />
                    123 Tech Boulevard, Apt 4B
                    <br />
                    San Francisco, CA 94105
                    <br />
                    United States
                  </p>
                  <div className="flex gap-3">
                    <button className="text-sm text-accent-blue hover:underline">
                      Edit
                    </button>
                    <button className="text-sm text-status-error hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="border border-subtle/30 rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-2">Office</h3>
                  <p className="text-sm text-body leading-relaxed mb-4">
                    John Doe
                    <br />
                    500 Startup Way, Suite 100
                    <br />
                    San Jose, CA 95110
                    <br />
                    United States
                  </p>
                  <div className="flex gap-3">
                    <button className="text-sm text-accent-blue hover:underline">
                      Edit
                    </button>
                    <button className="text-sm text-status-error hover:underline">
                      Delete
                    </button>
                    <button className="text-sm text-body hover:text-primary">
                      Set as Default
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          }
        </div>
      </div>
    </div>);

}