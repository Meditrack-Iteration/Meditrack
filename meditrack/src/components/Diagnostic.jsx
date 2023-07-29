import React from 'react';
import Navbar from './Navbar'
const Diagnostic = (symptoms) => {
  async function runPrompt() {
    const prompt = `I am not feeling very well. My symptoms are ${symptoms}. Can you provide 1-3 possible conditions as well as 1-3 medications for me to consider to address my concerns? Please provide specific medication names (i.e. Asprin, Aleve-D, Flonase, etc...)`;

    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 2048,
        temperature: 0.1
      })
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      console.log(data.choices[0].text);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
              <Navbar/>

    <div className="diagnostic-container" style={{ marginTop: "20px", maxWidth: "650px", margin: "0 auto", lineHeight: "2rem" }}>

      <h3 className="dse-title" style={{margin: "60px 0"}}>Diagnostic Suggestion Engine</h3>
      <p className="dse-para" style={{ textAlign: "center" }}>
        To use the Diagnostic Suggestion Engine, please describe your symptoms below. The DSE will then determine 1-3 possible ailments that you may be suffering from, as well as 1-3 medications for you to consider taking in order to best address your concerns.
      </p>
      <p className="dse-para" style={{ textAlign: "center" }}>
        It's best to consult with a healthcare professional or registered dietitian who can provide personalized recommendations based on your individual needs and health status.
      </p>
  
      <div className="form-container">
        <form className="form-input" onSubmit={e => {
          e.preventDefault();
          runPrompt();
        }}>
          <input type="text" placeholder='Symptoms'></input>
          <input type="submit"></input>
        </form>
      </div>
    </div>
    </>
  );
  
};

export default Diagnostic;
