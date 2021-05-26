import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {withCookies} from 'react-cookie'

/* Layouts */ 
import Navbar from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { Search } from './components/Pages/Search';
import ScrollToTop from './ScrollToTop';


/* قسم الرحلات | Trips Section */
import { Trips } from './components/Pages/Trips/allTrips';
import { TodayTrips } from './components/Pages/Trips/Today';
import { LaterTrips } from './components/Pages/Trips/Later';


/* قسم المعاملات | Transactions Section */
import { AllTransactions } from './components/Pages/Transactions/AllTransactions';
import { IESY } from './components/Pages/Transactions/IESY';
import { TRSA } from './components/Pages/Transactions/TRSA';
import { TSEY } from './components/Pages/Transactions/TSEY';

// قسم الحج والعمرة
import { Hajj } from './components/Pages/hajj/hajj';
import { HajjTrip } from './components/Pages/hajj/order_hajj';
import { Info } from './components/Pages/hajj/activehajj';
import { ViewOrder } from './components/Pages/hajj/viewOrder';

/* قسم الطلبات | Orders Section */
import { OrderTrip } from './components/Pages/Orders/OrderTrip';
import { OrderDelivery } from './components/Pages/Orders/OrderDelivery';
import { OrderTransaction } from './components/Pages/Orders/OrderTransaction';
import { SearchOrders } from './components/Pages/Orders/SearchOrders';
import { Order } from './components/Pages/Orders/Order';


/* Not Found */ 
import { NotFound } from './components/Pages/NotFound';
import { Contact } from './components/Pages/Contact';
import { Policies } from './components/Pages/Policies';
import { Payment } from './components/Pages/Orders/Payment';
import { PayComp } from './components/Pages/Orders/PayCompleted';
import { PayPalPayment } from './components/Pages/Orders/PayPalPayment';


/* Super Admin */
import { AllUsers } from './components/AdminPanel/SuperAdmin/ViewUsers';
import { User } from './components/AdminPanel/SuperAdmin/ViewUser';
import { AllComapnies } from './components/AdminPanel/SuperAdmin/ViewCompanies';
import { AddCompany } from './components/AdminPanel/SuperAdmin/AddCompanies';
import { AllPayments } from './components/AdminPanel/SuperAdmin/ViewPayments';

/* SuperVisor */ 
import { AllOffers } from './components/AdminPanel/SuperAdmin/ViewOffers';
import { AllOrders } from './components/AdminPanel/SuperAdmin/ViewOrders';
import { AllOrdersHajj } from './components/AdminPanel/SuperAdmin/viewOrdersHajj';


/* Admin Public */ 
import AdminNav from './components/AdminPanel/AdminNav';
import { AdminHome } from './components/AdminPanel/AdminHome';
import { MyOffers } from './components/AdminPanel/ViewOffers';

/* Company Admin */
import { AllTrips } from './components/AdminPanel/CompanyAdmin/ViewTrips';
import { HajjActiveOrder } from './components/AdminPanel/CompanyAdmin/activeHajj';

import { AllTripsHajj } from './components/AdminPanel/CompanyAdmin/viewhajj';
import { CompanyTripOrders } from './components/AdminPanel/CompanyAdmin/ViewOrdersTrip';
import { CompanyTransOrders } from './components/AdminPanel/CompanyAdmin/ViewOrdersTrans';
import { AllCompanyOffers } from './components/AdminPanel/CompanyAdmin/ViewCompanyOffers';



/* Trip & Delivery Admin */ 
import { AddTrip } from './components/AdminPanel/TripsAdmin/AddTrips';
import { MyTrips } from './components/AdminPanel/TripsAdmin/ViewTrips';
import { MyTripsHajj } from './components/AdminPanel/TripsAdmin/viewHajj';

import { TripsOrders } from './components/AdminPanel/TripsAdmin/ViewOrders';
import MySearch from './components/AdminPanel/TripsAdmin/search-trips';
import { AddOffer as TripsOffer } from './components/AdminPanel/TripsAdmin/AddOffer';
import { EditOffer as EditTripOffer } from './components/AdminPanel/TripsAdmin/EditOffer';


/* Transaction Admin */
import { TransactionsOrders } from './components/AdminPanel/TransAdmin/ViewOrders';
import { AddOffer as TransOffer } from './components/AdminPanel/TransAdmin/AddOffer';
import { EditOffer as EditTransOffer } from './components/AdminPanel/TransAdmin/EditOffer';


/* User Section */ 
import { RegisterUser } from './components/Users/Register';
import { LoginUser } from './components/Users/Login';
import { ResetPassword } from './components/Users/ResetPassword';
import { NotAllowed } from './components/Pages/NotAllowed';
import 'bootstrap/dist/css/bootstrap.min.css';




class App extends Component {

