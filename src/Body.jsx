import React, { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

export default function Body() {
    const [formData, setFormData] = useState({
        text: '',
        language: ''
    })
    const [translation,setTranslation] = useState('')

    async function translate(e)  {
        e.preventDefault()
        console.log(formData)
        try{
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    "role": "system",
                    "content": "you are a helpful translator"
                  },
                  {
                    "role": "user",
                    "content": `translate to ${formData.language} the phrase '${formData.text}'`
                  }
                ],
            });
            console.log(response.choices[0].message.content)
            setTranslation(response.choices[0].message.content)
        }catch(error){console.log(error)}
    }

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]:  value
            }
        })
        console.log(formData)
    }

    return (
        <div className="body">
            <h3>Text to translate</h3>
            <form className="form" on>
                <textarea placeholder="Type your text here..." 
                name="text"
                onChange={handleChange}
                />
                <label>Select language</label>
                <div className="radio">
                    <input type="radio"
                        id="Arabic"
                        name="language"
                        value="Arabic"
                        checked={formData.language === "Arabic"}
                        onChange={handleChange}
                    />
                    <label for="Arabic">Arabic</label>
                </div>
                <div className="radio">
                    <input type="radio"
                        id="Spanish"
                        name="language"
                        value="Spanish"
                        checked={formData.language === "Spanish"}
                        onChange={handleChange}
                    />
                    <label for="Spanish">Spanish</label>
                </div>
                <div className="radio">
                    <input type="radio"
                        id="French"
                        name="language"
                        value="French"
                        checked={formData.language === "French"}
                        onChange={handleChange} />
                    <label for="French">French</label>
                </div>
                <button type="submit" onClick={translate}>Translate</button>
             <textarea value={translation ? translation : 'please provide a phrase to translate.'} readOnly className="margin"/>
            </form>
        </div>
    )
}