import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { Home } from './components/Home';
import { About } from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/Notes/NoteState';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TimeTableState from './context/TimeTable/TimeTableState';
import TimeTable from './components/TimeTable';
import BlogHome from './components/BlogHome';
import BlogItem from './components/BlogItem';
import BlogState from './context/Blogs/BlogState';
import CreateBlog from './components/CreateBlog';
import AddNote from './components/AddNote';
import MyCkeditor from './components/MyCkeditor';

function App() {

  return (
    <>

      <NoteState>
        <TimeTableState>
          <BlogState>
            <Router>
              <Navbar />
              <Alert message="First alert" />
              <div>
                <Route exact path="/" component={BlogHome} />
                <Route exact path="/blog" component={BlogHome} />

                <Route exact path="/notes" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/routinePanel" component={TimeTable} />
                <Route exact path="/blogpost/:id" component={BlogItem} />
                <Route exact path="/create" component={CreateBlog} />
                <Route exact path="/update/:id" component={CreateBlog} />
                <Route exact path="/addNote" component={AddNote} />
                <Route exact path="/ck" component={MyCkeditor} />

              </div>

            </Router>
          </BlogState>
        </TimeTableState>
      </NoteState>
    </>
  );
}

export default App;
