import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/utils';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const NoteCard = ({ note, setNotes }) => {
    const handleDelete = async (e, noteId) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this note?")) {
            return;
        }
        try {
            await api.delete(`/notes/${noteId}`);
            toast.success("Note deleted successfully");
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
        } catch (error) {
            console.error("Error deleting note:", error);
            toast.error("Error deleting note");
        }
    };
  return (
    <Link 
      to={`/notes/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="p-4">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">
        {note.content}
        </p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-1">
            <button className="btn btn-ghost btn-xs text-primary">
              <PenSquareIcon className="size-4" />
            </button>
            <button className="btn btn-ghost btn-xs text-error" onClick={(e)=> handleDelete(e,note._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
