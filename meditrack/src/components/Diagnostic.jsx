import React from 'react';

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
    <div style={{marginTop: "20px"}}>
      Diagnostic
      <br />
      <input style={{marginTop: "20px", marginRight: "10px" }}type="text" placeholder='symptoms'></input>
      <button onClick={runPrompt}>Click Here to Run Prompt</button>

    </div>
  );
};

export default Diagnostic;
