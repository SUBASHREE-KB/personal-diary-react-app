import { useState, useEffect } from 'react';
import './Diary.css';

function Diary() {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [mood, setMood] = useState('happy');
  
  // Load entries on component mount
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    setEntries(savedEntries);
  }, []);

  // Save entries to localStorage when they change
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const addNote = () => {
    if (date && note) {
      const newEntries = [...entries, { date, note, mood }];
      setEntries(newEntries);
      setDate('');
      setNote('');
      setMood('happy');
    }
  };

  const editEntry = (index) => {
    const entry = entries[index];
    setDate(entry.date);
    setNote(entry.note);
    setMood(entry.mood || 'happy');
    deleteEntry(index);
  };

  const deleteEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  // Get mood icon and color based on mood value
  const getMoodInfo = (moodValue) => {
    const moodMap = {
      happy: { icon: 'bi-emoji-smile-fill', color: '#4caf50' },
      sad: { icon: 'bi-emoji-frown-fill', color: '#2196f3' },
      angry: { icon: 'bi-emoji-angry-fill', color: '#f44336' },
      calm: { icon: 'bi-emoji-neutral-fill', color: '#9c27b0' },
      excited: { icon: 'bi-emoji-laughing-fill', color: '#ff9800' },
      proud: { icon: 'bi-award-fill', color: '#8e44ad' },
      glad: { icon: 'bi-emoji-heart-eyes-fill', color: '#e74c3c' },
      stressed: { icon: 'bi-exclamation-triangle-fill', color: '#f39c12' },
      anxious: { icon: 'bi-emoji-dizzy-fill', color: '#3498db' }
    };
    return moodMap[moodValue] || moodMap.happy;
  };

  return (
    <div className="container py-5">
      {/* Main Card Section */}
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 rounded-3 shadow">
            <div className="card-header text-white text-center py-3">
              <h2 className="mb-0">Personal Diary</h2>
            </div>
            <div className="card-body p-4">
              <div className="mb-4">
                <label htmlFor="date" className="form-label fw-bold">Select Date:</label>
                <input 
                  type="date" 
                  id="date" 
                  className="form-control form-control-lg shadow-sm" 
                  value={date} 
                  onChange={e => setDate(e.target.value)} 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="mood" className="form-label fw-bold">How are you feeling?</label>
                <select 
                  id="mood" 
                  className="form-select form-select-lg shadow-sm" 
                  value={mood} 
                  onChange={e => setMood(e.target.value)}
                >
                  <option value="happy">Happy <i className="bi bi-emoji-smile-fill"></i></option>
                  <option value="sad">Sad <i className="bi bi-emoji-frown-fill"></i></option>
                  <option value="angry">Angry <i className="bi bi-emoji-angry-fill"></i></option>
                  <option value="calm">Calm <i className="bi bi-emoji-neutral-fill"></i></option>
                  <option value="excited">Excited <i className="bi bi-emoji-laughing-fill"></i></option>
                  <option value="proud">Proud <i className="bi bi-award-fill"></i></option>
                  <option value="glad">Glad <i className="bi bi-emoji-heart-eyes-fill"></i></option>
                  <option value="stressed">Stressed <i className="bi bi-exclamation-triangle-fill"></i></option>
                  <option value="anxious">Anxious <i className="bi bi-emoji-dizzy-fill"></i></option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="note" className="form-label fw-bold">Your Note:</label>
                <textarea 
                  id="note" 
                  className="form-control form-control-lg shadow-sm" 
                  rows="1" 
                  placeholder="Write your journal for the day..." 
                  value={note} 
                  onChange={e => setNote(e.target.value)} 
                />
              </div>
              
              <button 
                className="btn btn-primary w-100 py-3 fw-bold shadow-sm" 
                onClick={addNote}
              >
                <i className="bi bi-journal-plus me-2"></i>Save Entry
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Previous Entries Section */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 rounded-3 shadow">
            <div className="card-header text-white py-3">
              <h4 className="mb-0"><i className="bi bi-calendar-check me-2"></i>Previous Entries</h4>
            </div>
            <div className="card-body p-0">
              {entries.length > 0 ? (
                <div className="list-group list-group-flush">
                  {entries.map((entry, i) => {
                    const moodInfo = getMoodInfo(entry.mood || 'happy');
                    return (
                      <div key={i} className="entry-item" data-mood={entry.mood || 'happy'}>
                        <div className="entry-header" onClick={() => document.getElementById(`collapse${i}`).classList.toggle('show')}>
                          <span className="fw-bold text-primary">
                            {new Date(entry.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className="mood-indicator" style={{ backgroundColor: moodInfo.color }}>
                            <i className={`bi ${moodInfo.icon}`}></i>
                          </span>
                        </div>
                        <div id={`collapse${i}`} className="entry-content">
                          <div>{entry.note}</div>
                          <div className="entry-actions">
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => editEntry(i)}>
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteEntry(i)}>
                              <i className="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center p-5 text-muted">
                  <i className="bi bi-journal-x fs-1"></i>
                  <p className="mt-3">No entries yet. Start writing your first journal entry!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diary;