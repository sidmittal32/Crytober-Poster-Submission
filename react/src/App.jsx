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

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('teamName', teamName);
    formData.append('teamLeaderName', teamLeaderName);
    formData.append('teamLeaderEmail', teamLeaderEmail);
    formData.append('teamLeaderPhone', teamLeaderPhone);
    formData.append('image', file);

    
    await axios.post('/api/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    navigate('/');

    window.location.reload();
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="register-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form onSubmit={submit}>
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
            />
          </div>
          <div className="form-group">
            <input
              value={teamLeaderName}
              onChange={(e) => setTeamLeaderName(e.target.value)}
              type="text"
              placeholder="Team Leader Name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              value={teamLeaderEmail}
              onChange={(e) => setTeamLeaderEmail(e.target.value)}
              type="email"
              placeholder="Team Leader Email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              value={teamLeaderPhone}
              onChange={(e) => setTeamLeaderPhone(e.target.value)}
              type="tel"
              placeholder="Team Leader Phone Number"
              className="form-control"
            />
          </div>
          <input onChange={fileSelected} type="file" accept="image/*" />
          <div className="centered-btn">
            <button type="submit" className="btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