  render() {

    const Default = () => (
      <div className="App">
        <Navbar/>
          <Switch>
            {/* User Section */}
            <Route exact path="/register" component={RegisterUser}/>
            <Route exact path="/login" component={LoginUser}/>
            <Route exact path="/reset" component={ResetPassword}/>
            {/* Home Page */}
            <Route exact path="/" component={Trips}/>
            {/* hajj */}
            <Route exact path="/hajj" component={Hajj}/>
            <Route exact path="/hajj-order" component={HajjTrip}/>
            <Route exact path="/hajj-order/:tid" component={HajjTrip}/>
            <Route exact path="/hajj-orders/:oid" component={ViewOrder}/>
            <Route exact path="/hajj-order/:oid/active" component={Info}/>

            {/* Trips Section */}
            <Route exact path="/trips/search" component={Search}/>
            <Route exact path="/trips/today" component={TodayTrips}/>
            <Route exact path="/trips/later" component={LaterTrips}/>
            <Route exact path="/trips/order" component={OrderTrip}/>
            <Route exact path="/trips/order/:tid" component={OrderTrip}/>
            <Route exact path="/delivery/order" component={OrderDelivery}/>
            {/* Transactions Section */}
            <Route exact path="/transactions" component={AllTransactions}/>
            <Route exact path="/transactions/iesy" component={IESY}/>
            <Route exact path="/transactions/trsa" component={TRSA}/>
            <Route exact path="/transactions/tsey" component={TSEY}/>
            <Route exact path="/transactions/order" component={OrderTransaction}/>
            {/* Orders Section */}
            <Route exact path="/orders" component={SearchOrders} />
            <Route exact path="/payments" component={PayComp} />
            <Route exact path="/payments/paypal" component={PayPalPayment} />
            <Route exact path="/orders/:oid/payment" component={Payment} />
            <Route exact path="/orders/:oid" component={Order} />
            {/* Policies & Contact Section */}
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/policies" component={Policies}/>
            {/* 401 UnAuthorized */}
            <Route exact path='/unauthorized' component={NotAllowed}/>

          

          {/* 404 Not Found */}
            <Route component={NotFound}/>
          </Switch>
        <Footer/>
      </div>
    )

    const Admin = () => (
      <div className="Admin">
        {/* <Route exact path="/" render={() => <Redirect to="/login"/>}/> */}
        {/* Admin Section */}
        <AdminNav />
        <Switch>
          {/* Admin Routes */}
          <Route exact path="/admin" render={() => <Redirect to="/login"/>}/>
          <Route exact path="/admin/panel" component={AdminHome}/>
          <Route exact path="/admin/alltrips" component={AllTrips}/>
          <Route exact path="/admin/alltrips-hajj" component={AllTripsHajj}/>
          <Route exact path="/admin/trips/company" component={CompanyTripOrders}/>
          <Route exact path="/admin/transactions/company" component={CompanyTransOrders}/>
          <Route exact path="/admin/alloffers" component={AllOffers}/>
          <Route exact path="/admin/myoffers" component={MyOffers}/>
          <Route exact path="/admin/offers/company" component={AllCompanyOffers}/>
          {/* Super Admin Routes */}
          <Route exact path="/admin/allorders" component={AllOrders}/>
          <Route exact path="/admin/allorders-hajj/:pid/active" component={HajjActiveOrder}/>
          <Route exact path="/admin/allorders-hajj/active" component={HajjActiveOrder}/>

          <Route exact path="/admin/allorders-hajj" component={AllOrdersHajj}/>
          <Route exact path="/admin/payments" component={AllPayments}/>
          <Route exact path="/admin/users" component={AllUsers}/>
          <Route exact path="/admin/users/:uid" component={User}/>
          <Route exact path='/admin/companies' component={AllComapnies}/>
          <Route exact path='/admin/companies/create' component={AddCompany}/>
          {/* Trips & Deliveries Admin */}
          <Route exact path="/admin/trips" component={MyTrips}/>
          <Route exact path="/admin/trips-hajj" component={MyTripsHajj}/>
          <Route exact path="/admin/trips/orders" component={TripsOrders}/>
          <Route exact path="/admin/trips/create" component={AddTrip}/>
          <Route exact path="/admin/trips/offer" component={TripsOffer}/>
          <Route exact path="/admin/trips/offer/edit" component={EditTripOffer}/>
          {/* Transactions Admin */}
          <Route exact path="/admin/transactions/orders" component={TransactionsOrders}/>
          <Route exact path="/admin/transactions/offer" component={TransOffer}/>
          <Route exact path="/admin/transactions/offer/edit" component={EditTransOffer}/>
          {/* 401 UnAuthorized */}
          <Route exact path='/unauthorized' component={NotAllowed}/>
          {/* 404 Not Found */}
          <Route component={NotFound}/>
        </Switch>
        <Footer/>
      </div>
    )

    return(
      <BrowserRouter>
        <ScrollToTop/>
        <Switch>
          <Route path="/(admin)" component={Admin}/>
          <Route component={Default}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default withCookies(App);
