import React, {useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';
// import { Cookies } from 'react-cookie';


export const RegisterUser = () => {
  //const cookies = new Cookies();

  const [show, setShow] = useState(false);

  const [cred, setCred] = useState();
  const [error, setError] = useState({});
  const [completed, setCompleted] = useState({completed: false, flash: null});
  const [regError, setRegError] = useState({})

  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (localStorage.yemenbus_user_jwt ){
      setRedirect(true)
    } else {
      setShow(true);
    }
  }, [])

  const loadRegisterPage = () => {
    return (
      <div>

        <div className="form-inline justify-content-center mt-4">
          
          <label htmlFor="username" className="ml-sm-4"/>
          <div className="input-group">
            <input onChange={handleChange} required type="text" id="username" placeholder="* إسم المستخدم" className={"form-control " + (regError.username_exist ? 'is-invalid' : '')}/>
          </div>

          <label htmlFor="fullname" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <input onChange={handleChange} required type="text" id="fullname" placeholder="* الإسم الكامل" className="form-control"/>
          </div>

        </div>


        <div className="form-inline justify-content-center mt-4">
          <label htmlFor="email" className="ml-sm-4"/>
          <div className="input-group">
            <input type="email" required onChange={handleChange} id="email" placeholder="* البريد الإلكتروني" title="البريد الإلكتروني" className={"form-control " + (regError.email_exist ? 'is-invalid' : '')}/>
          </div>

          <label htmlFor="phone" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <input type="number" inputMode="tel" required onChange={handleChange} id="phone" placeholder="* (رقم الجوال (السعودي/اليمني" title="رقم الجوال (السعودي/اليمني)" className={"form-control num-input " + (error.phone ? 'is-invalid' : '') + (regError.phone_exist ? 'is-invalid' : '')}/>
          </div>
        </div>
        <p className="text-muted mt-2 text-center font-weight-lighter font-info">* الرقم يجب أن يبدأ بـ (05 / 7) ويجب أن يتكون من (10 / 9) أرقام</p>

        <div className="form-inline justify-content-center mt-4">
          
          <label htmlFor="password" className="ml-sm-4"/>
          <div className="input-group">
            <input type="password" required onChange={handleChange} id="password" placeholder="* كلمة السر" className="form-control"/>
          </div>

          <label htmlFor="confirm_password" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <input type="password" required onChange={handleChange} id="confirm_password" placeholder="* تأكيد كلمة السر" className="form-control"/>
          </div>

        </div>
        <p className="text-muted mt-2 text-center font-weight-lighter font-info">* كلمة السر يجب أن تتكون من 8 حروف على الأقل.</p>
        
        <div className="input-group justify-content-center mb-3 mt-4">
          <button type="submit" id="SubmissionBtn" className="btn btn-lg btn-outline-primary">تسجيل</button>
        </div>

        <Link to="/login">لديك حساب بالفعل؟ سجل دخولك من هنا.</Link>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const Register = async() => {
      await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(cred)
      }).then(resp => {
        resp.json().then(data => {
          if (resp.ok) {
            setCompleted({
              completed: true,
              flash: {
                name: 'التسجيل',
                message: `تم تسجيل "${data.username}" بنجاح, الرجاء الإنتظار حتى يتم تفعيل الحساب لتسجيل الدخول.`,
                type: 'success'
              }
            })
          } else {
            if (data.code === 'SERVER'){
              setRegError({
                registeration: {
                  name: 'التسجيل',
                  error: 'حدث خطأ في السيرفر, الرجاء المحاولة لاحقاً.',
                  type: 'danger'
                }
              });
            }
            if (data.code === 'EMAIL_EXIST'){
              setRegError({
                email_exist: {
                  name: 'التسجيل',
                  error: 'البريد الإلكتروني الذي قمت بإدخاله مسجل بالفعل, الرجاء إدخال بريد إلكتروني آخر.',
                  type: 'warning'
                }
              });
            }
            if (data.code === 'PHONE_EXIST'){
              setRegError({
                phone_exist: {
                  name: 'التسجيل',
                  error: 'رقم الجوال الذي قمت بإدخاله مسجل بالفعل, الرجاء إدخال رقم جوال آخر.',
                  type: 'warning'
                }
              });
            }
            if (data.code === 'USERNAME_EXIST'){
              setRegError({
                username_exist: {
                  name: 'التسجيل',
                  error: 'إسم المستخدم الذي قمت بإدخاله مسجل بالفعل, الرجاء إدخال إسم مستخدم آخر.',
                  type: 'warning'
                }
              });
            }
          }
        })
      })
    }

    if (Object.keys(error).length === 0 && error.constructor === Object){
      Register();
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    let id = e.target.id;
    let SAPhone = /^[0][5][0-9]{8}$/
    let YEPhone = /^[7][0-9]{8}$/

    let errors = error;
    delete errors['registeration']
    setError(errors);
    setRegError({});

    if (id === 'phone'){
      if (e.target.value === '' || (SAPhone.test(e.target.value) || YEPhone.test(e.target.value))){
        let errors = error;
        delete errors['phone']
        setError(errors)
      } else {
        setError({
          phone: {
            name: 'رقم الجوال',
            error: 'رقم الجوال يجب أن يبدأ بـ 7 أو 05 ويجب أن يتكون من 9 أو 10 أرقام',
            type: 'info'
          }
        })
      }
    }

    if (id === 'password'){
      if (e.target.value && e.target.value.length < 8) {
        setError({
          password: {
            name: 'كلمة السر',
            error: 'كلمة السر يجب أن تتكون من 8 أحرف على الأقل',
            type: 'info'
          }
        })
      } else if (cred && (e.target.value !== cred.confirm_password)) {
        setError({
          password: {
            name: 'رقم السر',
            error: 'الرقم السري, وتأكيد الرقم السري يجب أن يكونوا متطابقين',
            type: 'info'
          }
        })
      } else {
        let errors = error;
        delete errors['password']
        setError(errors)
      }
    }

    if (id === "confirm_password"){
      if (cred && (e.target.value !== cred.password)){
        setError({
          password: {
            name: 'رقم السر',
            error: 'الرقم السري, وتأكيد الرقم السري يجب أن يكونوا متطابقين',
            type: 'info'
          }
        })
      } else {
        let errors = error;
        delete errors['password']
        setError(errors);
      }
    }

    setCred({
      ...cred,
      [id]: e.target.value
    });
  }

  const loadErrors = () => {
    if (Object.keys(error).length !== 0 && error.constructor === Object){
      return (
        <div>
          {error ? Object.entries(error).map((e, id) => {
            return (
              <div key={id} className={`alert alert-${e[1].type} text-right`}>
                <p className="font-weight-bold">
                  {e[1].name} : {e[1].error}
                </p>
              </div>
            )
          }): null}
        </div>
      )
    }
  }

  const loadRegErrors = () => {
    if (Object.keys(regError).length !== 0 && regError.constructor === Object){
      return (
        <div>
          {regError ? Object.entries(regError).map((e, id) => {
            return (
              <div key={id} className={`alert alert-${e[1].type} text-right`}>
                <p className="font-weight-bold">
                  {e[1].name} : {e[1].error}
                </p>
              </div>
            )
          }): null}
        </div>
      )
    }
  }

  if (completed.completed) {
    return <Redirect to={{
      pathname: '/login',
      state: {flash: completed.flash}
    }} />
  }

  if (redirect){
    return <Redirect to="/"/>
  }

  return (
    <div className="container mb-5 pb-5">
      {show ? (
        <div className="container text-center mt-5">
          <div className="card p-3 bg-grey shadow">
            <hr/>
            <div className="card-body">
              <div>
                <legend className="user-6 text-info">التسجيل في يمن باص</legend>
                <hr/>
                {loadErrors()}
                {loadRegErrors()}
                <div className="row">
                  
                  <div className="form-group col mt-5">
                    <p className="font-weight-lighter font-info text-center text-muted">الحقول المطلوبة مسبوقة بعلامة <strong>*</strong></p>
                    <form onSubmit={handleSubmit} name="RegisterForm">

                      {loadRegisterPage()}
                    
                    </form>
                  
                  </div>

                </div>
              
              </div>
            </div>
          </div>
        </div>
    
      ) : null}
    </div>
  )

}