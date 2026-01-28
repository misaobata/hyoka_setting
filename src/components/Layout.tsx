import React from 'react';
import { Sidebar } from './Sidebar';
import { Bell, Search } from 'lucide-react';
import '../styles/components/Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <Sidebar />
            <main className="main-content">
                <header className="top-header">
                    <div className="search-bar">
                        <Search size={18} className="search-icon" />
                        <input type="text" placeholder="Search..." />
                    </div>

                    <div className="header-actions">
                        <button className="icon-btn">
                            <Bell size={20} />
                            <span className="notification-dot"></span>
                        </button>
                        <div className="user-profile">
                            <div className="avatar">MO</div>
                            <span className="user-name">Misa Obata</span>
                        </div>
                    </div>
                </header>

                <div className="content-area">
                    {children}
                </div>
            </main>
        </div>
    );
};
