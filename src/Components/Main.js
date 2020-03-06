import React, { useState, useEffect } from "react";
import { Meme } from "./Meme";
import '../App.css';

const objectToQueryParam = obj => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

function Main() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [textCima, settextCima] = useState("");
  const [textBaixo, setTextBaixo] = useState("");
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x =>
      x.json().then(response => setTemplates(response.data.memes))
    );
  }, []);

  if (meme) {
    return (
      <div className='DanAlign'>
        <img className='DanImage' src={meme} alt="custom meme" />
      </div>
    );
  }

  return (
    <div className='DanAlign'>
      {template && (          
        <form
          onSubmit={async e => {
            e.preventDefault();
            // logica de criação da API
            const params = {
              template_id: template.id,
              text0: textCima,
              text1: textBaixo,
              username: "xzk03017",
              password: "xzk03017@cndps.com"
            };
            const response = await fetch(
              `https://api.imgflip.com/caption_image${objectToQueryParam(
                params
              )}`
            );
            const json = await response.json();
            setMeme(json.data.url);
          }}
        >
            <div className='DanForm'>
                <Meme template={template} />
                <h1 className='DanH2'>Digite seu meme</h1>
                <input
                    id='input1'
                    className='DanInput'
                    placeholder="Texto de Cima"
                    value={textCima}
                    onChange={e => settextCima(e.target.value)}
                />
                <input
                    className='DanInput'
                    placeholder="Texto de baixo"
                    value={textBaixo}
                    onChange={e => setTextBaixo(e.target.value)}
                />
                <button className='DanBtn' type="submit">Criar Meme</button>  
            </div>
        </form>
      )}
      {!template && (
        <>
          <h1 className='DanH1'>Escolha um Template de meme!</h1>
          {templates.map(template => {
            return (
              <Meme
                template={template}
                onClick={() => {
                  setTemplate(template);
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default Main;