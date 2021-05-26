import React ,{Component} from 'react'
import { Cookies } from 'react-cookie'

class Search extends Component{
    constructor(props){
        super()
        this.handleChange = this.handleChange.bind(this);
        this.state=props.column
    }
    
    handleChange(e) {
        console.log('input is'+e.target.checked);
        localStorage.setItem(e.target.id, e.target.checked)
        let c= 0;
        Array.prototype.forEach.call(document.getElementsByClassName('chk-search'), function(checkbox) {
            // Do stuff here
        
         
            
            if(checkbox.checked){
                c += 1
                console.log('input xheced is' +checkbox.checked)
            }
            
            });
            
            if(c == 0 ){
                localStorage.setItem('select', false);        
            }
            else{
                localStorage.setItem('select', true);
            }
        
        console.log('input selected is'+localStorage.getItem('select'));
            c=0
    }
    render(){
        localStorage.setItem(this.state.chkId, false)
        localStorage.setItem('search','');
    return(
        <div className='colm-3'>
            <input  className= 'chk-search' onClick={this.handleChange} id={this.state.chkId} type='checkbox'/>
            <label className='lbl-search' for={this.state.chkId}> {this.state.name}</label>
        </div>
    )
}

  
}
export default Search
