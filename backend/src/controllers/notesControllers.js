import Note from '../models/Note.js';

export async function getAllNotes (_, res) {
  try{
    const notes = await Note.find().sort({createdAt: -1}); //sort by createdAt in descending order, show the newest notes first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({message: "Error fetching notes", error: error.message});
  }
}
export async function getNoteById (req, res) {
  try{
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({message: "Error fetching note", error: error.message});
  }
}

export async function createNote (req, res) {
  try {
    const {title, content} = req.body;
    const newNote = new Note({title: title, content: content});
    await newNote.save();
    res.status(201).json({message: "Note created successfully!", note: newNote.title});
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({message: "Error creating note", error: error.message});
  }
}
export async function updateNote (req, res) {
  try {
    const {title, content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
    if (!updatedNote) {
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json({message: "Note updated successfully!", note: updatedNote});
  } catch(error){
    console.error("Error updating note:", error);
    res.status(500).json({message: "Error updating note ", error: error.message});
    
  }
}
export async function deleteNote (req, res) {
  try{
    const delNode = await Note.findByIdAndDelete(req.params.id);
    if (!delNode) {
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json({message: `Note with title "${delNode.title}" deleted successfully!`});
  } catch (error){
    console.error("Error deleting note:", error);
    res.status(500).json({message: "Error deleting note", error: error.message});
  }
}