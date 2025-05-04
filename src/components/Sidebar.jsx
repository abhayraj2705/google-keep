import { useState } from 'react';
import LightbulbIcon from '../assets/lightbulb.svg';
import NotificationsIcon from '../assets/notifications.svg';
import EditIcon from '../assets/edit.svg';
import ArchiveIcon from '../assets/archive.svg';
import TrashIcon from '../assets/trash.svg';

const Sidebar = ({ isOpen }) => {
  const [activeItem, setActiveItem] = useState('notes');

  const menuItems = [
    { id: 'notes', icon: LightbulbIcon, label: 'Notes' },
    { id: 'reminders', icon: NotificationsIcon, label: 'Reminders' },
    { id: 'edit', icon: EditIcon, label: 'Edit labels' },
    { id: 'archive', icon: ArchiveIcon, label: 'Archive' },
    { id: 'trash', icon: TrashIcon, label: 'Trash' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {menuItems.map(item => (
        <button
          key={item.id}
          className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
          onClick={() => setActiveItem(item.id)}
        >
          <img src={item.icon} alt={item.label} />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;