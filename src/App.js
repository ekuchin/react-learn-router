import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import routeData from "./data/routeData.js"


function App() {
  const navArray = routeData.map(doc=>{
    return(
      <li key={doc.id}>
        <Link to={"/"+doc.id}>{doc.title}</Link>
      </li>
    )
  })

  const infoArray=routeData.map(doc =>{
    return(
      <Route key={doc.id} path={"/"+doc.id}>
        <Info doc={doc}/>
      </Route>
    )
  })

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li><Link to={"/"}>На главную</Link></li>
            {navArray}
         </ul>

        </nav>

        <Switch>
          <Route exact path="/"><Home /></Route>
          {infoArray}
          <Route path="/contract">
            <Redirect to="/dog/abon" />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App

function Home() {
  return <h2>Это домашняя страница</h2>;
}

function NoMatch() {
  return <h2>Это 404 страница</h2>;
}

function Info(props) {
  
  let { path, url } = useRouteMatch();

  const nestedLinksArray=props.doc.types.map(type=>{
    return(
      <li key={type.id}><Link to={url+"/"+type.id}>{type.title}</Link></li>
    )
    })

  const nestedInfoArray= props.doc.types.map(type =>{
    return(     
      <Route key={type.id} path={path+"/"+type.id}>
        <DetailedInfo type={type}/>
      </Route>
    )
  })
 
  return (
    <div>
      <h2>{props.doc.description}</h2>
      <p>Путь: {path}, URL: {url}</p>
      <ul>
        {nestedLinksArray}
      </ul>
    
      <Switch>
          {nestedInfoArray}       
      </Switch>
    </div>
    
    )
}

function DetailedInfo(props) {
  return <h2>{props.type.description}</h2>;
}