// import "./App.css";
import RoutesPath from "./router/RoutesPath";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import SidebarApp from "./components/sidebar/SidebarApp";

function App() {
  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <SidebarApp />
      <div style={{width:"100%"}}>
        <RoutesPath />
      </div>
    </div>
  );
}

export default App;
