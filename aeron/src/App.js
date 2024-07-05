import logo from './logo.svg';
import './App.css';

function App() {
  const sendMessage = () => {
    fetch('http://localhost:5000/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message_id: 1,
        message: 'Hello, world!',
        result: 'Success',
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="App">
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;