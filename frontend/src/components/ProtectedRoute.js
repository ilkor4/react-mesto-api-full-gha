import { Navigate } from "react-router-dom";

function  ProtectedRoute({ isLogged, element: Component }) {
  return(
     isLogged ? Component : <Navigate to="sign-in" replace />
  )
}

export default ProtectedRoute;
