import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
//import {Cookies} from 'react-cookie';;



export const AddTrip = () => {
  //const cookies = new Cookies();

  const [state, setState] = useState({type: null})
  const [day, setDay] = useState();

  const [_time_ap, setTimeAp] = useState();

  const [completed, setCompleted] = useState({completed: false, flash: null,hajj:false})

  const [company, setCompany] = useState();

  // User Authentication
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const jwt = localStorage.yemenbus_user_jwt ;
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({jwt: jwt, permission: 'trip_access'})
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setCompany(data.company)
          setShow(true)
        } else {
          setFailed(true);
        }
      })
    })
  }, [])

  

  if (failed){
    return <Redirect to="/unauthorized"/>
  }

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
  const transport = [
    'نقل برى',
    'نقل جوى',
    'نقل بحرى',

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

  /* Handle Type Switch */
  const handleType = (e) => {
    // Reset State
    setState({type: e.target.value})
    // Clear Forms
    const TripForm = document.TripForms;
    TripForm && TripForm.reset();
  }

  /* Handle Change */
  const handleChange = (e) => {
    e.preventDefault();
    
    
    if (e.target.id === 'date') {
      var date = new Date(e.target.value);
      var index = date.getDay();
      var value = weekdays[index] && weekdays[index].name
      setDay(value);
      setState({...state, [e.target.id]: e.target.value, day: value})
      // setState({...state, day: day, [e.target.id]: e.target.value});
      // document.getElementById('day').value = weekdays[index].name;
    } else {
      setState({...state, [e.target.id]: e.target.value});
    }
  }

  /* Handle Submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    const AddTrip = async() => {
      await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(state)
      }).then(resp => {
        resp.json().then(data => {
          if (resp.ok) {
            setCompleted({
              completed: true,
              hajj:false,
              flash: {
                name: 'إضافة رحلة',
                message: `تم إضافة الرحلة بنجاح, رقم الرحلة #${data.tid}`,
                type: 'alert-success'
              }
            })
          } else {
            setCompleted({
              completed: true,
              hajj:false,
              flash: {
                name: 'إضافة رحلة',
                message: 'حدث خطأ ما, لم يتم إضافة الرحلة',
                type: 'alert-warning'
              }
            })
          }
        })
      })
    }
    AddTrip();
  } 
  const submitHajj = (e) => {
    e.preventDefault();
    const AddTrip = async() => {
      await fetch('/api/hajj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(state)
      }).then(resp => {
        resp.json().then(data => {
          if (resp.ok) {
            setCompleted({
              completed: false,
              hajj:true,
              flash: {
                name: 'إضافة برنامج',
                message: `تم إضافة البرنامج بنجاح, رقم البرنامج #${data.tid}`,
                type: 'alert-success'
              }
            })
          } else {
            setCompleted({
              completed: false,
              hajj:true,
              flash: {
                name: 'إضافة رحلة',
                message: 'حدث خطأ ما, لم يتم إضافة الرحلة',
                type: 'alert-warning'
              }
            })
          }
        })
      })
    }
    AddTrip();
  } 

  const tripForm = () => {

    const dayInput = () => {
      if (state.date) {
        return (
          <input readOnly type="text" id="day" value={day} className="form-control"/>
        )
      } else {
        return (
          <select onChange={handleChange} required id="day" className="custom-select">
            <option value="" defaultValue>* اليوم</option>
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
            <select onChange={handleChange} required id="company" className="custom-select">
              <option value="" defaultValue>* شركة النقل</option>
              {Companies ? (Companies.map((comp, index) => {
                return(<option value={comp} key={index}>{comp}</option>)
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
        
        <div className="form-inline mt-4">
          <label htmlFor="company" className="ml-sm-4"/>
          {companyInput()}
        </div>
      
        {/* <div className="form-inline mt-4">
          <label htmlFor="price" className="ml-sm-4"/>
          <div className="input-group">
              <input type="number" min="0" placeholder="* السعر (بالريال)" className="form-control num-input"/>
              <i className="text-muted mt-1 mr-2">ريال سعودي</i>
          </div>
        </div> */}
        
        <div className="form-inline mt-4">
            {/* <label htmlFor="date" className="ml-sm-4"/> */}
            {/* <div className="input-group">
              <input onChange={handleChange} type="text" onFocus={(e) => {e.target.type='date'}} value={state.date ? state.date : ''} id="date" placeholder="* التاريخ" className="form-control"/>
            </div> */}

            <label htmlFor="day" className="ml-sm-4"/>
            <div className="input-group pt-special">
              {dayInput()}
            </div>
            

            <label htmlFor="departure" className="ml-sm-4"/>
            <div className="input-group pt-special">
              <input required onChange={handleChange} type="text" onFocus={(e) => {e.target.type='time'}} value={state.departure ? state.departure : ''} id="departure" placeholder="وقت الأقلاع" className="form-control"/>
            </div>
            <label htmlFor="time_ap" className="ml-sm-4"/>
            <div className="input-group pt-special">
              <input required onChange={handleChange} type="text" onFocus={(e) => {e.target.type='time'}} value={state.departure ? state.time_ap : ''} id="time_ap" placeholder="* وقت الوصول" className="form-control"/>
            </div>
        </div>
        
        <div className="form-inline mt-4">

          <label htmlFor="price" className="ml-sm-4"/>
          <div className="input-group">
            {
              state.type === 'SAYE' ? (
                <div>
                    <input required onChange={handleChange} type="text" id="price" placeholder="* السعر للكبار (بالريال السعودي)" inputMode="numeric" className="form-control"/>
                    <input required onChange={handleChange} type="text" id="price_c" placeholder="* السعر للأطفال (بالريال السعودي)" inputMode="numeric" className="form-control"/>
                    <input required onChange={handleChange} type="text" id="price_b" placeholder="* السعر للرضع (بالريال السعودي)" inputMode="numeric" className="form-control"/>
                </div>
                ) : (
                <div>
                    <input required onChange={handleChange} type="text" id="price" placeholder="* السعر للكبار(بالريال اليمني)" inputMode="numeric" className="form-control"/>
                    <input required onChange={handleChange} type="text" id="price_c" placeholder="* السعر للأطفال(بالريال اليمني)" inputMode="numeric" className="form-control"/>
                    <input required onChange={handleChange} type="text" id="price_b" placeholder="* السعر للرضع(بالريال اليمني)" inputMode="numeric" className="form-control"/>
                </div>
                )
            }
          </div>

        </div>

        <div className="input-group mr-4 mt-3">
          <button type="submit" className="btn btn-md btn-outline-primary">إضافة</button>
        </div>
      
      </div>
    )
    const CommonHajj = (
      <div>
        
        <div className="form-inline mt-4">
          <label htmlFor="company" className="ml-sm-4"/>
          {companyInput()}
        </div>
      
        {/* <div className="form-inline mt-4">
          <label htmlFor="price" className="ml-sm-4"/>
          <div className="input-group">
              <input type="number" min="0" placeholder="* السعر (بالريال)" className="form-control num-input"/>
              <i className="text-muted mt-1 mr-2">ريال سعودي</i>
          </div>
        </div> */}
        
        <div className="form-inline mt-4">
            <label htmlFor="date" className="ml-sm-4"/>
            <div className="input-group">
              <input onChange={handleChange} type="text" onFocus={(e) => {e.target.type='date'}} value={state.date ? state.date : ''} id="date" placeholder="* التاريخ" className="form-control"/>
            </div>

            <label htmlFor="day" className="ml-sm-4"/>
            <div className="input-group pt-special">
              {dayInput()}
            </div>
            
{/* 
            <label htmlFor="departure" className="ml-sm-4"/>
            <div className="input-group pt-special">
              <input required onChange={handleChange} type="text" onFocus={(e) => {e.target.type='time'}} value={state.departure ? state.departure : ''} id="departure" placeholder="وقت الأقلاع" className="form-control"/>
            </div> */}
                    <input required onChange={handleChange} type="number" id="duration" placeholder="* عدد الأيام" inputMode="numeric" className="form-control"/>
        </div>
        <div className="form-inline mt-4">
          <label htmlFor="transport" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <select required onChange={handleChange} id="transport" className="custom-select">
              <option value="">وسيلة الأنتقال</option>
              {transport ? (transport.map((transport, index) => {
                return(<option value={transport} key={index}>{transport}</option>)
              })) : null}
            </select>
          </div>
        </div>
        <div className="form-inline mt-4">

          <label htmlFor="price" className="ml-sm-4"/>
          <div className="input-group">
            {
              state.type === 'SAYE' ? (
                <div>
                    <input required onChange={handleChange} type="text" id="price" placeholder="* السعر للكبار (بالريال السعودي)" inputMode="numeric" className="form-control"/>
                    <input required onChange={handleChange} type="text" id="price_c" placeholder="* السعر للأطفال (بالريال السعودي)" inputMode="numeric" className="form-control"/>
                    <input required onChange={handleChange} type="text" id="price_b" placeholder="* السعر للرضع (بالريال السعودي)" inputMode="numeric" className="form-control"/>
                </div>
                ) : (
                <div>
                    <input required onChange={handleChange} type="text" id="price" placeholder="* السعر للكبار(بالريال اليمني)" inputMode="numeric" className="form-control"/>
                    <input required onChange={handleChange} type="text" id="price_c" placeholder="* السعر للأطفال(بالريال اليمني)" inputMode="numeric" className="form-control"/>
                    <input required onChange={handleChange} type="text" id="price_b" placeholder="* السعر للرضع(بالريال اليمني)" inputMode="numeric" className="form-control"/>
                </div>
                )
            }
          </div>

        </div>

        <div className="input-group mr-4 mt-3">
          <button type="submit" className="btn btn-md btn-outline-primary">إضافة</button>
        </div>
      
      </div>
    )


    const SAYE = (
      <div>

        <div className="form-inline mt-4">
          <label htmlFor="from" className="ml-sm-4"/>
          <div className="input-group">
            <select required onChange={handleChange} id="from" className="custom-select">
              <option value="">مدن السعودية (مِن)</option>
              {SAcities ? (SAcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>

          <label htmlFor="to" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <select required onChange={handleChange} id="to" className="custom-select">
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

        <div className="form-inline mt-4">
          <label htmlFor="from" className="ml-sm-4"/>
          <div className="input-group">
            <select required onChange={handleChange} id="from" className="custom-select">
              <option value="">مدن اليمن (مِن)</option>
              {YEcities ? (YEcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>

          <label htmlFor="to" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <select required onChange={handleChange} id="to" className="custom-select">
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

        <div className="form-inline mt-4">
          <label htmlFor="from" className="ml-sm-4"/>
          <div className="input-group">
            <select required onChange={handleChange} id="from" className="custom-select">
              <option value="">مدن اليمن (مِن)</option>
              {YEcities ? (YEcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>

          <label htmlFor="to" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <select required onChange={handleChange} id="to" className="custom-select">
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
    const hajj = (
      <div>

        <div className="form-inline mt-4">
          <label htmlFor="from" className="ml-sm-4"/>
          <div className="input-group">
            <select required onChange={handleChange} id="from" className="custom-select">
              <option value="">مدن اليمن (مِن)</option>
              {YEcities ? (YEcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>

          {/* <label htmlFor="to" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <select required onChange={handleChange} id="to" className="custom-select">
              <option value="">مدن السعودية (إلى)</option>
              {SAcities ? (SAcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div> */}
        </div>

        {CommonHajj}
      </div>
    )
    const umrah = (
      <div>

        <div className="form-inline mt-4">
          <label htmlFor="from" className="ml-sm-4"/>
          <div className="input-group">
            <select required onChange={handleChange} id="from" className="custom-select">
              <option value="">مدن اليمن (مِن)</option>
              {YEcities ? (YEcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>

          {/* <label htmlFor="to" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <select required onChange={handleChange} id="to" className="custom-select">
              <option value="">مدن السعودية (إلى)</option>
              {SAcities ? (SAcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div> */}
        </div>

        {CommonHajj}
      </div>
    )
    if (state.type && state.type === 'SAYE'){return SAYE}
    if (state.type && state.type === 'YESA'){return YESA}
    if (state.type && state.type === 'YEYE'){return YEYE}
    if (state.type && state.type === 'hajj'){return hajj}
    if (state.type && state.type === 'umrah'){return umrah}
  }

  if (completed.completed) {
    return <Redirect to={{
      pathname: '/admin/trips',
      state: {flash: completed.flash}
    }} />
  }
  if (completed.hajj) {
    return <Redirect to={{
      pathname: '/admin/alltrips-hajj',
      state: {flash: completed.flash}
    }} />
  }

  return (
    <div className="mb-5 pb-5">

      {show ? (
        <div className="container text-center mt-5 pt-5">
          <div className="card p-3 shadow bg-grey">
            <span className="card-title display-6">إضافة رحلة جديدة</span>
            <hr/>
            <div className="card-body text-right">
              
              <div className="mt-3">
                <div className="form-inline mt-3">
                  <label htmlFor="type" className="ml-sm-4"/>
                  <div className="input-group">
                    <select onChange={handleType} id="type" className="custom-select">
                      <option value="" defaultValue>نوع الرحلة</option>
                      <option value="SAYE">من السعودية إلى اليمن</option>
                      <option value="YESA">من اليمن إلى السعودية</option>
                      <option value="YEYE">بين مدن اليمن</option>
                      <option value="hajj">برنامج حج</option>
                      <option value="umrah">برنامج عمرة</option>
                    </select>
                  </div>
                </div>
                <form onSubmit={state.type && (state.type=='hajj'||state.type=='umrah')?submitHajj:handleSubmit} name="TripForms">
                  {tripForm()}
                </form>

              </div>
            
            </div>
          </div>
        </div>

      ) : null}
    </div>
  )
}