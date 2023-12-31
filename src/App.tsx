// imports
import React, { useState} from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import logo from './cinema projector.png';
import './App.css';

// main function

function App() {
  const [inputs, setInputs] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [myError, setError] = useState(null);
  const [textContent, setTextContent] = useState('');

  // function to generate and display text content
  const generateTextContent = () => {
    if (responseData) {
      const text = responseData.result.map((item) => {
        return `${item.title} - ${item.streamingInfo.gb.map((stream) => stream.service).join(', ')}\n`;
      }).join('\n');

      setTextContent(text);
    }
  };

  // 
  const saveTextContent = () => {
    if (textContent) {
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'movie_list.txt';
  
      document.body.appendChild(a);
      
      // Check if the element is attached to the DOM before trying to remove it
      if (document.body.contains(a)) {
        a.click();
        document.body.removeChild(a);
      }
    }
  };
  

  // function sets inputs to variables
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }
  // function to init preventDefault
  const handleSubmit = async (event) => {
    event.preventDefault();
  // api
  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/search/title',
    params: {
      title: inputs.movietitle,
      country:inputs.moviecountry,
      show_type: 'all',
      output_language: 'en'
    },
    headers: {
      'X-RapidAPI-Key': '40ca44c84bmsh145b9b00a4acff0p1bac6cjsne48e70272caf',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  };

    try {
      const response = await axios.request(options);
      setResponseData(response.data);
      setError(null);
    } catch (myError) {
      console.error(myError);
      alert("Error: Bad input \nPlease enter a valid movie title and counrty code");
      setError("An error occured");
    }
  }

  // what is displayed on screen
	return (
    
    <section
    style={{
      fontFamily: '-apple-system',
      fontSize: "1rem",
      fontWeight: 1.5,
      lineHeight: 1.5,
      color: "#fff",
      backgroundColor: "#1F2739",
      padding: "0 2em"
    }}
  >
    {/* some inline css */}
    <div
      style={{
        textAlign: "center",
        maxWidth: "950px",
        margin: "0 auto",
        border: "1px solid #e6e6e6",
        padding: "45px 25px 50px 25px",
        marginTop: "50px"
      }}
    >
      <img
        src={logo}
        alt=""
        style={{
          margin: "-90px auto 30px",
          width: "100px",
          objectFit: "cover",
          marginBottom: "0"
        }}
      />
      <div>
        <p
          style={{
            lineHeight: 1.5,
            fontWeight: 300,
            marginBottom: "25px",
            fontSize: "1.375rem",
            color: "#FFF842",
          }}
        >
        {/* text on screen */}
          Your one stop search for movies to watch.
        </p>
      </div>
      <p
        style={{
          marginBottom: "0",
          fontWeight: 600,
          fontSize: "1rem",
          color: "#FB667A",
        }}
      >
        Made By
        <span style={{ fontWeight: 400 }}> · Sanju Ghandhi</span>
      </p>
    </div>
    {/* input fields as a form */}
    <form onSubmit={handleSubmit}>
      <br></br>
      <label>Enter the movie title: 
        <input type="text" 
        name = "movietitle"
        value={inputs.movietitle || ""} 
        onChange={handleChange}
        />
      </label>
      <br></br>
      <label>Enter the two letter country code (e.g gb): 
        <input type="text"name = "moviecountry"
        value={inputs.moviecountry || ""} 
        onChange={handleChange}
        />
      </label>
      <br></br>
      {/* creates submit button */}
      <input type="submit" />
    </form>

    <button onClick={generateTextContent}>Generate Text Content</button>
    <h2>Generated Text Content:</h2>
    <pre>{textContent}</pre>
    {/* Add a button to allow users to save the text content */}
    <button onClick={saveTextContent}>Save Text Content</button>

    {/* Display the API response */}
    {responseData && (
  <div>
    <h2>Available Media:</h2>
    {/* creates table to format the api response in a neat manner */}
    <table className="container">
      <thead>
        <tr>
          <th><h1>Type</h1></th>
          <th><h1>Title</h1></th>
          <th><h1>Service</h1></th>
          <th><h1>Streaming</h1></th>
          <th><h1>Quality</h1></th>
          <th><h1>Audio languages</h1></th>
          <th><h1>Subtitles</h1></th>
          <th><h1>Price</h1></th>
        </tr>
      </thead>
      <tbody>
        {/* used mapping function to to display similar objects of a component */}
        {responseData.result.map((item, index) => (
          <React.Fragment key={index}>
            {item.streamingInfo.gb ? (
              item.streamingInfo.gb.map((stream, streamIndex) => (
                <tr key={streamIndex}>
                  <td>{item.type}</td>
                  <td>{item.title}</td>
                  <td>{stream.service}</td>
                  <td>{stream.streamingType}</td>
                  <td>{stream.quality}</td>
                  <td>{stream.audios.map((audio) => audio.language).join(', ')}</td>
                  <td>{stream.subtitles.map((subtitle) => subtitle.locale.language).join(', ')}</td>
                  <td>{stream.price ? stream.price.formatted : 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>{item.type}</td>
                <td>{item.title}</td>
                <td colSpan="6">No streaming info available</td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
  
  )}

    </section>
	);
}

export default App;