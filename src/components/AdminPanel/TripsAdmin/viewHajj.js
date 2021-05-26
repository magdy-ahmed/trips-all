import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SearchBlock from './Search-block2'



//import {Cookies} from 'react-cookie';;


export const MyTripsHajj = (props) => {
  //const cookies = new Cookies();
  const currentState = props.location.state;
  const flash = currentState && currentState.flash;
  const [trips, setTrips] = useState({trips: null, company: null, limit: 10})

  // User Authentication
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);
  const [dataTrips_, setDataTrips_] = useState([{
    id:1,
    chkId:'idto',
    name:'Trip Id',
},{
    id:2,
    chkId:'company',
    name:'الشركة ',
},{
    id:3,
    chkId:'from',
    name:'مدينة الصعود',
},{
    id:5,
    chkId:'date',
    name:'التاريخ',
},{
    id:6,
    chkId:'',
    name:'المدة',
},{
    id:7,
    chkId:'transport',
    name:'وسيلة الأنتفال',
}])

  // User Authentication + Content Loading
  useEffect((trips) => {
    const searchtrips = localStorage.getItem('search')
    const datatrips = {'search':'','idto':'','company':'',
'from':'','to':'','date':'','time':'','day':'',
'salery':'','status':'','select':''}
    datatrips['search'] = searchtrips
    for (let key in datatrips){
      if (localStorage.getItem(key)!='false'){
        datatrips[key] = searchtrips
      }
    }
    if (localStorage.getItem('select')=='false'){
      datatrips['select'] = true
    
    }
    // User Authentication
    const jwt = localStorage.yemenbus_user_jwt ;
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
    // Content Loading
    fetch('/api/search/trips/company', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify(datatrips)
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setTrips({trips: data.trips, company: data.company, limit: 10})
        }
      })
    });
  }, []);

  

  if (failed){
    return <Redirect to="/unauthorized"/>
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
  }
  const handleChange = (e) => {
    e.preventDefault();
    
    localStorage.setItem('search', e.target.value);
  }

  const getStatus = (status)  => {
    const types = {
      'show': ['مفعل', 'text-success'],
      'hide': ['غير مفعل', 'text-danger']
    }
    return (types[status])
  }

  const getDate = (date) => {
    let mm = date.getMonth() + 1
    let dd = date.getDate();

    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd].join('-');
  }

  const LoadTrips = () => {
    const trips_patch = trips.trips && trips.trips.slice(0, trips.limit)

    return(
      <tbody>
        {trips_patch ? (trips_patch.map((trip, index) => {
          let status = getStatus(trip.status);
          return(
            <tr className="table-light" key={index}>
              <th className="font-weight-bold">{trip.tid}</th>
              <td className="info-weight">{trip.company}</td>
              <td className="info-weight">{trip.from}</td>
              <td className="info-weight">{trip.transport}</td>
              
              <td className="info-weight">{trip.date}</td>
              <td className="info-weight">{trip.duration}</td>
              <td className="info-weight">{trip.type}</td>
              {
                trip.type === 'SAYE' ? (
                  <td className="info-weight">{Math.round(parseFloat(trip.price)) || 0} ريال سعودي</td>
                ) : (
                  <td className="info-weight">{Math.round(parseFloat(trip.price*66.76)) || 0} ريال يمني</td>
                )
              }
              <td className={"font-weight-bold " + status[1]}>{status[0]}</td>
              <td className="info-weight"><a href={trip.urlDetails}>{trip.urlDetails}</a></td>
            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  const AddLimit = (e) => {
    if ((trips.limit < trips.trips.length)){
      let new_limit = trips.limit + 10;
      setTrips({...trips, limit: new_limit})
    }
  }

  const ReduceLimit = (e) => {
    if ((trips.limit > 10)){
      let new_limit = trips.limit - 10;
      setTrips({...trips, limit: new_limit})
    }
  }

  return(
    <div className="mb-4 pb-4 ">
      {show ? (
        <div className="container text-center mt-5 pt-5">
          <span className="display-6 text-primary">
            برامجى حج و عمرة
          </span>

          <hr/>
          <p className="font-weight-bold text-info"><i className="fa fa-star-of-life fa-xs"/> يتم عرض جميع الرحلات الخاصة بشركتك هنا</p>
          
          {flash ? (
            <div className={`mt-4 alert ${flash.type} text-right`}>
              <p>{flash.name} : {flash.message}</p>
            </div>
          ) : null}

          <div className="container mt-5">
            <span className="display-7 mb-2">برامج ( {trips.company} )</span>
            <hr/>
            <SearchBlock  data = {dataTrips_}/>

            <div className="table-responsive">  
              <table name="TripsTable" className="table bg-grey  table-bordered mt-5">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">Trip ID</th>
                  <th scope="col">الشركة الناقلة</th>
                  <th scope="col">مدينة الصعود</th>
                  <th scope="col">الأنتقال</th>
                  <th scope="col">التاريخ</th>
                  <th scope="col">المدة</th>
                  <th scope="col">النوع</th>
                  <th scope="col">السعر</th>
                  <th scope="col">الحالة</th>
                </tr>
              </thead>
              {LoadTrips()}
            </table>
            </div>
            <div className="justify-content-center">
              {(trips.trips && trips.limit < trips.trips.length) ? (<button onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {trips.limit> 10 ? (<button onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>
          </div>
        </div>
    
      ) : null}
    </div>
  )
}