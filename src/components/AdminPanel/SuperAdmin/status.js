import React ,{Component} from 'react'

class Search extends Component{
    constructor(props){
        super()
        this.handleChange = this.handleChange.bind(this);
        this.state=props.column
    }
    
    handleChange(e) {
        localStorage.setItem(e.target.id, e.target.checked)
    }
    render(){
        localStorage.setItem(this.state.chkId, false)
        localStorage.setItem('search','');
    return(
        <div className='colm-3'>
             <label for="cars">الحالة</label>
<select name="cars" id="cars">
  <optgroup label="">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
  </optgroup>
</select> 
            <input  className= 'chk-search' onClick={this.handleChange} id={this.state.chkId} type='checkbox'/>
            <label className='lbl-search' for={this.state.chkId}> {this.state.name}</label>
        </div>
    )
}

  
}
export default Search