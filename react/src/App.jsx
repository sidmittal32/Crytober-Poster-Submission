import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function NewPost() {
  const [teamName, setTeamName] = useState("")
  const [teamLeaderName, setTeamLeaderName] = useState("")
  const [teamLeaderEmail, setTeamLeaderEmail] = useState("")
  const [teamLeaderPhone, setTeamLeaderPhone] = useState("")
  const [file, setFile] = useState()

  const navigate = useNavigate()

  const submit = async event => {
    event.preventDefault()

    const formData = new FormData();
    formData.append("teamName", teamName)
    formData.append("teamLeaderName", teamLeaderName)
    formData.append("teamLeaderEmail", teamLeaderEmail)
    formData.append("teamLeaderPhone", teamLeaderPhone)
    formData.append("image", file)
    await axios.post("/api/posts", formData, { headers: { 'Content-Type': 'multipart/form-data' } })

    navigate("/")
  }

  const fileSelected = event => {
    const file = event.target.files[0]
    setFile(file)
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={submit} className="w-96 space-y-4 px-6 py-4 bg-white border border-gray-300 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl text-green-600 mb-4">Cryptober Poster Submission</h2>
        <input
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          type="text"
          placeholder="Team Name"
          className="border p-2 rounded w-full"
        />
        <input
          value={teamLeaderName}
          onChange={(e) => setTeamLeaderName(e.target.value)}
          type="text"
          placeholder="Team Leader Name"
          className="border p-2 rounded w-full"
        />
        <input
          value={teamLeaderEmail}
          onChange={(e) => setTeamLeaderEmail(e.target.value)}
          type="email"
          placeholder="Team Leader Email"
          className="border p-2 rounded w-full"
        />
        <input
          value={teamLeaderPhone}
          onChange={(e) => setTeamLeaderPhone(e.target.value)}
          type="tel"
          placeholder="Team Leader Phone Number"
          className="border p-2 rounded w-full"
        />
        <input
          onChange={fileSelected}
          type="file"
          accept="image/*"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded w-full cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
