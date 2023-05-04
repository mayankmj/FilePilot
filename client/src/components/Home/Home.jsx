import { useRef, useState,useEffect} from 'react'
import image from './Images/cover_image.png'
import './Home.css'
import { uploadFile } from '../../services/api'

const Home = () =>{

  const[file,setFile]= useState('')
  // console.log(file);
  const[result,setResult] = useState('');
    const fileInputRef = useRef();

    const onUploadClick = () =>{
        fileInputRef.current.click()
    }

    useEffect(() =>{
      const getImage = async () =>{
        if(file){
          const data = new FormData();
          data.append("name",file.name);
          data.append("file",file);

         let response = await uploadFile(data);
         setResult(response.path);
        }
      }
      getImage();
    },[file])
    return(
    <div >
    <div className="home-container">
      <img src={image} alt="my_image" className="home-image"/>
      <div className="home-main-container">
        <h1>Simple File Sharing</h1>
        <p>Upload and share the download Link</p>
        <button onClick={() => onUploadClick()}>Upload</button>
        <input type="file" ref={fileInputRef} className='home_file_type' 
        onChange={(e) => setFile(e.target.files[0])}

        />

        <a href={result} target='_blank'>{result}</a>
      </div>
      </div>
    </div>
    )
}

export default Home