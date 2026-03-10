import React, { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Shield,
  ShieldAlert,
  Ban } from
'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
const mockUsers = [
{
  id: 'USR-001',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'user',
  orders: 12,
  spent: 4590.0,
  status: 'active',
  joined: '2025-11-15'
},
{
  id: 'USR-002',
  name: 'Sarah Smith',
  email: 'sarah@example.com',
  role: 'admin',
  orders: 5,
  spent: 1250.0,
  status: 'active',
  joined: '2025-08-22'
},
{
  id: 'USR-003',
  name: 'Mike Brown',
  email: 'mike@example.com',
  role: 'user',
  orders: 2,
  spent: 2299.0,
  status: 'active',
  joined: '2026-01-10'
},
{
  id: 'USR-004',
  name: 'Emily Davis',
  email: 'emily@example.com',
  role: 'user',
  orders: 1,
  spent: 99.0,
  status: 'active',
  joined: '2026-02-28'
},
{
  id: 'USR-005',
  name: 'David Wilson',
  email: 'david@example.com',
  role: 'user',
  orders: 8,
  spent: 3150.0,
  status: 'blocked',
  joined: '2025-05-14'
},
{
  id: 'USR-006',
  name: 'Jessica Taylor',
  email: 'jessica@example.com',
  role: 'user',
  orders: 0,
  spent: 0,
  status: 'active',
  joined: '2026-03-01'
}];

export function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredUsers = mockUsers.filter(
    (user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Users Management</h1>
          <p className="text-body text-sm mt-1">
            Manage customers and admin accounts.
          </p>
        </div>
      </div>

      {/* Actions Bar */}
      <Card className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="w-full sm:w-96 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-subtle/50 rounded-lg py-2 pl-9 pr-4 text-sm text-primary focus:outline-none focus:border-accent-blue transition-colors" />

        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            leftIcon={<Filter className="w-4 h-4" />}
            className="flex-1 sm:flex-none">

            Filter Role
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-elevated/50 text-muted text-xs uppercase tracking-wider border-b border-subtle/30">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Orders</th>
                <th className="p-4 font-medium">Total Spent</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle/20">
              {filteredUsers.map((user) =>
              <motion.tr
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                key={user.id}
                className="hover:bg-elevated/30 transition-colors group">

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center font-bold flex-shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      {user.role === 'admin' ?
                    <>
                          <ShieldAlert className="w-4 h-4 text-accent-gold" />
                          <span className="text-sm font-medium text-accent-gold">
                            Admin
                          </span>
                        </> :

                    <>
                          <Shield className="w-4 h-4 text-muted" />
                          <span className="text-sm text-body">User</span>
                        </>
                    }
                    </div>
                  </td>
                  <td className="p-4 text-sm text-body">{user.orders}</td>
                  <td className="p-4 text-sm font-medium text-primary">
                    $
                    {user.spent.toLocaleString(undefined, {
                    minimumFractionDigits: 2
                  })}
                  </td>
                  <td className="p-4 text-sm text-body">{user.joined}</td>
                  <td className="p-4">
                    <Badge
                    variant={user.status === 'active' ? 'success' : 'error'}>

                      {user.status === 'active' ? 'Active' : 'Blocked'}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {user.status === 'active' ?
                    <button
                      className="p-1.5 text-muted hover:text-status-error hover:bg-status-error/10 rounded transition-colors"
                      title="Block User">

                          <Ban className="w-4 h-4" />
                        </button> :

                    <button
                      className="p-1.5 text-muted hover:text-status-success hover:bg-status-success/10 rounded transition-colors"
                      title="Unblock User">

                          <ShieldCheck className="w-4 h-4" />
                        </button>
                    }
                      <button className="p-1.5 text-muted hover:text-primary hover:bg-elevated rounded transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 &&
        <div className="p-8 text-center text-muted">
            No users found matching your search.
          </div>
        }
      </Card>
    </div>);

}