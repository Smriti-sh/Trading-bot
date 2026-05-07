import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@xyflow/react/dist/style.css';
import { CreateWorkflow } from "./component/CreateWorkflow.tsx";

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#f3f8ff_0%,_#eef6ff_35%,_#f8fbff_100%)]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateWorkflow />} />
          <Route path="/create-workflow" element={<CreateWorkflow />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}