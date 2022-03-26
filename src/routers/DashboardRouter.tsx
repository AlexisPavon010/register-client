import {
  Routes,
  Route,
} from "react-router-dom"
import { CreateRegister } from "../screens/NewRegister"
import { Home } from "../screens/Home"
import { UpdateRegister } from "../screens/UpdateRegister"

export const DashboardRouter = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-register" element={<CreateRegister />} />
      <Route path="/update-register/:id" element={<UpdateRegister />} />
    </Routes>
  )
}
