import { useCallback, useState, useEffect } from 'react';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);

 
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*()_+-={}[]|:;\'<>,.?/';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

 
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="w-full max-w-lg shadow-lg rounded-lg px-6 py-5 bg-gray-700 text-orange-500">
        <h1 className="text-white text-center text-2xl font-bold mb-4">
          Password Generator
        </h1>


        <div className="flex items-center shadow-lg rounded-lg overflow-hidden mb-4 bg-white">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-4 text-black outline-none"
            placeholder="Generated Password"
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-r-md"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-3 text-white">
      
          <div className="flex items-center gap-x-3">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="text-lg">Length: {length}</label>
          </div>

      
      <div className="flex gap-x-4">
        <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
           checked={numberAllowed}
            id="numberInput"
          onChange={() => setNumberAllowed((prev) => !prev)}
        />
          <label htmlFor="numberInput">Include Numbers</label>
      </div>

    <div className="flex items-center gap-x-2">
      <input
        type="checkbox"
        checked={characterAllowed}
        id="characterInput"
        onChange={() => setCharacterAllowed((prev) => !prev)}
      />
          <label htmlFor="characterInput">Include Special Characters</label>
        </div>
      </div>
    </div>
  </div>
</div>
);
}

export default App;
