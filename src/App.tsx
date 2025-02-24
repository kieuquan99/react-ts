import { useState, useEffect, useReducer, useRef, ChangeEvent } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Papa from 'papaparse';

const initialState = { count: 0 };

function reducer(state: { count: number }, action: { type: 'increment' | 'decrement'}) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}


function App() {
  const inputEl = useRef(null);

  const [count, setCount] = useState(0)

  const handleSetCount = () => {
    console.log('1');
    setCount((preState) => preState + 1);
    console.log('2', count);
    setCount((preState) => preState + 1);
  }

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  
    return () => {
      // Cleanup code here (optional)
    };
  }, [count]);


  const [text, setText] = useState("cxcx")
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const [jobList, setJobList] = useState<string[]>(() => {
    const jobsCache = localStorage.getItem("jobs")
    if(jobsCache){
      return JSON.parse(jobsCache) 
    }
    return []
  })

  const [jobValue, setJobValue] = useState<string>("")
  const inputJobOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJobValue(e.target.value)
  }
  const handleSetJob = () => {
    setJobList((preJobList) => {
      const newJobList = [...preJobList, jobValue] 
      localStorage.setItem("jobs", JSON.stringify(newJobList))
      return newJobList
    })
    setJobValue("")
    
  }
  const [number, setNumber] = useState(0)
  useEffect(() => {
    const idInterval = setInterval(() => {
      setNumber(preNumber => preNumber + 1)
    }, 1500)
    return () => clearInterval(idInterval)
  }, []);


  const [srcAvatar, setSrcAvatar] = useState<string | null>(null)
  useEffect(() => {
    const idInterval = setInterval(() => {
      setNumber(preNumber => preNumber + 1)
    }, 1000)
    return () => clearInterval(idInterval)
  }, []);

  useEffect(() => {
    return () => {
      if(srcAvatar) {
        console.log('2222 ', srcAvatar);
        URL.revokeObjectURL(srcAvatar)
      }
    }
  }, [srcAvatar])

  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file){
      // 1
      // const render = new FileReader();
      // render.onloadend = () => {
      //   setSrcAvatar(render.result as string);
      // }
      // render.readAsDataURL(file)


      // 2 
      // const url = URL.createObjectURL(file)

      setSrcAvatar(URL.createObjectURL(file));
    }
    e.target.value = ""
  }

  const [data, setData] = useState<Array<{ [key: string]: string }>>([]);
  console.log(data);
  
  const onChangeFileCSV = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file){
      Papa.parse(file, {
        complete: (results: {data: Array<{ [key: string]: string }>}) => {
            setData(results.data as Array<{ [key: string]: string }>);
        },
        header: true, // Đặt true nếu bạn muốn đọc header
        skipEmptyLines: true,
      });
    }
  }
  
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <input type="file" onChange={(e) => onChangeAvatar(e)}/>
      <img className="avatar" src={srcAvatar || ''} />
      <h1>{ number }</h1>
      <div className="card">
        <button onClick={() => setCount(0)}>reset count</button>
        <button onClick={() => handleSetCount()}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <h2>test react ts</h2>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <hr/>
      <input ref={inputEl} value={text} type="text" onChange={(e) => inputChange(e)} />
      <b>{ text }</b>
      <hr/>
      <Counter />
      <hr/>
      <hr/>
      <input type="text" value={jobValue} onChange={(e) => inputJobOnChange(e)} />
      <button onClick={() => handleSetJob()}>submit result</button>
      <ul>
        {
          jobList.map((job, index) => (
              <li key={index}>{ job }</li>
          ))
        }
      </ul>

      <input type="file" onChange={(e) => onChangeFileCSV(e)}/>
    </>
  )
}
export default App
