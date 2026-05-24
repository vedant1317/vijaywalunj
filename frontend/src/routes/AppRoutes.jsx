import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import GrievancePortal from '../pages/GrievancePortal.jsx';
import Facilities from '../pages/Facilities.jsx';
import VashiPremierLeague from '../pages/VashiPremierLeague.jsx';
import GanrajVashicha from '../pages/GanrajVashicha.jsx';
import Testimonials from '../pages/Testimonials.jsx';
import NmmcServices from '../pages/NmmcServices.jsx';
import ImportantContacts from '../pages/ImportantContacts.jsx';
import NotFound from '../pages/NotFound.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/" element={<Layout><Home /></Layout>} />
    <Route path="/grievance" element={<Layout><GrievancePortal /></Layout>} />
    <Route path="/facilities" element={<Layout><Facilities /></Layout>} />
    <Route path="/vashi-premier-league" element={<Layout><VashiPremierLeague /></Layout>} />
    <Route path="/ganraj-vashicha" element={<Layout><GanrajVashicha /></Layout>} />
    <Route path="/testimonials" element={<Layout><Testimonials /></Layout>} />
    <Route path="/nmmc-services" element={<Layout><NmmcServices /></Layout>} />
    <Route path="/important-contacts" element={<Layout><ImportantContacts /></Layout>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
