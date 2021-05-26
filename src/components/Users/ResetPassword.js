import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// import { Cookies } from 'react-cookie';


export const ResetPassword = ({ location }) => {
  //const cookies = new Cookies();

  const urlParams = new URLSearchParams(location.search);
  const reset_token = urlParams.get('token');
  const user_email = urlParams.get('email');

  const [show, setShow] = useState(false);
  
  const [error, setError] = useState({});

  const [email, setEmail] = useState(user_email);
  const [submited, setSubmit] = useState(false);

  const [token, setToken] = useState(reset_token);
  const [valid, setValid] = useState({valid: false, set: false});

  const [newPassw, setPassw] = useState();
  const [completed, setCompleted] = useState({completed: false, flash: null});
  
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (localStorage.yemenbus_user_jwt ){
      setRedirect(true)
    } else {
      setShow(true);
    }
    if (reset_token && !valid.valid && !valid.set){
      validateToken();
    }
  }, [])


  const validateToken = async() => {
    await fetch('/api/authenticate_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({email: email, reset_token: token})
    }).then(resp => {
      resp.json().then(_ => {
        if (resp.ok){
          setError({});
          setValid({valid: true, set: true});
          setSubmit(true);
        } else {
          setError({
            token: {
              name: 'رمز الإسترجاع',
              error: 'رمز الإسترجاع غير صالح, الرجاء التأكد منه, وإدخاله بشكل صحيح.'
            }
          });
          setValid({valid: false, set: true})
        }
      }) 
    })
  }
  
  const resetPasswForm = () => {

    const handleChange = (e) => {
      e.preventDefault();

      setError({})
      setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      const sendEmail = async() => {
        await fetch('/api/send_reset_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(email)
        }).then(resp => {
          resp.json().then(_ => {
            if (resp.ok){
              setError({});
              setSubmit(true);
            } else {
              setError({
                email: {
                  name: 'إسترجاع كلمة المرور',
                  error: 'البريد الإلكتروني غير صحيح, الرجاء إدخال بريد إلكتروني صحيح.'
                }
              })
              document.getElementById("SubmissionBtn").disabled = false;
              document.SubmitEmailForm.disabled = false;
              let form = document.SubmitEmailForm
              form && form.reset()
            }
          }) 
        })
      }

      sendEmail();
      document.getElementById("SubmissionBtn").disabled = true;
      document.SubmitEmailForm.disabled = true;
    }

    return (
      <form name="SubmitEmailForm" onSubmit={handleSubmit}>

        <p className="text-muted text-center font-weight-lighter font-info">* الرجاء إدخال البريد الإلكتروني المسجل, لإستعادة كلمة المرور</p>
        
        <div className="form-inline justify-content-center mt-2">  
          <label htmlFor="email" className="ml-sm-4"/>
          <div className="input-group">
            <input onChange={handleChange} required type="email" id="email" placeholder="* البريد الإلكتروني" className="form-control"/>
          </div>

          <div className="input-group mr-md-2 pt-special">
            <button type="submit" id="SubmissionBtn" className="btn btn-md btn-outline-info">إرسال الرمز</button>
          </div>
        </div>

      </form>
    )
  }

  const tokenForm = () => {
    const handleChange = (e) => {
      e.preventDefault();
      let errors = error;
      delete errors['token']
      setError(errors)
      setToken(e.target.value)
    }

    const handleResetToken = (e) => {
      e.preventDefault();
  
      validateToken();
      let form = document.ValidateTokenForm
      form && form.reset()
    }

    return (
      <form name="ValidateTokenForm" onSubmit={handleResetToken}>

        <div className="form-inline justify-content-center mt-4">
        <label className="ml-sm-4">البريد الإلكتروني : </label>
          <div className="font-weight-bold">
            {email}
          </div>
        </div>

        <p className="text-muted mt-4 text-center">* سيصل إليك رمز التوثيق عن طريق البريد الإلكتروني, الرجاء إدخاله</p>
        <div className="form-inline justify-content-center">
          
          <label htmlFor="token" className="ml-sm-4"/>
          <div className="input-group">
            <input onChange={handleChange} required type="text" id="token" placeholder="* رمز الإسترجاع" className="form-control"/>
          </div>

          <div className="input-group mr-md-2 pt-special">
            <button type="submit" id="tokenBtn" className="btn btn-md btn-outline-info">إدخال الرمز</button>
          </div>

        </div>

      </form>
    )
  }

  const newPasswForm = () => {
    
    const handleChange = (e) => {
      e.preventDefault();
      let id = e.target.id;

      if (id === 'password'){
        if (e.target.value && e.target.value.length < 8) {
          setError({
            password: {
              name: 'كلمة السر',
              error: 'كلمة السر يجب أن تتكون من 8 أحرف على الأقل'
            }
          })
        } else if (newPassw && (e.target.value !== newPassw.confirm_password)) {
          setError({
            password: {
              name: 'رقم السر',
              error: 'الرقم السري, وتأكيد الرقم السري يجب أن يكونوا متطابقين'
            }
          })
        } else {
          let errors = error;
          delete errors['password']
          setError(errors)
        }
      }
  
      if (id === "confirm_password"){
        if (newPassw && (e.target.value !== newPassw.password)){
          setError({
            password: {
              name: 'رقم السر',
              error: 'الرقم السري, وتأكيد الرقم السري يجب أن يكونوا متطابقين'
            }
          })
        } else {
          let errors = error;
          delete errors['password']
          setError(errors);
        }
      }

      setPassw({
        ...newPassw,
        [e.target.id]: e.target.value
      });
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      const resetPassw = async() => {
        await fetch('/api/reset_password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({email: email, new_password: newPassw.password})
        }).then(resp => {
          resp.json().then(_ => {
            if (resp.ok){
              setCompleted({
                completed: true,
                flash: {
                  name: 'تغيير كلمة السر',
                  message: 'تم تغيير كلمة السر بنجاح',
                  type: 'success'
                }
              });
            } else {
              setCompleted({
                completed: true,
                flash: {
                  name: 'كلمة السر',
                  message: 'حدث خطأ, لم نتمكن من تغيير كلمة السر, الرجاء المحاولة من جديد لاحقاً',
                  type: 'danger'
                }
              });
            }
          }) 
        })
      }

      resetPassw();
    }

    return(
      
      <form name="NewPassForm" onSubmit={handleSubmit}>

        <p className="text-muted text-center font-weight-lighter font-info">* قم بإدخال الرمز السري الجديد</p>
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
          <button type="submit" id="resetBtn" className="btn btn-md btn-outline-success">إعادة تعيين كلمة المرور</button>
        </div>
      
      </form>

    )
  }

  const loadForms = () => {
    /*
      Display Email Form First, Then If Submitted, and it Return A Success
      Display Token Form, If Token is Valid, Display Reset Password Form.
    */ 
    if (valid.valid) {
      return (newPasswForm())
    } else if (submited) {
      return (tokenForm())
    } else {
      return (resetPasswForm())
    }
  }

  const loadErrors = () => {
    if (Object.keys(error).length !== 0 && error.constructor === Object){
      return (
        <div className="alert alert-info text-right">
          {error ? Object.entries(error).map((e, id) => {
            return (
              <p key={id}>
                {e[1].name} : {e[1].error}
              </p>
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
    }}/>
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
                <legend className="display-6 text-dark">إعادة تعيين كلمة السر</legend>
                <hr/>
                <div className="row">
                  
                  <div className="form-group col mt-5">
                    {loadErrors()}
                    {loadForms()}
                  
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