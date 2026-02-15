import LandingPage from './pages/LandingPage';
import Editor from './pages/Editor';

function App() {
  const showEditor = window.location.hash === '#/editor';
  
  return showEditor ? <Editor /> : <LandingPage />;
}

export default App;
