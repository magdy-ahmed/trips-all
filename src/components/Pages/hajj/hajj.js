import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import {Search} from "../Search"
/* Main Page Image */
import homeImg from '../../../Static/Images/Home/hajj.webp';


// Finished...

export const Hajj = () => {
  // Show Trips
  const [hajjTrips, setHajj] = useState({limit: 3, data: null});
  const [umrahTrips, setUmrah] = useState({limit: 3, data: null});
  const [redirect2, setRedirect2] = useState(false);
  const [tid, setTid] = useState(0);

  /* Show Trips Functions */ 

  useEffect((hajjTrips, umrahTrips) => {
    fetch('/api/trips', {
      method: 'GET',
      headers: {
        'Content-Type': 'appication/json',
        'Accept': 'appication/json',
      }
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok) {
          setHajj({...hajjTrips, data: data.hajj, limit: 3})
          setUmrah({...umrahTrips, data: data.umrah, limit: 3})
        } else {
          alert('لا يمكن الوصول للسيرفر حالياً')
        }
      })
    })
  }, [])

  const handleClick2 = (e) => {
    e.preventDefault();
    setTid(e.target.id);
    setRedirect2(true);
    
  }

  const getDate = (date) => {
    let mm = date.getMonth() + 1
    let dd = date.getDate();

    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd].join('-');
  }

  const LoadHajjTrips = () => {
    let trips = hajjTrips.data && hajjTrips.data.slice(0, hajjTrips.limit)

    return(
      <tbody>
        {trips ? (trips.map((trip, index) => {
          return(
            <tr className="table-light" key={index}>
              <td><button onClick={handleClick2} id={trip.tid} className="btn btn-sm btn-outline-primary">إحجز</button></td>
              <td>{ (Math.round(parseFloat(trip.price*66.76)))>0?Math.round(parseFloat(trip.price*66.76))+' ريال يمنى':''}</td>
              <td className="">{trip.duration}</td>
              <td className="">{trip.from}</td>
              <td className="">{trip.to}</td>

              <td>{trip.company}</td>
              <td className="">{(trip.type=='hajj')?'حج':'عمرة'}</td>

              <td className="">{trip.date}</td>
              <td className="">{trip.transport}</td>
              <td className="">{trip.urlDetails}</td>
            </tr>
          )
        })) : null}
      </tbody>
    )

  }

  const LoadUmrahTrips = () => {
    let trips = umrahTrips.data && umrahTrips.data.slice(0, umrahTrips.limit)

    return(
      <tbody>
        {trips ? (trips.map((trip, index) => {
          return(
            <tr className="table-light" key={index}>
              <td><button onClick={handleClick2} id={trip.tid} className="btn btn-sm btn-outline-primary">إحجز</button></td>
              <td>{ (Math.round(parseFloat(trip.price*66.76)))>0?Math.round(parseFloat(trip.price*66.76))+' ريال يمنى':''}</td>
              <td className="">{trip.duration}</td>

              <td className="">{trip.from}</td>
              <td className="">{trip.to}</td>
              <td className="">{trip.company}</td>
              <td className="">{(trip.type=='hajj')?'حج':'عمرة'}</td>

              <td className="">{trip.date}</td>
              <td className="">{trip.transport}</td>
              <td className="">{trip.urlDetails}</td>
            </tr>
          )
        })) : null}
      </tbody>
    )

  }


  const AddLimit = (e) => {
    let id = e.target.id;
    if (id === 'hajj' && (hajjTrips.limit < hajjTrips.data.length)){
      let new_limit = hajjTrips.limit + 3;
      setHajj({...hajjTrips, limit: new_limit})
    }
    if (id === 'umrah' && (umrahTrips.limit < umrahTrips.data.length)){
      let new_limit = umrahTrips.limit + 3;
      setUmrah({...umrahTrips, limit: new_limit})
    }

  }

  const ReduceLimit = (e) => {
    let id = e.target.id;
    if (id === 'hajj' && (hajjTrips.limit > 3)){
      let new_limit = hajjTrips.limit - 3;
      setHajj({...hajjTrips, limit: new_limit})
    }
    if (id === 'umrah' && (umrahTrips.limit > 3)){
      let new_limit = umrahTrips.limit - 3;
      setUmrah({...umrahTrips, limit: new_limit})
    }

  }

  /* Show Trips Functions */

  if (redirect2) {
    return <Redirect to={'/hajj-order/'+tid} />
    
  }else{
    localStorage.setItem('trp_id',0)
  }

  return (
    <div className="mb-5 pb-5">
      {/* style={{backgroundImage: `url(${homeImg})`, opacity: 0.82}} */}
      <div className="carousel-item active"style={{backgroundImage: `url(${homeImg})`, opacity: 0.82}} >

        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">الصفحة الرئيسية</h3>
          
        </div>
      </div>

      <div className="container text-center mt-4">
        <span className="display-6">أقسام الرحلات</span>
        <hr/>
        <p className="lead font-weight-bold">
          <Link className="text-primary" to="/trips/today"> رحلات اليوم </Link>|
          <Link className="text-primary" to="/trips/later"> الرحلات القادمة </Link>|
          <Link className="text-primary" to="/trips/order"> طلب حجز رحلة </Link>
        </p>
      </div>

  
        {/* <Search home={true}/> */}
      <div className="container text-center ">
        <span className="display-6">جميع برامج الحج</span>
        <hr/>
        <div className="container mx-auto row mt-2">
          
          <table className="table table-responsive-sm table-hover bg-grey">
            <thead>
              <tr className="table-secondary">
                <th className="table-secondary" scope="col">للحجز</th>
                <th className="table-secondary" scope="col">السعر</th>
                <th className="table-secondary" scope="col">المدة</th>

                <th className="table-secondary" scope="col">مدينة الصعود</th>
                <th className="table-secondary" scope="col">مدينة الوصول</th>
                <th className="table-secondary" scope="col">الشركة الناقلة</th>

                <th className="table-secondary"  scope="col"> النوع</th>
                <th className="table-secondary" scope="col"> التاريخ</th>
                <th className="table-secondary" scope="col">النقل</th>
                <th className="table-secondary" scope="col">رابط التفاصيل</th>

              </tr>
            </thead>
            {LoadHajjTrips()}
          </table>
          
        </div>
        <div className="justify-content-center">
            {(hajjTrips.data && hajjTrips.limit < hajjTrips.data.length) ? (<button id="SAYE" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
            {hajjTrips.limit > 3 ? (<button id="hajj" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
        </div>
         
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6">جميع برامج العمرة</span>
        <hr/>
        <div className="container mx-auto row mt-2">
          
          <table className="table table-responsive-sm table-hover bg-grey">
            <thead>
              <tr className="table-secondary">
              <th className="table-secondary" scope="col">للحجز</th>
                <th className="table-secondary" scope="col">السعر</th>
                <th className="table-secondary" scope="col">المدة</th>
                <th className="table-secondary" scope="col">مدينة الصعود</th>
                <th className="table-secondary" scope="col">مدينة الوصول</th>

                <th className="table-secondary" scope="col">الشركة الناقلة</th>
                <th className="table-secondary"  scope="col"> النوع</th>
                <th className="table-secondary" scope="col"> التاريخ</th>
                <th className="table-secondary" scope="col">النقل</th>
                <th className="table-secondary" scope="col">رابط التفاصيل</th>

              </tr>

            </thead>
            {LoadUmrahTrips()}
          </table>

        </div>
        <div className="justify-content-center">
            {(umrahTrips.data && umrahTrips.limit < umrahTrips.data.length) ? (<button id="umrah" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
            {umrahTrips.limit > 3 ? (<button id="umrah" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
        </div>
      </div>

      
    </div>
    
  )
}