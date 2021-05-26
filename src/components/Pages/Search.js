import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
/* Main Page Image */
import homeImg from '../../Static/Images/Home/main.png';

// Finished ...

export const Search = (props) => {
  const [state, setState] = useState({});
  const [day, setDay] = useState();
  const [results, setResults] = useState({results: null, limit: 5});
  const [redirect, setRedirect] = useState(false);
  const [trid, setTrid] = useState(0);
  

  const everyDay = 'كل يوم'
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
//   if(!state){
//     const searchTrip = async() => {
//       await fetch('/api/trips/search', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//     body: JSON.stringify({'day':'كل يوم','from':'جدة'})
//   }).then(resp => {
//     resp.json().then(data => {
//       setResults({...results, results: data.trips});
//     })
//   })
// }

// // Search For Trips
// searchTrip();
// }

  const handleSubmit = (e) => {
    e.preventDefault();
    

    const searchTrip = async() => {
      await fetch('/api/trips/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(state)
      }).then(resp => {
        resp.json().then(data => {
          setResults({...results, results: data.trips});
        })
      })
    }

    // Search For Trips
    searchTrip();
  }

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

  const handleClick = (e) => {
    e.preventDefault();
    setTrid(e.target.id);
    setRedirect(true);
  }

  const handleReset = (e) => {
    e.preventDefault();
    // Reset State
    setState({})
    // Reset Results
    setResults({results: null, limit: 5})
    // Reset SearchForm
    const searchForm = document.SearchForm
    searchForm && searchForm.reset()
  }

  const dayInput = () => {
    if (state.date) {
      return (
        <input readOnly type="text" id="day" value={day} className="form-control"/>
      )
    } else {
      return (
        <select onChange={handleChange}  id="day" defaultValue={state.day} className="custom-select">
          <option value="" defaultValue>كل يوم</option>
          {/* <option value={everyDay} >كل يوم</option> */}
          {weekdays ? (weekdays.map((day, index) => {
            return(<option value={day.name} key={index}>{day.name}</option>)
          })) : null}
        </select>
      )
    }
  }

  const LoadSearchResults = () => {
    let trips = results.results && results.results.slice(0, results.limit)

    return(
      <tbody>
        {trips ? (trips.map((trip, index) => {
          return(
            <tr className="table-light" key={index}>
              <td><button id={trip.trid} onClick={handleClick} className="btn btn-sm btn-outline-primary">إحجز</button></td>
              {
                trip.type === 'SAYE' ? (
                  <td className="">{ (parseFloat(trip.price))>0?(parseFloat(trip.price)+' ريال سعودى'):''}</td>
                ) : (
                  <td className="">{ (Math.round(parseFloat(trip.price*66.76)))>0?Math.round(parseFloat(trip.price*66.76))+' ريال يمنى':''}</td>
                )
              }
              <td className="">{trip.company}</td>
  
              <td className="">{trip.from}</td>
              <td className="">{trip.to}</td>
              {/* <td className="">{trip.date}</td> */}
              <td className="">{trip.day}</td>
              <td className="">{trip.time}</td>
              <td className="">{trip.time_ap}</td>

            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  const AddLimit = () => {
    let value = 5
    if (results.limit < results.results.length){
      let new_limit = results.limit + value;
      setResults({...results, limit: new_limit})
    }
  }

  const ReduceLimit = () => {
    let value = 5
    if (results.limit > value){
      let new_limit = results.limit - value;
      setResults({...results, limit: new_limit})
    }
  }

  if (redirect) {
    return <Redirect to={`/trips/order/${trid}`} />
  }


  return (
    <div className="mb-5 pb-5">
    {(props.home==true) ?"" :
    
    <div>
      
      <div className="carousel-item active" style={{backgroundImage: `url(${homeImg})`, opacity: 0.82}}>
        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">البحث عن الرحلات</h3>
        </div>
      </div>

      <div className="container text-center mt-4">
        <span className="display-6">الأقسام</span>
        <hr/>
        <p className="lead font-weight-bold">
          <Link to="/trips" className="text-primary"> الرحلات </Link>|
          <Link to="/transactions" className="text-primary"> المعاملات </Link>|
          <Link to="/orders" className="text-primary"> الطلبات </Link>
        </p>

      </div>
      <div className="container text-center mt-5">
      <span className="display-6 ">إبحث عن الرحلات</span>
</div>
</div>}

      <div className="container text-center mt-5">

        <form onSubmit={handleSubmit} name="SearchForm">
          <legend className="text-right">إبحث : </legend>
          
          <div className="form-inline mr-4 mt-3">
            
            <label htmlFor="from" className="ml-sm-2 sr-only">مِن</label>
            <div className="input-group">
              <select id="from"  onChange={handleChange} defaultValue={state.from} className="custom-select ml-sm-2">
                <option defaultValue>مِن</option>
                <option disabled className="font-weight-bold">-----السعودية-----</option>
                {SAcities ? (SAcities.map((city, index) => {
                  return(<option value={city} key={index}>{city}</option>)
                })) : null}
                <option disabled className="font-weight-bold">-------اليمن-------</option>
                {YEcities ? (YEcities.map((city, index) => {
                  return(<option value={city} key={index}>{city}</option>)
                })) : null}
              </select>
            </div>

            <label htmlFor="to" className="ml-sm-2 sr-only">إلى</label>
            <div className="input-group pt-special">
              <select id="to"  onChange={handleChange} defaultValue={state.to} className="custom-select ml-sm-2">
                <option defaultValue>إلى</option>
                <option disabled className="font-weight-bold">-----السعودية-----</option>
                {SAcities ? (SAcities.map((city, index) => {
                  return(<option value={city} key={index}>{city}</option>)
                })) : null}
                <option disabled className="font-weight-bold">-------اليمن-------</option>
                {YEcities ? (YEcities.map((city, index) => {
                  return(<option value={city} key={index}>{city}</option>)
                })) : null}
              </select>
            </div>

            <label htmlFor="date" className="ml-sm-2 sr-only">التاريخ</label>
            <div className="input-group pt-special">
              <input id="date"  onChange={handleChange} type="text" onFocus={(e) => {e.target.type='date'}} placeholder="التاريخ" className="form-control ml-sm-2"/>
            </div>

            <label htmlFor="day" className="ml-sm-2 sr-only">اليوم</label>
            <div className="input-group pt-special">
              {dayInput()}
            </div>

            <div className="input-group mr-md-3 pt-special">
              <button type="submit" className="btn btn-md btn-outline-primary">إبحث</button>
              {state && results.results ? (<button onClick={handleReset} className="btn btn-md btn-outline-danger">إعادة تعيين</button>) : null}
            </div>
            
          </div>
        </form>

      </div>

      <div className="container text-center mt-5 pt-5">
        
        {(results.results && results.results.length > 0) ? (
          <div>
            <span className="display-5 text-primary">نتائج البحث</span>
            <hr/>
            <table className="table table-responsive-sm table-hover bg-grey">
              <thead>
                  <tr className="table-secondary">
                  <th className="table-secondary" scope="col">للحجز</th>
                  <th className="table-secondary" scope="col">السعر</th>
                  <th className="table-secondary" scope="col">الشركة الناقلة</th>
                  <th className="table-secondary" scope="col">مدينة الصعود</th>
                  <th className="table-secondary" scope="col">مدينة النزول</th>
                  {/* <th className="table-secondary" scope="col">التاريخ</th> */}
                  <th className="table-secondary" scope="col">اليوم</th>
                  <th className="table-secondary" scope="col">المغادرة</th>
                  <th className="table-secondary" scope="col">الوصول</th>

                </tr>
              </thead>
              {LoadSearchResults()}
            </table>
            <div className="justify-content-center">
              {(results.results && results.limit < results.results.length) ? (<button onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {results.limit > 5 ? (<button onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>
          
          </div>
        ) : (results.results && results.results.length === 0 ? (<span className="display-5 text-dark">لا توجد نتائج</span>): null)}
        
      </div>

    </div>
  )
}