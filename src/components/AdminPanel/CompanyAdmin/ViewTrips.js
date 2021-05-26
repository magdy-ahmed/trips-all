import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Search from '../TripsAdmin/search'
import SearchBlock from '../TripsAdmin/Search-block2'


export const AllTrips = () => {
  //const cookies = new Cookies();

  const [trips, setTrips] = useState({trips: null, limit: 10})
  const [status, setStatus] = useState({});
  const [handleShow, setHandleShow] = useState({});
  // User Authentication
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);

  // Update Modal
  const [isUpdate, setUpdateModal] = useState(false)
  const [updateState, setUpdateState] = useState({});
  const [day, setDay] = useState();
  const [company, setCompany] = useState();
  const [modalError, setModalError] = useState({});
  const [dataTrips_, setDataTrips_] = useState([{

    id:1,
    chkId:'idto',
    name:'Trip Id',
},{
    id:2,
    chkId:'company',
    name:'الشركة الناقلة',
},{
  id:3,
  chkId:'direction',
  name:'أتجاة الرحلة',
},{
    id:4,
    chkId:'from',
    name:'مدينة الصعود',
},{
    id:5,
    chkId:'to',
    name:'مدينة النزول',
},{
    id:6,
    chkId:'date',
    name:'التاريخ',
},{
    id:7,
    chkId:'day',
    name:'اليوم',
},{
    id:8,
    chkId:'time',
    name:'الوقت',
}])
const fildsTrips = dataTrips_.map(column=><Search key={column.id} column={column}/>)

  useEffect((trips) => {
    const searchtrips = localStorage.getItem('search')
    const datatrips = {'search':'','idto':'','company':'',
'from':'','to':'','date':'','time':'','day':'',
'salery':'','select':''}
datatrips['search'] = searchtrips
    for (let key in datatrips){
      if (localStorage.getItem(key)!='false'){
        datatrips[key] = searchtrips
      }
    }
    if (localStorage.getItem('select')=='false'){
      datatrips['select'] = true
    
    }
    const jwt = localStorage.yemenbus_user_jwt ;
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({jwt: jwt, permission: 'tripcompany_access'})
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setCompany(data.company);
          setShow(true)
        } else {
          setFailed(true);
        }
      })
    })
    
    fetch('/api/search/trips/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },body:JSON.stringify(datatrips)

    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setTrips({trips: data.trips, limit: 10})
        }
      })
    });
  }, []);

  

  if (failed){
    return <Redirect to="/unauthorized"/>
  }

  const getStatus = (status)  => {
    const types = {
      'show': ['مفعل', 'text-success'],
      'hide': ['غير مفعل', 'text-danger']
    }
    return (types[status])
  }

  const getType = (type) => {
    const types = {
      'SAYE': 'السعودية إلى اليمن',
      'YESA': 'اليمن إلى السعودية',
      'YEYE': 'بين مدن اليمن'
    }
    
    return (types[type])
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateStatuses = async() => {
      await fetch('/api/trips/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(status)
      }).then(resp => {
        resp.json().then(_ => {
          if (resp.ok) {
            window.location.reload()
          }
        })
      })
    }

    updateStatuses();
  }
  const handleTrips = (e) =>{
    setHandleShow(e.target.id)
  }
  const handleSwitch = (e) => {

    // Change Color Of Select Element.
    let el = document.getElementById(e.target.id);
    if (e.target.value === 'show') {
      el.className = "custom-select font-weight-bold text-success"
    } else if (e.target.value === 'hide') {
      el.className = "custom-select font-weight-bold text-warning"
    } else if (e.target.value === 'delete') {
      el.className = "custom-select font-weight-bold text-danger"
    } else {
      el.className = "custom-select font-weight-bold"
    }

    if (e.target.value){
      setStatus({...status, [e.target.id]: e.target.value});
    } else {
      let currentStatus = status;
      delete currentStatus[e.target.id];
      setStatus(currentStatus);
    }
  }

  const StatusSwitch = (tid) => {
    return(
      <select onChange={handleSwitch} id={tid} className="custom-select font-weight-bold">
        <option value="" className="text-dark" defaultValue>إختر الحالة</option>
        <option value="show" className="text-success font-weight-bold">تفعيل</option>
        <option value="hide" className="text-warning font-weight-bold">إلغاء تفعيل</option>
        <option value="delete" className="text-danger font-weight-bold">حذف</option>
      </select>
    )
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
          let tripType = getType(trip.type);
          return(
            <tr className="table-light" key={index}>
              <th className="font-weight-bold">{trip.tid}</th>
              <td className="info-weight">{trip.company}</td>
              <td className="info-weight">{tripType}</td>
              <td className="info-weight">{trip.from}</td>
              <td className="info-weight">{trip.to}</td>
              <td className="info-weight">{trip.day}</td>
              <td className="info-weight">{trip.departure}</td>
              <td className="info-weight">{trip.time_ap}</td>

              {
                trip.type === 'SAYE' ? (
                  <td className="info-weight">{Math.round(parseFloat(trip.price)) || 0} ريال سعودي</td>
                ) : (
                  <td className="info-weight">{Math.round(parseFloat(trip.price*66.76)) || 0} ريال يمني</td>
                )
              }
              {
                trip.type === 'SAYE' ? (
                  <td className="info-weight">{Math.round(parseFloat(trip.price_children)) || 0} ريال سعودي</td>
                ) : (
                  <td className="info-weight">{Math.round(parseFloat(trip.price_children*66.76)) || 0} ريال يمني</td>
                )
              }
              {
                trip.type === 'SAYE' ? (
                  <td className="info-weight">{Math.round(parseFloat(trip.price_babies)) || 0} ريال سعودي</td>
                ) : (
                  <td className="info-weight">{Math.round(parseFloat(trip.price_babies*66.76)) || 0} ريال يمني</td>
                )
              }
              <td className={"font-weight-bold " + status[1]}>{status[0]}</td>
              <td className="font-weight-bold">{StatusSwitch(trip.tid)}</td>
              <td className="font-weight-bold">
                <button onClick={() => {setUpdateModal(true); setUpdateState(trip)}} className="btn btn-sm btn-outline-dark">تعديل</button>
              </td>
            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  /* Update Trip */

  const resetUpdate = () => {

    // Reset Update Modal & State
    setUpdateModal(false);
    setUpdateState({});
  }

  const handleType = (e) => {
    // Reset State
    setUpdateState({
      type: e.target.value,
      tid: updateState.tid,
      time_ap: updateState.time_ap,
      day: updateState.day,
      departure: updateState.departure,
      price: updateState.price || 0,
      company: updateState.company,
      price_babies: updateState.price_babies || 0,
      price_children: updateState.price_children || 0,
    })
    // Clear Forms
    const TripForm = document.TripForms;
    TripForm && TripForm.reset();
  }

  const handleEditChange = (e) => {
    e.preventDefault();

    if (e.target.id === 'date') {
      var date = new Date(e.target.value);
      var index = date.getDay();
      var value = weekdays[index] && weekdays[index].name
      setDay(value);
      setUpdateState({...updateState, [e.target.id]: e.target.value, day: value})
    } else {
      setUpdateState({...updateState, [e.target.id]: e.target.value});
    }
  }

  const handleEditSubmit = async(e) => {
    e.preventDefault();
    await fetch(`/api/trips/${updateState.tid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(updateState)
    }).then(resp => {
      resp.json().then(_ => {
        if (resp.ok) {
          setUpdateModal(false);
          window.location.reload()
        } else {
          setModalError({
            update: {
              name: 'تعديل رحلة',
              error: 'حدث خطأ ما, لا يمكن تعديل الرحلة',
            }
          })
        }
      })
    })
  }
   
  const handleChange = (e) => {
    e.preventDefault();
    
    localStorage.setItem('search', e.target.value);
  }

  // Func
  const weekdays = [
    {name: 'الأحد', value: 'Sunday'},
    {name: 'الإثنين', value: 'Monday'},
    {name: 'الثلاثاء', value: 'Tuesday'},
    {name: 'الأربعاء', value: 'Wednesday'},
    {name: 'الخميس', value: 'Thursday'},
    {name: 'الجمعة', value: 'Friday'},
    {name: 'السبت', value: 'Saturday'},
  ]

  const SAcities = [
    'جدة',
    'مكة',
    'الرياض',
    'الدمام',
    'الطوال',
    'جيزان',
    'شرورة',
    'وادي الدواسر'
  ]

  const YEcities = [
    "صنعاء",
    "عدن",
    "تعز",
    "الحديدة",
    "مارب",
    "ذمار",
    "اب",
    "المكلا",
    "عفار",
    "البيضاء",
    "رداع",
    "الجراجي",
    "زبيد",
    "عتق",
    "الغيظة",
    "سئؤن",
    "باجل",
    "حجة",
    "صعدة",
    "شبوة",
    "الضحي",
    "لحج"
  ]

  const Companies = [
    "يمن باص",
    "البركة",
    "النور",
    "اعتماد",
    "الأفضل",
    "أبو سرهد",
    "النورس",
    "راحة",
    "السراج",
    "البراق",
    "بن معمر",
    "النصر",
    "المتحدة",
    "النقل الجماعي",
    "راحة سفر",
    "العربي",
    "العربية",
    "الأولى",
    "المسافر العربي",
    "الإمبرطور",
    "آسيا"
  ]

  const tripForm = () => {
    
    const dayInput = () => {
      if (updateState.date) {
        return (
          <input readOnly type="text" id="day" defaultValue={updateState.day} value={day} className="form-control"/>
        )
      } else {
        return (
          <select onChange={handleEditChange} defaultValue={updateState.day} required id="day" className="custom-select">
            <option value="">* اليوم</option>
            <option value="كل يوم" className="">كل يوم</option>
            {weekdays ? (weekdays.map((day, index) => {
              return(<option value={day.name} key={index}>{day.name}</option>)
            })) : null}
          </select>
        )
      }
    }
  
    const companyInput = () => {
      return(
        <div className="input-group">
          {company === 'All' ? (
            <select onChange={handleEditChange} defaultValue={updateState.company} required id="company" className="custom-select">
              {Companies ? (Companies.map((company, index) => {
                return(<option value={company} key={index}>{company}</option>)
              })) : null}
            </select>
          ) : (
            <input type="text" disabled value={company} className="form-control"/>
          )}
        </div>
      )
    }
  
    const Common = (
      <div>

        <label htmlFor="company" className="mt-3 font-weight-bold">الشركة الناقلة : </label>
        <div className="form-inline">
          {companyInput()}
        </div>
        
        <label htmlFor="date&day" className="mt-3 font-weight-bold">اليوم  : </label>
        <div className="form-inline">
          {/* {
            updateState.day === 'كل يوم' ? (
              <div className="input-group">
                <input readOnly onChange={handleEditChange} type="text" placeholder="كل يوم" id="date" className="form-control"/>
              </div>
            ) : (
              <div className="input-group">
                <input onChange={handleEditChange} type="text" onFocus={(e) => {e.target.type='date'}} value={ updateState.date ? getDate(new Date(updateState.date)) : null} id="date" placeholder="* التاريخ" className="form-control"/>
              </div>
            )
          } */}

          <div className="input-group pt-special mr-md-2">
            {dayInput()}
          </div>
        </div>

        <label htmlFor="departure" className="mt-3 font-weight-bold">وقت الإنطلاق : </label>

        <div className="form-inline">

          <div className="input-group pt-special">
            <input onChange={handleEditChange} type="text" onFocus={(e) => {e.target.type='time'}} value={updateState.departure ? updateState.departure : ''} id="departure" placeholder="* وقت الأنطلاق" className="form-control"/>
          </div>

        </div>
        <label htmlFor="time_ap" className="mt-3 font-weight-bold">وقت الوصول : </label>

        <div className="form-inline">

          <div className="input-group pt-special">
            <input onChange={handleEditChange} type="text" onFocus={(e) => {e.target.type='time'}} value={updateState.time_ap ? updateState.time_ap : ''} id="time_ap" placeholder="* وقت الوصول" className="form-control"/>
          </div>

        </div>
        
        
        {
          updateState.type === 'SAYE' ? (
            <label htmlFor="price" className="mt-3 font-weight-bold">السعر للكبار (ريال سعودي): </label>
          ) : (
            <label htmlFor="price" className="mt-3 font-weight-bold">السعر للكبار (ريال يمني): </label>
          )
        }
        <div className="form-inline">
  
          <div className="input-group">
            {
              updateState.type === 'SAYE' ? (
                <input required onChange={handleEditChange} defaultValue={Math.round(parseFloat(updateState.price)) || 0} type="text" id="price" placeholder="* السعر (بالريال السعودي)" inputMode="numeric" className="form-control"/>
                ) : (
                <input required onChange={handleEditChange} defaultValue={Math.round(parseFloat(updateState.price * 66.76))} type="text" id="price" placeholder="* السعر (بالريال اليمني)" inputMode="numeric" className="form-control"/>
              )
            }
          </div>
  
        </div>
        {
          updateState.type === 'SAYE' ? (
            <label htmlFor="price_children" className="mt-3 font-weight-bold">السعر للأطفال (ريال سعودي): </label>
          ) : (
            <label htmlFor="price_children" className="mt-3 font-weight-bold">السعر للأطفال (ريال يمني): </label>
          )
        }
        <div className="form-inline">
  
          <div className="input-group">
            {
              updateState.type === 'SAYE' ? (
                <input required onChange={handleEditChange} defaultValue={Math.round(parseFloat(updateState.price_children)) || 0} type="text" id="price_children" placeholder="* السعر (بالريال السعودي)" inputMode="numeric" className="form-control"/>
                ) : (
                <input required onChange={handleEditChange} defaultValue={Math.round(parseFloat(updateState.price_children * 66.76))} type="text" id="price_children" placeholder="* السعر (بالريال اليمني)" inputMode="numeric" className="form-control"/>
              )
            }
          </div>
  
        </div>
        {
          updateState.type === 'SAYE' ? (
            <label htmlFor="price_babies" className="mt-3 font-weight-bold">السعر للرضع (ريال سعودي): </label>
          ) : (
            <label htmlFor="price_babies" className="mt-3 font-weight-bold">السعر للرضع (ريال يمني): </label>
          )
        }
        <div className="form-inline">
  
          <div className="input-group">
            {
              updateState.type === 'SAYE' ? (
                <input required onChange={handleEditChange} defaultValue={Math.round(parseFloat(updateState.price_babies)) || 0} type="text" id="price_babies" placeholder="* السعر (بالريال السعودي)" inputMode="numeric" className="form-control"/>
                ) : (
                <input required onChange={handleEditChange} defaultValue={Math.round(parseFloat(updateState.price_babies * 66.76))} type="text" id="price_babies" placeholder="* السعر (بالريال اليمني)" inputMode="numeric" className="form-control"/>
              )
            }
          </div>
  
        </div>
      </div>
    )
  
    const SAYE = (
      <div>
        
        <label htmlFor="from&to" className="mt-3 font-weight-bold">مدينة الصعود/مدينة النزول : </label>
        <div className="form-inline">
          <div className="input-group">
            <select required defaultValue={updateState.from} onChange={handleEditChange} id="from" className="custom-select">
              <option value="">مدن السعودية (مِن)</option>
              {SAcities ? (SAcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>
  
          <div className="input-group pt-special mr-md-2">
            <select required defaultValue={updateState.to} onChange={handleEditChange} id="to" className="custom-select">
              <option value="">مدن اليمن (إلى)</option>
              {YEcities ? (YEcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>
        </div>
  
        {Common}
      </div>
    )
  
    const YESA = (
      <div>
        <label htmlFor="from&to" className="mt-3 font-weight-bold">مدينة الصعود/مدينة النزول : </label>
        <div className="form-inline">

          <div className="input-group">
            <select required onChange={handleEditChange} defaultValue={updateState.from} id="from" className="custom-select">
              <option value="">مدن اليمن (مِن)</option>
              {YEcities ? (YEcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>

          <div className="input-group pt-special mr-md-2">
            <select required onChange={handleEditChange} defaultValue={updateState.to} id="to" className="custom-select">
              <option value="">مدن السعودية (إلى)</option>
              {SAcities ? (SAcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>
        </div>
  
        {Common}
      </div>
    )
  
    const YEYE = (
      <div>

        <label htmlFor="from&to" className="mt-3 font-weight-bold">مدينة الصعود/مدينة النزول : </label>
        <div className="form-inline">
          <div className="input-group">
            <select required onChange={handleEditChange} defaultValue={updateState.from} id="from" className="custom-select">
              <option value="">مدن اليمن (مِن)</option>
              {YEcities ? (YEcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>

          <div className="input-group pt-special mr-md-2">
            <select required onChange={handleEditChange} defaultValue={updateState.to} id="to" className="custom-select">
              <option value="">مدن اليمن (إلى)</option>
              {YEcities ? (YEcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>
        </div>
  
        {Common}
      </div>
    )

    if (updateState.type === 'SAYE'){return SAYE}
    if (updateState.type === 'YESA'){return YESA}
    if (updateState.type === 'YEYE'){return YEYE}
  }

  /* Update Trip */

  const AddLimit = (e) => {
    if ((trips.limit < trips.trips.length)){
      let new_limit = trips.limit + 10;
      setTrips({...trips, limit: new_limit})
    }
  }

  const ReduceLimit = (e) => {
    let new_limit = trips.limit - 10;
    if ((trips.limit > 10)){
      setTrips({...trips, limit: new_limit})
    }

    // Delete Hidden Trips Status Changes.
    let tripsStatus = Object.entries(status);
    let shownTrips = trips.trips && trips.trips.slice(0, new_limit)

    tripsStatus && tripsStatus.map(key => {
      let trip = shownTrips.find(t => t.tid === key[0]);
      if (!trip) {
        let currentStatus = status;
        delete currentStatus[key[0]]
        setStatus(currentStatus);
      }
    })
  }

  const loadModalErrors = () => {
    if (Object.keys(modalError).length !== 0 && modalError.constructor === Object){
      return (
        <div className="alert alert-danger text-right">
          {modalError ? Object.entries(modalError).map((e, id) => {
            return (
              <p className="font-weight-bold" key={id}>
                {e[1].name} : {e[1].error}
              </p>
            )
          }): null}
        </div>
      )
    }
  }

  return(
    <div className="mb-4 pb-4 ">
      {show ? (
        <div className="container text-center mt-5 pt-5">
          <span className="display-6 text-primary">
            جميع الرحلات
          </span>

          <hr/>
          <SearchBlock  data = {dataTrips_}/>

          <p className="font-weight-bold text-info"><i className="fa fa-star-of-life fa-xs"/> يتم عرض جميع الرحلات هنا</p>
          
          <div className="container mt-5">

         <span className="display-7 mb-2 mr-3  "  aria-current="page">الرحلات </span>

            <hr/>

 
            <div className="table-responsive">
              <table name="TripsTable" className="table  bg-grey mt-5">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">Trip ID</th>
                  <th scope="col">الشركة الناقلة</th>
                  <th scope="col">إتجاه الرحلة</th>
                  <th scope="col">مدينة الصعود</th>
                  <th scope="col">مدينة النزول</th>
                  
                  <th scope="col">اليوم</th>
                  <th scope="col">وقت المغادرة</th>
                  <th scope="col">وقت الوصول</th>
                  <th scope="col">السعر</th>
                  <th scope="col"> السعر للأطفال</th>
                  <th scope="col">السعر للرضع</th>
                  <th scope="col">الحالة</th>
                  <th scope="col">تغيير الحالة</th>
                  <th scope="col">تعديل</th>
                </tr>
              </thead>
              {LoadTrips()}
            </table>
            </div>

            <div className="justify-content-center">
              {(trips.trips && trips.limit < trips.trips.length) ? (<button onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              <button onClick={handleSubmit} className="btn btn-sm btn-outline-primary">تغيير الحالات</button>
              {trips.limit> 10 ? (<button onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>

          </div>
        </div>
    
      ) : null}

      {/* Update Trip Modal */}
      <Modal show={isUpdate} onHide={resetUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>تعديل الرحلات</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <div>

          <div className="container mt-4">
            {loadModalErrors()}
          </div>
            
          <div className="container text-right mr-md-4">
            <p className="font-weight-bold text-primary">تعديل الرحلة رقم {updateState.tid}# : </p>
          </div>

          <div className="mt-3 text-right">
            <label htmlFor="type" className="mt-3 font-weight-bold">إتجاه الرحلة : </label>
            <div className="form-inline">
              <div className="input-group">
                <select onChange={handleType} defaultValue={updateState.type} id="type" className="custom-select">
                  <option value="SAYE">من السعودية إلى اليمن</option>
                  <option value="YESA">من اليمن إلى السعودية</option>
                  <option value="YEYE">بين مدن اليمن</option>
                </select>
              </div>
            </div>

            <form onSubmit={handleEditSubmit} name="TripForms">
              {tripForm()}
              <Modal.Footer className="mt-4">
                <Button variant="grey" onClick={resetUpdate}>
                  إلغاء
                </Button>
                <Button variant="secondary" type="submit">
                  تأكيد التعديلات
                </Button>
              </Modal.Footer>
            </form>

          </div>


        </div>  
    
        </Modal.Body>
      </Modal>
      
    </div>
  )
}