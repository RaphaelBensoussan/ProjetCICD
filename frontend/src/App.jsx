import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [nouveauMessage, setNouveauMessage] = useState('')

  // Récupérer les messages depuis l'API Flask
  const chargerMessages = async () => {
    try {
      const res = await fetch('http://back.local/messages')
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      } else {
        console.error("Erreur lors de la récupération des messages")
      }
    } catch (e) {
      console.error(e)
    }
  }

  // Envoyer un message à l'API Flask
  const ajouterMessage = async () => {
    if (!nouveauMessage) return;
    try {
      await fetch('http://back.local/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texte: nouveauMessage })
      })
      setNouveauMessage('')
      chargerMessages()
    } catch (e) {
      console.error(e)
    }
  }

  // Charger au démarrage
  useEffect(() => {
    chargerMessages()
  }, [])

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ color: '#333' }}>Mes Messages</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          value={nouveauMessage}
          onChange={(e) => setNouveauMessage(e.target.value)}
          placeholder="Écrire un message..."
          style={{ flex: 1, padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          onKeyDown={(e) => e.key === 'Enter' && ajouterMessage()}
        />
        <button
          onClick={ajouterMessage}
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Envoyer
        </button>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {messages.map((msg, index) => (
          <li key={msg.id || index} style={{ padding: '10px', borderBottom: '1px solid #eee', color: '#555' }}>
            {msg.texte}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
