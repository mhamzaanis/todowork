import { ArrowLeftIcon } from 'lucide-react';
import { useState} from 'react'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
// import axios from 'axios';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    setLoading(true);
    try{
      await api.post("/notes", {title, content});
      toast.success("Note created successfully");
      navigate("/");
    }catch(error){
      console.error("Error creating note:", error);
      toast.error("Error creating note");
      navigate("/");
    } finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
  <div className="w-full max-w-2xl">
    <Link to="/" className="btn btn-ghost mb-6 flex items-center gap-2">
      <ArrowLeftIcon className="size-5" />
      Go back
    </Link>

    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">Create New Note</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Content */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Content</span>
            </label>
            <textarea
              placeholder="Write your note content here..."
              className="textarea textarea-bordered w-full h-40 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default CreatePage
