import logo from "./logo.svg";
import "./App.css";
import { Typography } from "@mui/material";
import LinkListingTable from "./pages/LinkListingTable";
import CategoriesComponent from "./pages/components/CategoriesComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Link Manager
        </Typography>
        <Typography sx={{color: '#1976D2', fontWeight: 400}} my={'20px'} >
          Organize todos os seus links num unico lugar!
        </Typography>
        <CategoriesComponent/>
        <LinkListingTable />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
