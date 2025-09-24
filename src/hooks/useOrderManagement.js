import { useState } from 'react';
import axios from 'axios';

export const useOrderManagement = () => {
  const [notes, setNotes] = useState(new Map());
  const [showNoteField, setShowNoteField] = useState(new Map());
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Get broker information
  const getAllInformationBroker = async (BrokerId) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Informatiom-From-Broker`,
        {
          BrokerID: BrokerId,
        },
        {
          withCredentials: true,
        }
      );

      setSelectedOrder(data);
      return data;
    } catch (error) {
      console.error('Error fetching broker information:', error); // eslint-disable-line no-console
      throw error;
    }
  };

  // Handle note changes
  const handleNoteChange = (id, value) => {
    setNotes((prevNotes) => {
      const newNotes = new Map(prevNotes);
      newNotes.set(id, value);
      return newNotes;
    });
  };

  // Toggle note field visibility
  const toggleNoteField = (id) => {
    setShowNoteField((prev) => {
      const newShowNoteField = new Map(prev);
      newShowNoteField.set(id, !newShowNoteField.get(id));
      return newShowNoteField;
    });
  };

  // Get note for specific ID
  const getNote = (id) => {
    return notes.get(id) || "";
  };

  // Check if note field is visible for specific ID
  const isNoteFieldVisible = (id) => {
    return showNoteField.get(id) || false;
  };

  // Clear all notes
  const clearNotes = () => {
    setNotes(new Map());
    setShowNoteField(new Map());
  };

  // Clear note for specific ID
  const clearNote = (id) => {
    setNotes((prevNotes) => {
      const newNotes = new Map(prevNotes);
      newNotes.delete(id);
      return newNotes;
    });
    setShowNoteField((prev) => {
      const newShowNoteField = new Map(prev);
      newShowNoteField.delete(id);
      return newShowNoteField;
    });
  };

  return {
    notes,
    showNoteField,
    selectedOrder,
    setSelectedOrder,
    getAllInformationBroker,
    handleNoteChange,
    toggleNoteField,
    getNote,
    isNoteFieldVisible,
    clearNotes,
    clearNote,
  };
}; 