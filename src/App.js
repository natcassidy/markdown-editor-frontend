import './App.css'
import Documents from './Components/Documents'
import FullEditor from './Components/FullEditor'
import Authentication from './Components/Authentication';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  

  return (
    <Router>
      <div className="w-screen h-screen flex flex-col">
        
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/editor" element={<FullEditor />} />
          <Route path="/editor/:id" element={<FullEditor />} />
          <Route path="/documents" element={<Documents />} />
        </Routes>
      
      </div>
    </Router>
  );
}

export default App;

//exact match regex using string litarals based on the user's input


  // const convertMarkdown = () => {
  //   let lines = markdown.split('\n')
  //   let updatedLines = []

  //   const createRegex = (beginning) => {
  //     return new RegExp("^" + beginning + "[\w\d\s]*")
  //   }

  //   let regex = createRegex("###")

  //   for(let i = 0; i < lines.length; i++) {
  //     let words = lines[i].split(' ')
  //     let tempObj = {}

  //     if(lines[i].length === 0) {
  //       tempObj.category = "empty"
  //       tempObj.text = lines[i]
  //     } else if(regex.test(words[0])) {
  //       tempObj.category = "header"
  //       tempObj.text = words[0].replace(regex, "")
  //     } else {
  //       tempObj.category = "normal"
  //       tempObj.text = lines[i]
  //     }
      
  //     updatedLines.push(tempObj)
  //   }

  //   //need better way to iterate through, maybe all regexs stored in for loop
  //   setUpdatedMarkdown(updatedLines)
  // }
