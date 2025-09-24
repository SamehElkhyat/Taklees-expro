// src/router/routes/dashboard.js
import { lazy } from 'react';

// Admin pages
const LandingPageAdmin = lazy(() => import('../../pages/landingPages/LandingPageAdmin/LandingPageAdmin.jsx'));
const AllClients = lazy(() => import('../../pages/dashboard/admin/AllClients/AllClients.jsx')); 
const Blacklist = lazy(() => import('../../pages/dashboard/admin/blacklist/blacklist.jsx'));
const Brookers = lazy(() => import('../../pages/dashboard/admin/Brookers/Brookers.jsx'));
const Permissions = lazy(() => import('../../pages/dashboard/admin/Permissions/Permissions.jsx'));
const Statistics = lazy(() => import('../../pages/dashboard/admin/statistics/statistics.jsx'));
const CPanelCustomerService = lazy(() => import('../../pages/dashboard/admin/CPanelCustomeService/CPanelCustomerService.jsx'));
const CpanelAccountant = lazy(() => import('../../pages/dashboard/admin/CpanelAccountant/CpanelAccountant.jsx'));
const ProfileUsers = lazy(() => import('../../pages/dashboard/admin/ProfileUsers/ProfileUsers.jsx'));
const Mangers = lazy(() => import('../../pages/dashboard/admin/Manegers/Mangers.jsx'));
const FormResponse = lazy(() => import('../../pages/dashboard/admin/FormResponse/FormResponse.jsx'));
const ExpiredOrders = lazy(() => import('../../pages/dashboard/admin/ExpiredOrders/ExpiredOrders.jsx'));
const ActiveAccount = lazy(() => import('../../pages/dashboard/admin/ActiveAccount/ActiveAccount.jsx'));
const Clients = lazy(() => import('../../pages/dashboard/admin/Clients/Clients.jsx'));

// User pages
const LandingPageForUsers = lazy(() => import('../../pages/landingPages/LandingPageForUsers/LandingPageForUsers.jsx'));
const Cart = lazy(() => import('../../pages/dashboard/user/Cart/Cart.jsx'));
const UserPayment = lazy(() => import('../../pages/dashboard/user/UserPayment/UserPayment.jsx'));

// Manager pages
const LandingPageManger = lazy(() => import('../../pages/landingPages/LandingPageManger/LandingPageManger.jsx'));
const AllClientsManger = lazy(() => import('../../pages/dashboard/manager/AllClientsManger/AllClientsManger.jsx'));
const BrookersManger = lazy(() => import('../../pages/dashboard/manager/BrookersManger/BrookersManger.jsx'));
const ClientsManger = lazy(() => import('../../pages/dashboard/manager/ClientsManger/ClientsManger.jsx'));
const CpanelAccountantManger = lazy(() => import('../../pages/dashboard/manager/CpanelAccountantManger/CpanelAccountantManger.jsx'));
const CPanelCustomerServiceManger = lazy(() => import('../../pages/dashboard/manager/CPanelCustomeServiceManger/CPanelCustomerServiceManger.jsx'));
const BlacklistManger = lazy(() => import('../../pages/dashboard/manager/blacklistManger/blacklistManger.jsx'));
const StatisticsManger = lazy(() => import('../../pages/dashboard/manager/statisticsManger/statisticsManger.jsx'));
const DetailsForAdmin = lazy(() => import('../../pages/dashboard/manager/DetailsForAdmin/DetailsForAdmin.jsx'));
const LogsOrders = lazy(() => import('../../pages/dashboard/manager/LogsOrders/LogsOrders.jsx'));

// Accountant pages
const AccountantLandingPage = lazy(() => import('../../pages/landingPages/AccountantLandingPage/AccountantLandingPage.jsx'));
const AcceptedOrderAccountant = lazy(() => import('../../pages/dashboard/accountant/AcceptedOrderAccountant/AcceptedOrderAccountant.jsx'));
const HistoryDoneOrder = lazy(() => import('../../pages/dashboard/accountant/HistoryOfDoneOrdersAccountant/HistoryDoneOrder.jsx'));

