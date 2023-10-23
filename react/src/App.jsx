import { useState } from 'react';
import axios from 'axios';

export default function NewPost() {
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
  const [teamLeaderPhone, setTeamLeaderPhone] = useState('');
  const [file, setFile] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displaySubmissionMessage = () => {
    setSubmissionMessage('Your Submission was Successful');
    setTeamName('');
    setTeamLeaderName('');
    setTeamLeaderEmail('');
    setTeamLeaderPhone('');
    setFile(null);
  };

  const validateAndSubmit = async () => {
    if (isSubmitting) {
      return; // If already submitting, do nothing
    }

    setIsSubmitting(true);

    const errors = [];

    // Validation logic...

    if (errors.length > 0) {
      alert('Invalid input. Please check your entries:\n\n' + errors.join('\n'));
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    // Form data append logic...

    try {
      await axios.post('/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      displaySubmissionMessage();
    } catch (error) {
      console.error('Error submitting the form', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fileSelected = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (selectedFile.size <= maxSize) {
        setFile(selectedFile);
      } else {
        alert('Selected file is too large. Please choose a file smaller than 10 MB.');
        document.getElementById('fileInput').value = '';
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
            id="fileInput"
            required
          />
          <div className="centered-btn">
            {isSubmitting ? (
              <div className="loading-spinner"></div>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={validateAndSubmit}
                disabled={isSubmitting}
              >
                Submit
              </button>
            )}
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