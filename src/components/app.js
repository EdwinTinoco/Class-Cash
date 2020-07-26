import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Cookies from 'js-cookie'

import Home from "./pages/home";
import SignUp from "./auth/sign-up"
import Auth from "./pages/auth"
import TeachersHome from "./teachers/teachers-home"
import AddStudent from "./students/add-student"
import StudentsHome from "./students/students-home"
import StudentDetail from "./students/students-detail"
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons"

export default function App(props) {
  const [userCookie, setUserCookie] = useState("")

  Icons();

  const getUserCookie = () => {
    if (Cookies.get("_sb%_user%_session") !== undefined) {
      console.log('usuario logeado');

      setUserCookie(
        Cookies.get("_sb%_user%_session")
      )
    } else {
      console.log('usuario no logeado');
    }

    console.log("userCookie", Cookies.get("_sb%_user%_session"))
  }

  useEffect(() => {
    getUserCookie()
  }, [])


  return (
    <div className="container">
      <Router>
        <div>

          <Switch>
            <ProtectedHome exact path="/" user={userCookie} component={Home} />

            <ProtectedSignUp path="/signup" user={userCookie} component={SignUp} />
            <ProtectedAuth path="/auth" user={userCookie} component={Auth} />

            <ProtectedTeachersHome path="/teachers-home" component={TeachersHome} />

            <ProtectedStudentsHome exact path="/students-home/:slug" component={StudentsHome} />
            <ProtectedAddStudent path="/add-student" component={AddStudent} />
            <ProtectedStudentDetail exact path="/student/:slug" component={StudentDetail} />

            <Route component={NoMatch} />
          </Switch>

        </div>
      </Router>

    </div>
  );
}

const ProtectedHome = ({ user, component: Component, ...rest }) => {
  console.log("from protected home", user)
  return (
    <Route
      {...rest}
      render={props => user === "" ?
        (
          <Component {...props} />
        ) :
        (
          <Redirect to="/teachers-home" />
        )
      }
    />
  )
}

const ProtectedAuth = ({ user, component: Component, ...rest }) => {
  console.log("from protected auth", user)
  return (
    <Route
      {...rest}
      render={props => user === "" ?
        (
          <Component {...props} />
        ) :
        (
          <Redirect to="/teachers-home" />
        )
      }
    />
  )
}

const ProtectedSignUp = ({ user, component: Component, ...rest }) => {
  console.log("from protected signup", user)
  return (
    <Route
      {...rest}
      render={props => user === "" ?
        (
          <Component {...props} />
        ) :
        (
          <Redirect to="/teachers-home" />
        )
      }
    />
  )
}

const ProtectedTeachersHome = ({ component: Component, ...rest }) => {
  let currentUser = Cookies.get("_sb%_user%_session")
  console.log("from protected teachers home", currentUser)

  return (
    <Route
      {...rest}
      render={props => currentUser !== "" && currentUser !== undefined ?
        (
          <Component {...props} />
        ) :
        (
          <Redirect to="/" />
        )
      }
    />
  )
}

const ProtectedStudentsHome = ({ component: Component, ...rest }) => {
  let currentUser = Cookies.get("_sb%_user%_session")
  console.log("from protected students home", currentUser)

  return (
    <Route
      {...rest}
      render={props => currentUser !== "" && currentUser !== undefined ?
        (
          <Component {...props} />
        ) :
        (
          <Redirect to="/" />
        )
      }
    />
  )
}

const ProtectedStudentDetail = ({ component: Component, ...rest }) => {
  let currentUser = Cookies.get("_sb%_user%_session")
  console.log("from protected students home", currentUser)

  return (
    <Route
      {...rest}
      render={props => currentUser !== "" && currentUser !== undefined ?
        (
          <Component {...props} />
        ) :
        (
          <Redirect to="/" />
        )
      }
    />
  )
}

const ProtectedAddStudent = ({ component: Component, ...rest }) => {
  let currentUser = Cookies.get("_sb%_user%_session")
  console.log("from protected students home", currentUser)

  return (
    <Route
      {...rest}
      render={props => currentUser !== "" && currentUser !== undefined ?
        (
          <Component {...props} />
        ) :
        (
          <Redirect to="/" />
        )
      }
    />
  )
}

