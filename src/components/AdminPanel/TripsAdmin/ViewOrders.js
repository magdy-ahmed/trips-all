import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Search from './search'
// import {Cookies} from 'react-cookie';
import SearchBlock from './Search-block2'
export const TripsOrders = () => {
  // const cookies = new Cookies();
//  const  [search, setSearch] = useState('');
  const [tripsOrders, setTrips] = useState({orders: null, limit: 5});
  const [deliveriessOrders, setDeliveries] = useState({orders: null, limit: 5});
  const [offer, setOffer] = useState({offer: false, oid: null})
  const [dataTrips_, setDataTrips_] = useState([{
    id:1,
    chkId:'idto',
    name:'Order Id',
},{
    id:2,
    chkId:'from',
    name:'مدينة الصعود',
},{
    id:3,
    chkId:'to',
    name:'مدينة الهبوط',
},{
    id:4,
    chkId:'day',
    name:'اليوم',
},{
    id:5,
    chkId:'date',
    name:'التاريخ',
},{
    id:6,
    chkId:'ticket',
    name:'عدد التذاكر',
},{
    id:7,
    chkId:'babies',
    name:'عدد الرضع',
},{
    id:8,
    chkId:'children',
    name:'عدد الأطفال',
},{
    id:9,
    chkId:'adults',
    name:'عدد البالغين',
},{
    id:10,
    chkId:'nots',
    name:'ملاحظات أضافية',
}])

const [dataDelivery_, setDataDelivery_] = useState([{
  id:1,
  chkId:'idto_Delivery',
  name:'Order Id',
},{
  id:2,
  chkId:'type_Delivery',
  name:'نوع الطرد',
},{
  id:3,
  chkId:'content_Delivery',
  name:'محتوى الطرد',
},{
  id:4,
  chkId:'from_Delivery',
  name:'المرسل',
},{
  id:5,
  chkId:'to_Delivery',
  name:'المرسل اليه',
}])

  // const fildsTrips = dataTrips_.map(column=><Search key={column.id} column={column}/>)
  // const fildsDelivery = dataDelivery_.map(column=><Search key={column.id} column={column}/>)
  // // User Authentication
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);

  // User Authentication + Content Loading
  useEffect((tripsOrders, deliveriessOrders,
    dataTrips={'idto':'','from':'','to':'','day':'',
    'date':'','ticket':'','babies':'','children':'',
    'adults':'','nots':'','offer':'','search':'','select':''}) => {
    // Authentication
    const dataDelivery = {'search':'','idto_Delivery':'','type_Delivery':'',
    'from_Delivery':'','to_Delivery':'',
    'content_Delivery':'','select':''}
    const searchDelivery = localStorage.getItem('search')
    for (let key in dataDelivery){
      if (localStorage.getItem(key)!='false'){
        dataDelivery[key] = searchDelivery
        console.log(dataDelivery[key])
      }
    }
    
    if (localStorage.getItem('select')=='false'){
      dataDelivery['select'] = true
    
    }
    const search = localStorage.getItem('search')
    dataTrips['search'] = search
    for (let key in dataTrips){
      if (localStorage.getItem(key)!='false'){
        dataTrips[key] = search
      }
    }
    if (localStorage.getItem('select')=='false'){
      dataTrips['select'] = true
    
    }

      const jwt = localStorage.yemenbus_user_jwt;
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({jwt: jwt, permission: 'trip_access'})
    }).then(resp => {
      if (resp.ok){
        setShow(true)
      } else {
        setFailed(true);
      }
    })

    // Loading...
    fetch('/api/trips/search/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dataTrips)
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setTrips({orders: data.orders, limit: 5})
        }
      })
    });
    fetch('/api/delivery/search/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dataDelivery)
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setDeliveries({orders: data.orders, limit: 5})
        }
      })
    });
  }, []);

  if (failed){
    return <Redirect to="/unauthorized"/>
  }

  const handleOffer = (e) => {
    e.preventDefault();
    setOffer({offer: true, oid: e.target.id})
  }
  const handleSubmit = (e) => {
    
  }
    
