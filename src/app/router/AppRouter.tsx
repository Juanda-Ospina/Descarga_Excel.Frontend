import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PaginaConsulta } from '../../features/employee-query/pages/PaginaConsulta';


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaConsulta />} />
      </Routes>
    </BrowserRouter>
  );
};
