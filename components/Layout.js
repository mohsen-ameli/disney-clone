import { AuthContextProvider } from "../authContext";
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <AuthContextProvider>
      <Navbar />
      {children}
    </AuthContextProvider>
  );
}
 
export default Layout;