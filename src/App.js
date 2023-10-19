
import {useState} from "react"

const App = () =>{
  const [images, setImages] = useState(null)
  const [value,setValue] = useState(null)
  const [error,setError] = useState(null)
  const surpriseOptions = [
    'A blue ostrich eating melon',
    'A matisse style shark on the telephone',
    'A pineapple sunbathing on an island'
  ]
  const surpriseMe = ()=>{
    setImages(null)
    const randomValue = surpriseOptions[Math.floor(Math.random()*surpriseOptions.length)]
    setValue(randomValue)
  }
  const getImages = async() =>{
    setImages(null)
    if(value === null){
      setError('Error! Must have a search term')
      return
    }
    try {
        const options = {
          //convert javascript object to json string
            method:'POST',
              body:JSON.stringify({
                message: value
            }),
            //tell this that we are working with json
            headers:{
              "Content-type" :"application/json"
            }
        }
        const response = await fetch('http://localhost:8000/images', options)
        const data = await response.json()
        console.log(data)
        setImages(data)
    } catch (error) {
        console.error(error)
    }
  }
  console.log(value)
  return (
    <div className="app">
      <section className="search-section">
        <h1>AI Image Generator</h1>
        <p>Type in a text prompt, then press 'Generate' to generate images.</p>
        {error && <p>{error}</p>}
      </section>
        <div className="input-container">
          <input 
            value = {value}
            placeholder = " An impressionist oil painting of a sunflower in a purple vase..."
            onChange = {e=>setValue(e.target.value)}
          />
          <button onClick = {getImages}>Generate</button>
        </div>
        <div></div>
      <section className="image-section">
        {images?.map((image,_index) => (
          <img key = {_index} src ={image.url} alt = {'Generated image of ${value}'}/>
        ))}
      </section>
    </div>
  );
}

export default App;
