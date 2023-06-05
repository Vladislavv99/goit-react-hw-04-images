import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { useState, useEffect } from "react";

export const App =()=> {
  const [search, setSearch] = useState('');

const handleSearch = (value)=>{
setSearch(value)
}

useEffect(()=>{
  setSearch('')
},[])
    return (
      <div className="App">
        <Searchbar handleSearch={handleSearch}/>
        <ImageGallery search={search}/>
      </div>
    );
  }

export default App;

