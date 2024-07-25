import React, { useState } from 'react';
import Swal from 'sweetalert2'
const Page = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [phon, setphon] = useState('');
  const [Search, preload] = useState('search')

  const fetchDefinition = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      setDefinition(data[0].meanings[0].definitions[0].definition);
      setAudioUrl(data[0].phonetics[0]?.audio || '');
      setphon(data[0].phonetic)
      preload("search")
    } catch (error) {
      console.error("Error fetching the definition", error);
    }
  };
  const pre = () => {
    if (!word){
      Swal.fire({
        title: 'Info',
        text: 'Input a word',
        icon: 'info',
        confirmButtonText: 'ok'
      })      
    }
    else{
      preload("pls wait..")
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-[100vh] w-[100%] gap-[40px] font-sans bg-black'>
      <h1 className='font-bold text-2xl text-white'>FTECH Dictionary</h1>
      <div className='flex flex-col items-center justify-center bg-teal-600 p-[20px] gap-[20px] rounded-md'>
      <form onSubmit={fetchDefinition} className='flex items-center gap-[30px]'>
        <input
        className='p-[10px] bg-transparent border-b-2 border-white text-white outline-none w-[20vw] max-sm:w-[auto]'
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
        />
        <button onClick={pre} className='bg-white p-[10px] rounded-md w-[10vw] max-sm:w-[auto]'>{Search}</button>
      </form>
      {definition && (
        <div className='flex flex-col items-start justify-center'>
          <h1 className='font-bold text-white text-lg'>{phon}</h1>
          <h2>Definition:</h2>
          <p className='w-[30vw] max-sm:w-[40vw]'>{definition}</p>
        </div>
      )}
      {audioUrl && (
        <div  className='flex flex-col items-center gap-1'>
          <h2>Pronunciation:</h2>
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      </div>
    </div>
  );
};

export default Page;
