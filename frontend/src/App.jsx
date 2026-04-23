import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', course: '' });

  const fetchStudents = () => {
    axios.get("http://localhost:8080/api/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error("Error fetching data", err));
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.name || !form.email) return alert("Please fill basic details!");
    
    axios.post("http://localhost:8080/api/students", form)
      .then(() => {
        fetchStudents();
        setForm({ name: '', email: '', course: '' });
      });
  };

  // Inline Styles for better UI without external CSS
  const styles = {
    container: { maxWidth: '900px', margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f7f6', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' },
    header: { textAlign: 'center', color: '#333', marginBottom: '30px' },
    formCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
    input: { padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', flex: '1', minWidth: '200px' },
    button: { padding: '12px 24px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' },
    table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' },
    th: { backgroundColor: '#4CAF50', color: 'white', padding: '15px', textAlign: 'left' },
    td: { padding: '12px 15px', borderBottom: '1px solid #eee', color: '#555' }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🎓 Student Management System</h2>
      
      {/* Input Section */}
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <input style={styles.input} placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input style={styles.input} placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input style={styles.input} placeholder="Course" value={form.course} onChange={e => setForm({...form, course: e.target.value})} />
        <button type="submit" style={styles.button} onMouseOver={e => e.target.style.backgroundColor = '#45a049'} onMouseOut={e => e.target.style.backgroundColor = '#4CAF50'}>
          Add Student
        </button>
      </form>

      {/* Table Section */}
      <div style={{overflowX: 'auto'}}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Course</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s, index) => (
                <tr key={s.id} style={{backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa'}}>
                  <td style={styles.td}>#{s.id}</td>
                  <td style={styles.td}><strong>{s.name}</strong></td>
                  <td style={styles.td}>{s.email}</td>
                  <td style={styles.td}><span style={{padding: '4px 10px', backgroundColor: '#e8f5e9', borderRadius: '15px', fontSize: '12px'}}>{s.course}</span></td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" style={{...styles.td, textAlign: 'center'}}>No students found. Add your first student!</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;