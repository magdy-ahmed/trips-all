import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom'
//import {Cookies} from 'react-cookie';;




export const AddCompany = () => {
  //const cookies = new Cookies();

  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);  

  const [state, setState] = useState({service_type: null});
  const [error, setError] = useState({});
	const [complete, setComplete] = useState(false);

  const [companies, setCompanies] = useState();
  /* Default Values */
  
  // For TRIPS
  const busses = [
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

	// For TSEY
	const offices = [
		'وكالة الحديدة لخدمات الايدي العاملة.',
		'شركة انجاز لخدمات الايدي العاملة.',
		'وكالة الدليل للسفريات والسياحة.',
		'مجموعة اجياد للتمية السياحية.',
		'العواضي للسفريات والسياحة.',
		'نسك للاستثمار السياحي.',
		'مكتب باشافعي.',
		'مجموعة اجياد عدن.',
		'مكتب الحبيب لتشغيل الايدي العاملة.',
		'مجوعة العمل الدولية.',
		'مكتب باشافعي عدن.',
		'وكالة بامطرف للسياحة والسفر.',
		'البيت السعودي للسفريات.',
		'مكتب العيسائبى عدن.',
		'مكتب المضياف عدن.',
		'مكتب عدن الدولي عدن.',
		'مكتب اجياد عدن.',
		'مكتب بيت الكمبيوتر عدن.',
		'مكتب نحد الجزيرة.',
		'مكتب الحجر الأسود.',
		'وكالة رواسي للسفريات والسياحة.',
		'وكالة انهار الفردوس.',
		'وكالة رواد المستقبل.',
		'مستشفى صابر عدن  للفحص الطبي.',
		'مستشفى الرازي للفخص الطبي عدن.',
		'المستشفى السعودي الالماني للفحص الطبي صنعاء.',
		'مستشفى ازال للفحص الطبي صنعاء.'
	]

  // For TRSA
	const dealers = [
			'سعيد الأسمري',
			'أبو جلال',
			'فارس الرويلي',
			'صالح الحكمى',
			'ياسر الشمري'
	]

	// For IESY
	const governUniv = [
			'جامعة صنعاء',
			'جامعة عدن',
			'جامعة تعز',
			'جامعة الحديدة',
			'جامعة حضرموت',
			'جامعة ذمار',
			'جامعة إب',
			'جامعة عمران',
			'جامعة البيضاء',
			'جامعة 21 سبتمبر'
		
	]

	const privateUniv = [

	  'جامعة ابن خلدون',
	  'جامعة ازال  للعلوم وتكنولوجيا',
	  'جامعة اقراء للعلوم وتكنلوجيا', 
	  'جامعة الاتحاد للعلوم وتكنولوجيا', 
	  'جامعة الاحقاف', 
	  'جامعة الامارات الدولية', 
	  'جامعة الاندلس للعلوم والتنمية', 
	  'الجامعة البريطانية باليمن', 
	  'جامعة الجزيرة', 
	  'جامعة الحضارة', 
	  'جامعة الحكمة', 
	  'جامعة الرازي', 
	  'جامعة السعيد', 
	  'الجامعة العربية للعلوم والتقنية', 
	  'جامعة العلوم الحديثة', 
	  'جامعة العلوم وتكنولوجيا', 
	  'جامعة القرآن الكريم والعلوم الإسلامية', 
    'الجامعة اللبنانية الدولية', 
	  'جامعة المستقبل', 
	  'جامعة المعرفة والعلوم الحديثة', 
	  'جامعة الملكة اروى', 
	  'الجامعة الوطنية', 
	  'جامعة اليمن', 
	  'جامعة اليمن والخليج للعلوم والتكنولوجيا', 
		'الجامعة اليمنية', 
	  'الجامعة اليمنية الاردنية', 
	  'جامعة تونيك الدولية للتكنولوجيا', 
	  'جامعة دار السلام للعلوم وتكنولوجيا', 
	  'جامعة دار العلوم الشرعية', 
	  'جامعة سبأ', 
	  'كلية ٢٢ مايو الطبية', 
	  'كلية الامام الشافعي', 
	  'كلية الريان', 
	  'كلية ردفان للقرآن'
	]

	const Institutes = [
		'معهد سييدز للغة الإنجليزية والكمبيوتر',
		'معهد اكسيد للغة الإنجليزية',
		'معهد يالى للغة الإنجليزية',
		'المعهد البريطاني  للغة الإنجليزية',
		'المعهد الكندي للغة الإنجليزية',
		'معهد نيو هوريزون للغة الإنجليزية'
  ]
  
  useEffect(() => {
    const jwt = localStorage.yemenbus_user_jwt ;
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({jwt: jwt, permission: 'superadmin_access'})
    }).then(resp => {
      if (resp.ok){
        setShow(true)
      } else {
        setFailed(true);
      }
    })
  }, [])

  /* Default Values */
  
  const CreateCompany = async() => {
    await fetch('/api/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(state)
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setComplete(true)
        } else {
          setError({
            ...error,
            company: {
              name: 'مقدم الخدمة',
              error: 'الشركة المحددة كمقدم خدمة مسجلة بالفعل, الرجاء إختيار شركة أخرى'
            }
          })
        }
      })
    })
  }

	const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(error).length === 0){
      CreateCompany();
    }
	}

	const handleChange = (e) => {
    setError({});

    let id = e.target.id;
    let YEValidation = /^[7][0-9]{8}$/
    let SAValidation = /^[0][5][0-9]{8}$/
    
    if (id === 'service_type'){
      // Remove Company on Type Change
      setState({
        ...state,
        company: null,
        [e.target.id]: e.target.value
      });
      let types = {
        TRIPS: busses,
        TRSA: dealers,
        TSEY: offices,
        IESY: governUniv.concat(privateUniv, Institutes)
      }
      setCompanies(types[e.target.value])
    }

    else if(id === 'phone') {
      if (e.target.value !== '' && !YEValidation.test(e.target.value) && !SAValidation.test(e.target.value)){
        setError({
          ...error,
          phone: {
            name: 'رقم الهاتف الثابت للشركة',
            error: 'الرقم الذي أدخلته لا يتناسب مع أرقام الجوالات السعودية أو اليمنية (7xxxxxxxx/05xxxxxxxx)'
          }
        })
      } else {
        setState({
          ...state,
          [e.target.id]: e.target.value
        })
      } 
    } 

    else if(id === 'whatsapp') {
      if (e.target.value !== '' && !YEValidation.test(e.target.value) && !SAValidation.test(e.target.value)){
        setError({
          ...error,
          whatsapp: {
            name: 'الواتساب',
            error: 'الرقم الذي أدخلته لا يتناسب مع أرقام الجوالات السعودية أو اليمنية (7xxxxxxxx/05xxxxxxxx)'
          }
        })
      } else {
        setState({
          ...state,
          [e.target.id]: e.target.value
        })
      }
    } 

    else if(id=== 'manager_phone') {
      if (e.target.value !== '' && !YEValidation.test(e.target.value) && !SAValidation.test(e.target.value)){
        setError({
          ...error,
          manager_phone: {
            name: 'رقم جوال مدير الطلبات',
            error: 'الرقم الذي أدخلته لا يتناسب مع أرقام الجوالات السعودية أو اليمنية (7xxxxxxxx/05xxxxxxxx)'
          }
        })
      } else {
        setState({
          ...state,
          [e.target.id]: e.target.value
        })
      }
    } 

    else {
      setState({
        ...state,
        [e.target.id]: e.target.value
      })
    }

    
	}

  const loadForm = () => {

    const getCompany = () => {

      return (
        <div className="input-group">
          {state.service_type ? (
            <select required onChange={handleChange} value={state.company ? state.company : ''} id="company" className={"custom-select " + (error.company ? 'is-invalid' : '')}>
              <option value="" defaultValue>حدد الشركة</option>
              {companies ? companies.map((company, index) => (
                <option value={company} key={index}>{company}</option>
              )) : null}
            </select>
          ) : (
            <div>
              <input disabled value="الرجاء تحديد نوع الخدمة أولاً" className="form-control"/>
            </div>
          )}
        </div>
      )
    }

    return(
      <form onSubmit={handleSubmit}>
        
        <div className="form-inline mt-5">
          <label htmlFor="service_type" className="ml-sm-4 mr-md-4 font-weight-bold">* نوع الخدمة : </label>
          <div className="input-group">
            <select required onChange={handleChange} id="service_type" className={"custom-select " + (error.service_type ? 'is-invalid' : '')}>
              <option value="" defaultValue>حدد نوع الخدمة</option>
              <option value="TRIPS">الرحلات وتوصيل الطرود</option>
              <option value="TRSA">معاملات المقيم في السعودية</option>
              <option value="TSEY">معاملات السفارة السعودية</option>
              <option value="IESY">خدمات التقسيط للجامعات والمعاهد</option>
            </select>
          </div>

          <label htmlFor="company" className="ml-sm-4 mr-md-4 font-weight-bold pt-special">* مقدم الخدمة : </label>
          {getCompany()}
        </div>

        <div className="form-inline mt-4">
          <label htmlFor="phone" className="ml-sm-4 mr-md-4 font-weight-bold">* الهاتف الخاص بالشركة : </label>
          <div className="input-group">
            <input required onChange={handleChange} type="number" inputMode="tel" placeholder="(7/05x)xxxxxxx" id="phone" className={"form-control num-input " + (error.phone ? 'is-invalid' : '')}/>
          </div>

          <label htmlFor="email" className="ml-sm-4 mr-md-4 pt-special font-weight-bold">* البريد الإلكتروني للشركة : </label>
          <div className="input-group">
            <input required onChange={handleChange} type="email" placeholder="name@example.com" id="email" className={"form-control num-input " + (error.email ? 'is-invalid' : '')}/>
          </div>
        </div>
      
        <div className="form-inline mt-4">
          <label htmlFor="facebook" className="ml-sm-4 mr-md-4 font-weight-bold">الفيسبوك (الشركة) : </label>
          <div className="input-group">
            <input onChange={handleChange} type="text" id="facebook" className={"form-control num-input " + (error.facebook ? 'is-invalid' : '')}/>
          </div>

          <label htmlFor="whatsapp" className="ml-sm-4 mr-md-4 pt-special font-weight-bold">الواتساب (الشركة) : </label>
          <div className="input-group ">
            <input onChange={handleChange} type="number" inputMode="tel" placeholder="(7/05x)xxxxxxx" id="whatsapp" className={"form-control num-input " + (error.whatsapp ? 'is-invalid' : '')}/>
          </div>
        </div>

        <div className="form-inline mt-4">
          <label htmlFor="manager" className="ml-sm-4 mr-md-4 font-weight-bold">* إسم مدير الطلبات : </label>
          <div className="input-group">
            <input required onChange={handleChange} id="manager" type="text" className={"form-control " + (error.manager ? 'is-invalid' : '')}/>
          </div>
          
          <label htmlFor="manager_phone" className="ml-sm-4 mr-md-4 font-weight-bold pt-special">* رقم جوال مدير الطلبات : </label>
          <div className="input-group">
            <input required onChange={handleChange} id="manager_phone" type="number" inputMode="tel" placeholder="(7/05x)xxxxxxx" className={"form-control num-input " + (error.manager_phone ? 'is-invalid' : '')}/>
          </div>
        </div>

        <div className="form-inline mt-4">
          <label htmlFor="manager_email" className="ml-sm-4 mr-md-4  font-weight-bold">* البريد الإلكتروني لمدير الطلبات : </label>
          <div className="input-group">
            <input required onChange={handleChange} id="manager_email" type="email" placeholder="name@example.com" className={"form-control num-input " + (error.manager_email ? 'is-invalid' : '')}/>
          </div>
        </div>
        
        <div className="form-check mt-4">
          <input required type="checkbox" className="form-check-input"/>
          <label htmlFor="confirm" className="form-check-label font-weight-bold text-primary mr-4"> تأكدت من جميع الخانات, وأنها تحتوي على البيانات بشكل صحيح</label>
        </div>

        <div className="input-group mt-4 mr-md-4 justify-content-center">
          <button className="btn btn-lg btn-outline-success">إضافة شركة</button>
        </div>

      </form>
    )
  }

	const loadErrors = () => {
		if (Object.keys(error).length !== 0 && error.constructor === Object){
			return (
				<div className="alert alert-info text-right">
					{error ? Object.entries(error).map((e, id) => {
						return (
							<p className="font-weight-bold" key={id}>
								- {e[1].name} : {e[1].error}
							</p>
						)
					}): null}
				</div>
			)
		}
  }
  
  if (complete){
    return <Redirect to="/admin/companies"/>
  }

  if (failed) {
    return <Redirect to="/unauthorized"/>
  }
  
  return (
    <div className="mb-5 pb-5">

      {show ? (
        <div className="container text-center mt-5">
          <div className="card p-3 bg-grey shadow">
            <span className="card-title display-6">إضافة شركة جديدة</span>
            <hr/>
            <div className="card-body">
              <p className="text-right text-muted font-weight-lighter"><i className="fa fa-star-of-life fa-xs"/> يمكن إضافة شركة واحدة فقط, لكل مقدم خدمة</p>
              {loadErrors()}
              {loadForm()}
            </div>
          </div>
        </div>

      ) : null}

    </div>
  )
}