// Broker pages
const BrookersLandingPage = lazy(() => import('../../pages/landingPages/BrookersLandingPage/BrookersLandingPage.jsx'));
const AvailableOrders = lazy(() => import('../../pages/dashboard/broker/AvailableOrders/AvailableOrders.jsx'));
const OrderDetails = lazy(() => import('../../pages/dashboard/broker/OrderDetails/OrderDetails.jsx'));
const CurrentOffers = lazy(() => import('../../pages/dashboard/broker/CurrentOffers/CurrentOffers.jsx'));
const HistoryOfOrders = lazy(() => import('../../pages/dashboard/broker/HistoryOfOrders/HistoryOfOrders.jsx'));
const BrookersCart = lazy(() => import('../../pages/dashboard/broker/BrookersCart/BrookersCart.jsx'));
const TransferOrders = lazy(() => import('../../pages/dashboard/broker/TransferOrders/TransferOrders.jsx'));
const SendOrders = lazy(() => import('../../pages/dashboard/broker/SendOrders/SendOrders.jsx'));

export const dashboardRoutes = [
  // Admin routes
  { path: "LandingPageAdmin", element: <LandingPageAdmin /> },
  { path: "AllClients", element: <AllClients /> },
  { path: "blackList", element: <Blacklist /> },
  { path: "brookers", element: <Brookers /> },
  { path: "permissions/:id", element: <Permissions /> },
  { path: "permissions", element: <Permissions /> },
  { path: "statistics", element: <Statistics /> },
  { path: "CPanelCustomerService", element: <CPanelCustomerService /> },
  { path: "CpanelAccountant", element: <CpanelAccountant /> },
  { path: "ProfileUsers/:id", element: <ProfileUsers /> },
  { path: "Mangers", element: <Mangers /> },
  { path: "FormResponse", element: <FormResponse /> },
  { path: "ExpiredOrders", element: <ExpiredOrders /> },
  { path: "ActiveAccount", element: <ActiveAccount /> },
  { path: "Clients", element: <Clients /> },
  
  // User routes
  { path: "LandingPageForUsers", element: <LandingPageForUsers /> },
  { path: "Cart", element: <Cart /> },
  { path: "UserPayment", element: <UserPayment /> },
  
  // Manager routes
  { path: "LandingPageManger", element: <LandingPageManger /> },
  { path: "AllClientsManger", element: <AllClientsManger /> },
  { path: "BrookersManger", element: <BrookersManger /> },
  { path: "ClientsManger", element: <ClientsManger /> },
  { path: "CpanelAccountantManger", element: <CpanelAccountantManger /> },
  { path: "CPanelCustomeServiceManger", element: <CPanelCustomerServiceManger /> },
  { path: "blacklistManger", element: <BlacklistManger /> },
  { path: "StatisticsManger", element: <StatisticsManger /> },
  { path: "DetailsForAdmin/:id", element: <DetailsForAdmin /> },
  { path: "LogsOrders", element: <LogsOrders /> },
  
  // Accountant routes
  { path: "AccountantLandingPage", element: <AccountantLandingPage /> },
  { path: "AcceptedOrderAccountant", element: <AcceptedOrderAccountant /> },
  { path: "HistoryDoneOrder", element: <HistoryDoneOrder /> },
  
  // Broker routes
  { path: "brookersLandingPage", element: <BrookersLandingPage /> },
  { path: "availableOrders", element: <AvailableOrders /> },
  { path: "orderDetails/:id", element: <OrderDetails /> },
  { path: "currentOffers", element: <CurrentOffers /> },
  { path: "historyOfOrders", element: <HistoryOfOrders /> },
  { path: "brookersCart", element: <BrookersCart /> },
  { path: "TransferOrders", element: <TransferOrders /> },
  { path: "SendOrders", element: <SendOrders /> },
];