const handleClick =(e)=> {
    
console.log('input is'+e.target.checked);

localStorage.setItem(e.target.id, e.target.checked)

console.log('input id is'+e.target.id);

}
const handleChange = (e) => {
  e.preventDefault();
  
  localStorage.setItem('search', e.target.value);
}
  const getDate = (date) => {
    let mm = date.getMonth() + 1
    let dd = date.getDate();

    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd].join('-');
  }

  const getStatus = (status)  => {
    if (status === 'open'){
      return true
    } else {
      return false
    }
  }

  const getPackageType = (type) => {
    const types = {
      'merchant': 'بضائع تجارية',
      'package': 'طرد',
      'letter': 'رسالة'
    }

    return (types[type])
  }

  const LoadTrips = () => {
    const orders_patch = tripsOrders.orders && tripsOrders.orders.slice(0, tripsOrders.limit)

    return(
      <tbody>
        {orders_patch ? (orders_patch.map((order, index) => {
          let offers = order.offers;
          let status = getStatus(order.status);
          return(
            <tr className="table-light" key={index}>
              <th className="font-weight-bold" scope="row">
                {offers >= 5 ? (
                  <i className="tc text-secondary">{order.toid}</i>
                ) : (
                  <Link to="#" id={order.toid} className="text-secondary" onClick={handleOffer}>{order.toid}</Link>
                )}
              </th>
              <td className="info-weight">{order.from}</td>
              <td className="info-weight">{order.to}</td>
              <td className="info-weight">{order.day}</td>
              <td className="info-weight">{(order.date && getDate(new Date(order.date))) || 'غير مرفق'}</td>
              <td className="info-weight">{order.tickets}</td>
              <td className="info-weight">{order.num_babies || '0'}</td>
              <td className="info-weight">{order.num_kids || '0'}</td>
              <td className="info-weight">{order.num_elders || '0'}</td>
              <td className="info-weight break-line">{order.notes || 'لم يتم إضافة ملاحظات'}</td>
              <td>
                {offers >= 5 ? (
                  <i className="tc font-weight-bold text-secondary">وصلت ل 5 عروض</i>
                ) : status ? (
                  <button id={order.toid} onClick={handleOffer} className="btn info-weight btn-sm btn-outline-success">إضافة عرض</button>
                ) : (
                  <i className="tc font-weight-bold text-dark">لا يستقبل عروض</i>
                )}
              </td>
            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  const LoadDeliveries = () => {
    const orders_patch = deliveriessOrders.orders && deliveriessOrders.orders.slice(0, deliveriessOrders.limit)

    return(
      <tbody>
        {orders_patch ? (orders_patch.map((order, index) => {
          let offers = order.offers;
          let status = getStatus(order.status);
          return(
            <tr className="table-light" key={index}>
              <th className="font-weight-bold" scope="row">
                {offers >= 5 ? (
                  <i className="tc text-secondary">{order.toid}</i>
                ) : (
                  <Link to="#" id={order.doid} className="text-secondary" onClick={handleOffer}>{order.doid}</Link>
                )}
              </th>
              <td className="info-weight">{getPackageType(order.package_type)}</td>
              <td className="info-weight break-line">{order.content}</td>
              <td className="info-weight">{order.from}</td>
              <td className="info-weight">{order.to}</td>
              <td className="info-weight break-line">{order.notes || 'لا توجد ملاحظات إضافية'}</td>
              <td>
              {offers >= 5 ? (
                  <i className="tc font-weight-bold text-secondary">وصلت ل 5 عروض</i>
                ) : status ? (
                  <button id={order.doid} onClick={handleOffer} className="btn info-weight btn-sm btn-outline-success">إضافة عرض</button>
                ) : (
                  <i className="tc font-weight-bold text-dark">لا يستقبل عروض</i>
                )}
              </td>
            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  const AddLimit = (e) => {
    const id = e.target.id
    if ( id === "trips" && (tripsOrders.limit < tripsOrders.orders.length)){
      let new_limit = tripsOrders.limit + 5;
      setTrips({...tripsOrders, limit: new_limit})
    }
    if ( id === "deliveries" && (deliveriessOrders.limit < deliveriessOrders.orders.length)){
      let new_limit = deliveriessOrders.limit + 5;
      setDeliveries({...deliveriessOrders, limit: new_limit})
    }
  }

  const ReduceLimit = (e) => {
    const id = e.target.id
    if ( id === "trips" && (tripsOrders.limit > 5)){
      let new_limit = tripsOrders.limit - 5;
      setTrips({...tripsOrders, limit: new_limit})
    }
    if ( id === "deliveries" && (deliveriessOrders.limit > 5)){
      let new_limit = deliveriessOrders.limit - 5;
      setDeliveries({...deliveriessOrders, limit: new_limit})
    }
  }

  if (offer.offer) {
    return <Redirect to={{
      pathname: '/admin/trips/offer',
      state: {orderID: offer.oid}
    }} />
  }

  return(
    <div className="mb-4 pb-4 ">
      {show ? (
        <div className="container text-center mt-5 pt-5">
          <span className="display-6 text-primary">
            جميع الطلبات
          </span>

          <hr/>
          <p className="font-weight-bold text-info"><i className="fa fa-star-of-life fa-xs"/> يتم عرض جميع الطلبات التي تم إضافة شركتك بها هنا</p>
          
          <div className="container mt-5">
            <span className="display-7 mb-2">طلبات الرحلات</span>
            <hr/>
            <SearchBlock  data = {dataTrips_}/>

    
              {}
            <div className="table-responsive">  
            
              <table className="table bg-grey  table-bordered mt-5">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">Order ID</th>
                  <th scope="col">مدينة الصعود</th>
                  <th scope="col">مدينة النزول</th>
                  <th scope="col">اليوم</th>
                  <th scope="col">التاريخ</th>
                  <th scope="col">عدد التذاكر</th>
                  <th scope="col">عدد الرضع</th>
                  <th scope="col">عدد الأطفال</th>
                  <th scope="col">عدد البالغين</th>
                  <th scope="col">ملاحظات إضافية</th>
                  <th scope="col">إضافة عرض</th>
                </tr>
              </thead>
              {LoadTrips()}
            </table>
            </div>
            <div className="justify-content-center">
              {(tripsOrders.orders && tripsOrders.limit < tripsOrders.orders.length) ? (<button id="trips" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {tripsOrders.limit> 5 ? (<button id="trips" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>
          </div>

          <div className="container mt-5">
            <span className="display-7 mb-2">طلبات إرسال الرسائل والطرود</span>
            <hr/>
            <SearchBlock  data = {dataDelivery_}/>
            <div className="table-responsive">  
              <table className="table bg-grey  table-bordered mt-5">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">Order ID</th>
                  <th scope="col">نوع الطرد</th>
                  <th scope="col">محتوى الطرد</th>
                  <th scope="col">مدينة المرسل</th>
                  <th scope="col">مدينة المرسل إليه</th>
                  <th scope="col">ملاحظات إضافية</th>
                  <th scope="col">إضافة عرض</th>
                </tr>
              </thead>
              {LoadDeliveries()}

            </table>

            </div>
            <div className="justify-content-center">
              {(deliveriessOrders.orders && deliveriessOrders.limit < deliveriessOrders.orders.length) ? (<button id="deliveries" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {deliveriessOrders.limit> 5 ? (<button id="deliveries" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>
          </div>
        
        </div>
    
      ) : null}
    </div>

  )

    
}
