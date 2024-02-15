import React, { useState } from "react";


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
            const response = await fetch('http://localhost:8088/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            setTranslation(data.translation);
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