import React, { useState, useEffect } from "react";
import MessageForm from "../messageForm/messageForm";
import OutputBox from "../outputBox/outputBox";
import TemplateForm from "../templateForm/templateForm";
import useUpdateTemplate from '../../hooks/useUpdateTemplate';
import useParseRequest from "../../hooks/useParseRequest";

const TemplateBox = ({ template }) => {
  const [templateText, setTemplateText] = useState(template.template);
  const [localTemplateText, setLocalTemplateText] = useState("");
  const { updateTemplate, loading, error } = useUpdateTemplate(template, localTemplateText);
  const { sendRequest, data } = useParseRequest();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (template) {
      setTemplateText(template.template);
    }
  }, [template]);

  const handleSave = async () => {
    try {
      await updateTemplate(template.template_id, templateText);
      console.log(templateText);
    } catch (error) {
      console.error('Error updating template:', error);
    }
  };

  const handleApply = () => {
    const requestBody = {
      template_id: template.template_id, // Исправлено
      template_name: template.template_name, // Исправлено
      template: templateText,
      message: message,
    };
    sendRequest(requestBody); // Добавлено
  };

  return (
    <div className="template-page">
      <div className="template-page_block">
        <p className="template-page_p">{template.template_name}</p>
      </div>
      <div className="template-box">
        <TemplateForm 
          localTemplateText={localTemplateText} 
          setLocalTemplateText={setLocalTemplateText} 
          template={template} 
          setTemplateText={setTemplateText} 
          handleSave={handleSave} 
          loading={loading}
        />
        <MessageForm template={template} message={message} setMessage={setMessage} />
        <OutputBox template={template} onApply={handleApply} data={data} />
      </div>
    </div>
  );
};

export default TemplateBox;