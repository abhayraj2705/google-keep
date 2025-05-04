import { useState } from 'react';
import { MdAutoAwesome } from 'react-icons/md';
import PinIcon from '../assets/pin.svg';
import DeleteIcon from '../assets/delete.svg';

const Note = ({ note, onDelete, onUpdate, onPin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  const handleUpdate = () => {
    onUpdate(editedNote);
    setIsEditing(false);
  };

  return (
    <div 
      className={`note ${isEditing ? 'editing' : ''}`}
      style={{ backgroundColor: note.backgroundColor }}
    >
      {isEditing ? (
        <div className="note-edit">
          <input
            type="text"
            value={editedNote.title}
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
            placeholder="Title"
          />
          <textarea
            value={editedNote.content}
            onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
            placeholder="Note content"
          />
          <div className="note-actions">
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="note-header">
            <h3>{note.title}</h3>
            <button 
              className={`pin-button ${note.isPinned ? 'pinned' : ''}`}
              onClick={() => onPin(note.id)}
            >
              <img src={PinIcon} alt="Pin" />
            </button>
          </div>
          <p>{note.content}</p>
          {note.summary && (
            <div className="note-summary">
              <MdAutoAwesome size={16} />
              <span>{note.summary}</span>
            </div>
          )}
          {note.categories?.length > 0 && (
            <div className="note-categories">
              {note.categories.map(category => (
                <span key={category} className="category-tag">
                  {category}
                </span>
              ))}
            </div>
          )}
          {note.tags?.length > 0 && (
            <div className="note-tags">
              {note.tags.map(tag => (
                <span key={tag} className="tag-chip">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="note-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(note.id)}>
              <img src={DeleteIcon} alt="Delete" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;