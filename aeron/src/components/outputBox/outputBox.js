import React from 'react';

const OutputBox = ({ onApply, loading, error, data }) => {
  return (
    <div className="message-form">
      <p className="message-form_message">Output</p>
      <textarea className="message-form_text" />
      <button className="output-page_button" style={{ marginTop: "20px" }} onClick={onApply} disabled={loading}>
        Apply
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default OutputBox;