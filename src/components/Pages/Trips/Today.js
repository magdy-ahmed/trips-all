import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
/* Main Page Image */
import homeImg from '../../../Static/Images/Home/main.png';

// Finished ...

export const TodayTrips = () => {
  const [YESATrips, setYESA] = useState({limit: 3, data: null});
  const [SAYETrips, setSAYE] = useState({limit: 3, data: null});
  const [YEYETrips, setYEYE] = useState({limit: 3, data: null});
  const [redirect, setRedirect] = useState(false);

  useEffect((YESATrips, SAYETrips, YEYETrips) => {
    fetch('/api/trips/today', {
      method: 'GET',
      headers: {
        'Content-Type': 'appication/json',
        'Accept': 'appication/json',
      }
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok) {
          setSAYE({...SAYETrips, data: data.SAYE, limit: 3})
          setYESA({...YESATrips, data: data.YESA, limit: 3})
          setYEYE({...YEYETrips, data: data.YEYE, limit: 3})
        } else {
          alert('لا يمكن الوصول للسيرفر حالياً')
        }
      })
    })
  }, [])

  const handleClick = (e) => {
    e.preventDefault();
    setRedirect(true);
  }

  const getDate = (date) => {
    let mm = date.getMonth() + 1
    let dd = date.getDate();

    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd].join('-');
  }

  const LoadYESATrips = () => {
    let trips = YESATrips.data && YESATrips.data.slice(0, YESATrips.limit)

    return(
      <tbody>
        {trips ? (trips.map((trip, index) => {
          return(
            <tr className="table-light" key={index}>
              <td><button onClick={handleClick} className="btn btn-sm btn-outline-primary">إحجز</button></td>
              <td>{ (Math.round(parseFloat(trip.price*66.76)))>0?Math.round(parseFloat(trip.price*66.76))+' ريال يمنى':''}</td>
              <td>{trip.company}</td>

              <td>{trip.from}</td>
              <td>{trip.to}</td>
              {/* <td>{trip.date && getDate(new Date(trip.date))}</td> */}
              <td>{trip.day}</td>
              <td>{trip.departure}</td>
              <td>{trip.time_ap}</td>

            </tr>
          )
        })) : null}
      </tbody>
    )

  }

  const LoadSAYETrips = () => {
    let trips = SAYETrips.data && SAYETrips.data.slice(0, SAYETrips.limit)

    return(
      <tbody>
        {trips ? (trips.map((trip, index) => {
          return(
            <tr className="table-light" key={index}>
              <td><button onClick={handleClick} className="btn btn-sm btn-outline-primary">إحجز</button></td>
              <td className="">{trip.price} ريال سعودى </td>
              <td className="">{trip.company}</td>

              <td className="">{trip.from}</td>
              <td className="">{trip.to}</td>
              {/* <td className="">{trip.date && getDate(new Date(trip.date))}</td> */}
              <td className="">{trip.day}</td>
              <td className="">{trip.departure}</td>
              <td className="">{trip.time_ap}</td>


            </tr>
          )
        })) : null}
      </tbody>
    )

  }

  const LoadYEYETrips = () => {
    let trips = YEYETrips.data && YEYETrips.data.slice(0, YEYETrips.limit)

    return(
      <tbody>
        {trips ? (trips.map((trip, index) => {
          return(
            <tr className="table-light" key={index}>
              <td><button onClick={handleClick} className="btn btn-sm btn-outline-primary">إحجز</button></td>
              <td className="">{ (Math.round(parseFloat(trip.price*66.76)))>0?Math.round(parseFloat(trip.price*66.76))+' ريال يمنى':''}</td>
              <td className="">{trip.company}</td>

              <td className="">{trip.from}</td>
              <td className="">{trip.to}</td>
              {/* <td className="">{trip.date && getDate(new Date(trip.date))}</td> */}
              <td className="">{trip.day}</td>
              <td className="">{trip.departure}</td>
              <td className="">{trip.time_ap}</td>

            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  const AddLimit = (e) => {
    let id = e.target.id;
    if (id === 'SAYE' && (SAYETrips.limit < SAYETrips.data.length)){
      let new_limit = SAYETrips.limit + 3;
      setSAYE({...SAYETrips, limit: new_limit})
    }
    if (id === 'YESA' && (YESATrips.limit < YESATrips.data.length)){
      let new_limit = YESATrips.limit + 3;
      setYESA({...YESATrips, limit: new_limit})
    }
    if (id === 'YEYE' && (YEYETrips.limit < YEYETrips.data.length)){
      let new_limit = YEYETrips.limit + 3;
      setYEYE({...YEYETrips, limit: new_limit})
    }
  }

  const ReduceLimit = (e) => {
    let id = e.target.id;
    if (id === 'SAYE' && (SAYETrips.limit > 3)){
      let new_limit = SAYETrips.limit - 3;
      setSAYE({...SAYETrips, limit: new_limit})
    }
    if (id === 'YESA' && (YESATrips.limit > 3)){
      let new_limit = YESATrips.limit - 3;
      setYESA({...YESATrips, limit: new_limit})
    }
    if (id === 'YEYE' && (YEYETrips.limit > 3)){
      let new_limit = YEYETrips.limit - 3;
      setYEYE({...YEYETrips, limit: new_limit})
    }
  }

  if (redirect) {
    return <Redirect to="/trips/order" />
  }

  return (
    <div className="mb-5 pb-5">
      
      <div className="carousel-item active" style={{backgroundImage: `url(${homeImg})`, opacity: 0.82}}>
        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">رحلات اليوم</h3>
        </div>
      </div>

      <div className="container text-center mt-4">
        <span className="display-6">أقسام الرحلات</span>
        <hr/>
        <p className="lead font-weight-bold">
          <Link className="text-primary" to="/"> جميع الرحلات </Link>|
          <Link className="text-primary" to="/trips/later"> الرحلات القادمة </Link>|
          <Link className="text-primary" to="/trips/order"> طلب حجز رحلة </Link>
        </p>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6">رحلات اليوم (من السعودية إلى اليمن)</span>
        <hr/>
        <div className="container mx-auto row mt-2">
          
          <table className="table table-responsive-sm table-hover bg-grey">
            <thead>
              <tr className="table-secondary">
                <th scope="col">للحجز</th>
                <th scope="col">السعر</th>
                <th scope="col">الشركة الناقلة</th>

                <th scope="col">مدينة الصعود</th>
                <th scope="col">مدينة النزول</th>
                {/* <th scope="col">التاريخ</th> */}
                <th scope="col">اليوم</th>
                <th scope="col">المعادرة</th>
                <th scope="col">الوصول</th>
              
              </tr>
            </thead>
            {LoadSAYETrips()}
          </table>
          
        </div>
        <div className="justify-content-center">
          {(SAYETrips.data && SAYETrips.limit < SAYETrips.data.length) ? (<button id="SAYE" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
          {SAYETrips.limit > 3 ? (<button id="SAYE" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
        </div>
         
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6">رحلات اليوم (من اليمن إلى السعودية)</span>
        <hr/>
        <div className="container mx-auto row mt-2">
          
          <table className="table table-responsive-sm table-hover bg-grey">
            <thead>
              <tr className="table-secondary">
                <th scope="col">للحجز</th>
                <th scope="col">السعر</th>
                <th scope="col">الشركة الناقلة</th>
                <th scope="col">مدينة الصعود</th>
                <th scope="col">مدينة النزول</th>
                {/* <th scope="col">التاريخ</th> */}
                <th scope="col">اليوم</th>
                <th scope="col">المغادرة</th>
                <th scope="col">الوصول</th>

              </tr>
            </thead>
            {LoadYESATrips()}
          </table>

        </div>
        <div className="justify-content-center">
          {(YESATrips.data && YESATrips.limit < YESATrips.data.length) ? (<button id="YESA" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
          {YESATrips.limit > 3 ? (<button id="YESA" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
        </div>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6">رحلات اليوم (بين المدن اليمنية)</span>
        <hr/>
        <div className="container mx-auto row mt-2">
          
          <table className="table table-responsive-sm table-hover bg-grey">
            <thead>
              <tr className="table-secondary">
                <th scope="col">للحجز</th>
                <th scope="col">السعر</th>
                <th scope="col">الشركة الناقلة</th>
                <th scope="col">مدينة الصعود</th>
                <th scope="col">مدينة النزول</th>
                {/* <th scope="col">التاريخ</th> */}
                <th scope="col">اليوم</th>
                <th scope="col">المغادرة</th>
                <th scope="col">الوصول</th>

              </tr>
            </thead>
            {LoadYEYETrips()}
          </table>
          
        </div>
        <div className="justify-content-center">
          {(YEYETrips.data && YEYETrips.limit < YEYETrips.data.length) ? (<button id="YEYE" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
          {YEYETrips.limit > 3 ? (<button id="YEYE" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
        </div>
         
      </div>

    </div>
  )
}