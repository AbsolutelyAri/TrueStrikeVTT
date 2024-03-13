import {useState} from 'react';
function App() {
  const [backgroundImage, setBackgroundImage] = useState('');


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBackgroundImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
}

export default App;
