import { Link } from "react-router-dom";

export default function NotesNotFound() {
  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold">No Notes Found</h2>
      <Link to="/create" className="btn btn-primary mt-4">
        Create a New Note
      </Link>
    </div>
  );
}
