import { useState, useRef } from 'react';
import axios from 'axios';

export default function NewPost() {
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
  const [teamLeaderPhone, setTeamLeaderPhone] = useState('');
  const [file, setFile] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  const displaySubmissionMessage = () => {
    setSubmissionMessage('Your Submission was Successful');
    setTeamName('');
    setTeamLeaderName('');
    setTeamLeaderEmail('');
    setTeamLeaderPhone('');
    setFile('');
    setIsLoading(false);
  };

  const validateAndSubmit = async () => {
    const errors = [];

    if (teamName.length < 3 || !/^[a-zA-Z\s]{3,}$/.test(teamName)) {
      errors.push('Team Name should be at least 3 characters long and can contain only letters and spaces.');
    }

    if (teamLeaderName.length < 3 || !/^[a-zA-Z\s]{3,}$/.test(teamLeaderName)) {
      errors.push('Team Leader Name should be at least 3 characters long and can contain only letters and spaces.');
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(teamLeaderEmail)) {
      errors.push('Team Leader Email is not in a valid format.');
    }

    if (!/^\d{10}$/.test(teamLeaderPhone)) {
      errors.push('Team Leader Phone Number should be a 10-digit number.');
    }

    if (!file || !file.type.startsWith('image/')) {
      errors.push('Please select an image file.');
    }

    if (errors.length > 0) {
      alert('Invalid input. Please check your entries:\n\n' + errors.join('\n'));
      return;
    }

    setIsLoading(true);

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

      displaySubmissionMessage();
    } catch (error) {
      console.error('Error submitting the form', error);
      setIsLoading(false);
    }
  };

  const fileSelected = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const maxSize = 10 * 1024 * 1024; // 10 MB
      console.log("Selected file size:", selectedFile.size, "Max size:", maxSize); // Debugging line

      if (selectedFile.size <= maxSize) {
        setFile(selectedFile);
      } else {
        alert('Selected file is too large. Please choose a file smaller than 10 MB.');
        fileInputRef.current.value = '';
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
            ref={fileInputRef}
            onChange={fileSelected}
            type="file"
            accept="image/*"
            id="fileInput"
            required
          />
          <div className="centered-btn">
            <button
              type="button"
              className="btn-primary"
              onClick={isLoading ? null : validateAndSubmit}
              disabled={isLoading} // Disable the button when loading
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </div>
          {submissionMessage && (
            <p style={{ textAlign: 'center', color: '#505e6c', fontWeight: 'bold' }}>
              {submissionMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}