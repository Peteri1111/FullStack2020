import React from 'react'
import ReactDOM from 'react-dom'
const Header = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
        </div>
    )
}
const Content = (props) => {
    return (
        <div>
            <Part text={props.parts[0].name} value={props.parts[0].exercises}/>
            <Part text={props.parts[1].name} value={props.parts[1].exercises}/>
            <Part text={props.parts[2].name} value={props.parts[2].exercises}/>
        </div>
        )
    }
const Part = (props) => {
    return (
        <p>
            {props.text} {props.value}
        </p>
        
    )
}

const Total = (props) => {
    let sum = 0
    props.parts.forEach(part => sum += part.exercises)
    
    return (
        <div>
            <p>Number of exercises {sum}</p>
        </div>
    )
}
const App = () => {
    
    const course = {
        name: 'Half Stack application development',
        parts:  [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }   
    ]
}
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))