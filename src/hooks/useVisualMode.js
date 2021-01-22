import {useState} from 'react'

export function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode])

  //transistion to a new mode
  function transition(newMode, replace= false) {
    if(!replace) {
      setHistory(prev => [...prev, newMode] )
    
  } else {
    const newHistory = history.splice(0, 1)
    const newHistoryAfterReplace = [...newHistory, newMode ]
    setHistory(newHistoryAfterReplace)
  }
  setMode(newMode)
  }

  //go to a previous mode
  function back() {
    if(history.length >= 1){
      const newHistory = history.slice(0, -1)
      setHistory(newHistory)
      setMode(newHistory[newHistory.length-1]);
    } 
  }

  //transistion with replace



  
  return{mode, transition, back}

  
}

/**
 * initial mode is first
 * 
 * mode = first
 * history = ["first"]
 * 
 * after transistion(second)
 * history = ["first", "second"]
 * mode = second
 * 
 * after transistion(third)
 * history = ["first", "second", third]
 * mode = third
 * 
 * after back()
 * NEWHISTORY = ["first", "second"] 
 * newmode = NEWHISTORY[NEWHISTORY.length-1] ....second
 * 
 * 
 * with replace
 * mode = first
 * history = ["first"]
 * 
 * after transistion(second)
 * history = ["first", "second"]
 * mode = second
 * 
 * after transistion(third) with replace
 * history = ["first", "second", "third"]
 *
 * newhistory = history.splice(0, -1) // [first, second]
 * afterreplace = [...newhistory, history[history.length-2]=newmode]
 * [first, second]
 * 
 */

