import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
  const [teamLeaderPhone, setTeamLeaderPhone] = useState('');
  const [file, setFile] = useState('');

  const navigate = useNavigate();

  const validateAndSubmit = async () => {
    if (
      teamName.length < 3 ||
      !/^[a-zA-Z]+$/.test(teamName) ||
      teamLeaderName.length < 3 ||
      !/^[a-zA-Z]+$/.test(teamLeaderName) ||
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(teamLeaderEmail) ||
      !/^\d{10}$/.test(teamLeaderPhone) ||
      !file.type.startsWith('image/')
    ) {
      alert('Invalid input. Please check your entries.');
      return;
    }

    const formData = new FormData();
    formData.append('teamName', teamName);
    formData.append('teamLeaderName', teamLeaderName);
    formData.append('teamLeaderEmail', teamLeaderEmail);
    formData.append('teamLeaderPhone', teamLeaderPhone);
    formData.append('image', file);

    try {
      await axios.post('/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/submitsuccess');
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  const fileSelected = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (selectedFile.size <= maxSize) {
        setFile(selectedFile);
      } else {
        alert('Selected file is too large. Please choose a file smaller than 10 MB.');
        event.target.value = null;
      }
    }
  };

  return (
    <div className="register-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form>
          <h2 className="text-center">
            <strong>Submit</strong> your poster.
          </h2>
          <div className="form-group">
            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              type="text"
              placeholder="Team Name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              value={teamLeaderName}
              onChange={(e) => setTeamLeaderName(e.target.value)}
              type="text"
              placeholder="Team Leader Name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              value={teamLeaderEmail}
              onChange={(e) => setTeamLeaderEmail(e.target.value)}
              type="email"
              placeholder="Team Leader Email"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              value={teamLeaderPhone}
              onChange={(e) => setTeamLeaderPhone(e.target.value)}
              type="tel"
              placeholder="Team Leader Phone Number"
              className="form-control"
              required
            />
          </div>
          <input
            onChange={fileSelected}
            type="file"
            accept="image/*"
            required
          />
          <div className="centered-btn">
            <button
              type="button"
              className="btn-primary"
              onClick={validateAndSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
