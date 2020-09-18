import React,{Component} from 'react';
import {fetchData} from '../../api/api'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import style from './dashboard.module.css';
import Card from '@material-ui/core/Card';
import Spinner from 'reactjs-simple-spinner';
import Navbar from '../navbar/navbar'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Dashboard extends Component{

    
    componentDidMount(){
        this.props.fetchData();
    }
    state = {
        open: false,
        wordid: '',
      };
      onOpenModal = () => {
        this.setState({ open: true });
      };
     
      onCloseModal = () => {
          this.load()
        this.setState({ 
            open: false,   
        });
      };
      load=()=>{
        window.location.reload(false)
      }
       
      //code for posting new word
      handleSubmit = (e) => {
        e.preventDefault()
        fetch("/addword",{
            method:"post",
            headers:{
                "content-Type":"application/json",
            },
            body:JSON.stringify({
               wordid:this.state.wordid
            })
        }).then(res=>res.json())
        .then(data=>{ 
            console.log(data)

        }).catch(err=>{
            console.log(err)
        })
    }
    
    render(){
        console.log('data',this.props.setData)
        const { open } = this.state;
        return(
            <div className={style.m}>
                <Navbar/>
                <h2 className={style.head}>Words List</h2>  
            {this.props.setData.length===0? <Spinner className={style.spinner} size="huge" lineSize={12} lineFgColor="#8B008B" fontSize={20} message="Loading words list..."  />:
            <div >
                 <Card className={style.root}>
                {this.props.setData.map((data,index)=>{
                    return(
                        <div>
                           <Card className={style.root2}>
                            <Link className={style.link} to={`/word/${data.wordid}`}>
                            <p className={style.head}>{data.word}</p>
                            {data.results.map((data,index)=>{
                                return(
                                    <div className={style.ma}>
                                        {data.lexicalEntries.map((datas,index)=>{
                                            return(
                                                <div className={style.verb} >
                                                    <p style={{color:'grey'}} className={style.text}>({datas.lexicalCategory.text})</p> 
                                                     {datas.entries?datas.entries.map((data,index)=>{
                                                                      return(
                                                                        //   <div>
                                                                              <p  className={style.text}>{data.senses[0].definitions?data.senses[0].definitions:''}</p>
                                                                        //    </div>
                                                                      )
                                                    }):''}
                                                </div>
                                            )
                                        })}
                                       </div>
                                    )
                                })}
                                </Link>
                                </Card>
                         </div>
                    )
                })}
                </Card>
            </div>
    }
        <div className={style.plus}>
      <AddCircleIcon className={style.plusym} onClick={this.onOpenModal}/>
    {/* ------modal to add new word--------- */}
    </div>
    <Modal className={style.model} open={open} onClose={this.onCloseModal} center>
    <form  onSubmit={(e)=>this.handleSubmit(e)} className={style.modal} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Add word" onChange={(e)=>this.setState({wordid:e.target.value})}/><br/><br/>
      <Button variant="contained" color="primary" >
        Primary
      </Button>
    </form>
        </Modal>
    </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
       setData:state.setData
     
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchData }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)