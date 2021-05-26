import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Cookies } from 'react-cookie'


export const LoginUser = (props) => {
  const [show, setShow] = useState(false);

  const cookies = new Cookies();
  const currentState = props.location.state;
  const flashMessage = currentState ? currentState.flash : null
  const [flash, setFlash] = useState(flashMessage)
  const [cred, setCred] = useState();
  const [error, setError] = useState({});
  const [completed, setCompleted] = useState({completed: false, flash: null});

  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (localStorage.yemenbus_user_jwt ){
      setRedirect(true)
    } else {
      setShow(true)
    }
  }, [])

  const loadLoginPage = () => {
    return (
      <div>

        <div className="form-inline justify-content-center mt-4">
          
          <label htmlFor="user" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <input onChange={handleChange} required type="text" id="user" placeholder="* (إسم المستخدم/البريد الإلكتروني/رقم الجوال)" title="* (إسم المستخدم/البريد الإلكتروني/رقم الجوال)" className="form-control"/>
          </div>

          <label htmlFor="password" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <input required onChange={handleChange} type="password" id="password" placeholder="* كلمة السر" className="form-control"/>
          </div>

        </div>

        <div className="input-group justify-content-center mb-3 mt-4">
          <button type="submit" id="SubmissionBtn" className="btn btn-lg btn-outline-success">تسجيل الدخول</button>
        </div>

        <p><Link to="/reset" className="font-info">نسيت كلمة السر ؟</Link></p>
        <p><Link to="/register">ليس لديك حساب؟ سجل من هنا.</Link></p>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const Login = async() => {
      await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(cred)
      }).then(resp => {
        resp.json().then(data => {
          if (resp.ok) {
            // document.cookie = `yemenbus_user_jwt=${data.jwt}`
            cookies.set('yemenbus_user_jwt', data.jwt)
            localStorage.setItem('yemenbus_user_jwt', data.jwt)
            localStorage.setItem('access_level', data.access_level)
            setCompleted({
              completed: true,
              flash: null
            });
          } else {
            if (data.code === 'SERVER'){
              setError({
                login: {
                  name : 'تسجيل الدخول',
                  error: 'حدث خطأ في السيرفر, الرجاء المحاولة لاحقاً.',
                  type: 'danger'
                }
              })
            }
            if (data.code === 'NOT_ACTIVE'){
              setError({
                login: {
                  name : 'الحساب',
                  error: 'لم يتم تفعيل حسابك بعد, الرجاء الإنتظار حتى يتم التفعيل.',
                  type: 'warning'
                }
              })
            }
            if (data.code === 'WRONG_CRED'){
              setError({
                login: {
                  name : 'تسجيل الدخول',
                  error: 'إسم المستخدم أو كلمة المرور التي قمت بإدخالها غير صحيحة, الرجاء المحاولة من جديد',
                  type: 'warning'
                }
              })
            }
          }
        })
      })
    }
    
    Login();
  }

  const handleChange = (e) => {
    e.preventDefault();
    setError({});
    setFlash();
    setCred({
      ...cred,
      [e.target.id]: e.target.value
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

  if (completed.completed) {
    return <Redirect to={{
      pathname: '/admin/panel',
    }} />
  }

  if (redirect){
    return <Redirect to="/admin/panel"/>
  }

  return (
    <div className="container mb-5 pb-5">
      {show ? (
        <div className="container text-center mt-5">
          <div className="card p-3 bg-grey shadow">
            <hr/>
            <div className="card-body">
              <div>
                <legend className="user-6 text-primary">تسجيل الدخول في يمن باص</legend>
                <hr/>
                {loadErrors()}
                {flash ? (
                  <div className={`alert alert-${flash.type}`}>
                    <p className="font-weight-bold">
                      {flash.name} : {flash.message}
                    </p>
                  </div>
                ) : null}
                <div className="row">
                  
                  <div className="form-group col mt-2">
                    <p className="font-weight-lighter font-info text-center text-muted">الحقول المطلوبة مسبوقة بعلامة <strong>*</strong></p>
                    <p className="text-center text-info">يمكنك تسجيل الدخول بإستخدام : (إسم المستخدم, البريد الإلكتروني, أو رقم الجوال).</p>
                    <form onSubmit={handleSubmit} name="LoginForm">

                      {loadLoginPage()}
                    
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