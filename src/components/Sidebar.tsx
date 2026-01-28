import React from 'react';
import { LayoutDashboard, ClipboardList, Users, Settings, LogOut, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/Sidebar.css';

export const Sidebar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">HR<span className="logo-accent">SaaS</span></div>
            </div>

            <nav className="sidebar-nav">
                <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link to="/evaluations" className={`nav-item ${isActive('/evaluations') ? 'active' : ''}`}>
                    <ClipboardList size={20} />
                    <span>Evaluations</span>
                </Link>
                <Link to="/team" className={`nav-item ${isActive('/team') ? 'active' : ''}`}>
                    <Users size={20} />
                    <span>Team</span>
                </Link>
            </nav>

            <div className="sidebar-footer">
                <Link to="/setup" className={`nav-item ${isActive('/setup') ? 'active' : ''}`}>
                    <Sparkles size={20} />
                    <span>AI Setup</span>
                </Link>
                <Link to="/settings" className="nav-item">
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
                <button className="nav-item logout-btn">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};
