import React from 'react'
import ReactDOM from 'react-dom'
const Header = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
        </div>
    )
}sdfdsfds
const Content = (props) => {
    return (
        <div>
            <Part text={props.info[0]} value={props.info[1]}/>
            <Part text={props.info[2]} value={props.info[3]}/>
            <Part text={props.info[4]} value={props.info[5]}/>
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
    return (
        <div>
            <p>Number of exercises {props.sum}</p>
        </div>
    )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course}/>
      <Content info={[part1,exercises1,part2,exercises2,part3,exercises3]}></Content>
      <Total sum={exercises1+exercises2+exercises3}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))