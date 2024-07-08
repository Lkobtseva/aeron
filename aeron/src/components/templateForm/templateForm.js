import React, { useState, useEffect } from "react";

const TemplateForm = ({ template, setTemplateText, setLocalTemplateText, localTemplateText, handleSave, loading }) => {

  useEffect(() => {
    if (template && template.template) {
      setLocalTemplateText(template.template);
      setTemplateText(template.template); 
    }
  }, [template, setTemplateText]);

  const handleChangeTemplate = (event) => {
    const newValue = event.target.value;
    setLocalTemplateText(newValue);
    setTemplateText(newValue); 
  };

  return (
    <div className="message-form">
      <p className="message-form_message">Template</p>
      <textarea
        className="message-form_text"
        value={localTemplateText}
        onChange={handleChangeTemplate}
        placeholder="Put the template here..."
      />
      <button style={{marginTop:"20px"}}className="template-page_button" onClick={handleSave} disabled={loading}>
        Save
      </button>
    </div>
  );
};

export default TemplateForm;