import React,{Component,useEffect} from 'react';
import {fetchWordData} from '../../api/api'
import {useParams,withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import Card from '@material-ui/core/Card';
import style from './detail.module.css'
import Spinner from 'reactjs-simple-spinner';
import Navbar from '../navbar/navbar'

class Details extends Component{
    
    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.fetchWordData(id);
        console.log(id)
    }
    
    render(){
        console.log('details',this.props.getData)
       
        return(
            <div className={style.m}>
                <Navbar/>
            {this.props.getData.length==0? <Spinner className={style.spinner} size="huge" lineSize={12} lineFgColor="#8B008B" fontSize={20} message="Loading details..."  />:
            <div >
                <Card className={style.root}>
                      {this.props.getData.map((data,index)=>{
                          return(
                             <div> 
                            <h2 className={style.mainH}>{data.word}</h2><hr/>
                             {data.results.map((data,index)=>{
                                return(
                                     <>{data.lexicalEntries.map((data,index)=>{
                                         return(
                                                <>
                                                <p style={{color:'grey'}} className={style.font}>({data.lexicalCategory?data.lexicalCategory.text:''})</p>
                                                {data.entries.map((data,index)=>{
                                                    return(

                                                        <div>
                                                            <p style={{color:'grey'}} className={style.font}>Origin : {data.etymologies?data.etymologies:'NA'}</p>
                                                            <ol> <h5>{data.senses.map((data,index)=>{
                                                                return(
                                                                    <div>
                                                                        
                                                                        <h3 className={style.def}><li> {data.definitions}</li></h3>
                                                                        <h3 style={{color:'grey',fontWeight:'normal'}} className={style.font}>{data.examples?'Examples':''}</h3>
                                                                        <ul>{data.examples?data.examples.map((data,index)=>{
                                                                            return(
                                                                                <div>
                                                                                    <li className={style.exam}>{data.text}</li>
                                                                                </div>
                                                                            )
                                                                        }):''}</ul>
                                                                        <div className={style.mainn}>
                                                                        <div>
                                                                        <h3 style={{color:'grey',fontWeight:'normal'}} className={style.font}>{data.synonyms?"Synonyms":''}</h3>
                                                                            <p className={style.s}>{data.synonyms?data.synonyms.slice(0,6).map((data,index)=>{
                                                                            return(
                                                                                <div >
                                                                            <p className={style.synonyms}> {data.text}</p>
                                                                            </div>
                                                                            )
                                                                            }):''}</p></div>
                                                                        <div> 
                                                                            <p className={style.s}>{data.synonyms?data.synonyms.slice(7,13).map((data,index)=>{
                                                                            return(
                                                                                <div >
                                                                            <p className={style.synonyms}>{data.text}</p>
                                                                            </div>
                                                                            )
                                                                        }):''}</p>
                                                                    </div>
                                                                    <div> 
                                                                            <p className={style.s}>{data.synonyms?data.synonyms.slice(14,19).map((data,index)=>{
                                                                            return(
                                                                                <div >
                                                                            <p className={style.synonyms}>{data.text}</p>
                                                                            </div>
                                                                            )
                                                                        }):''}</p>
                                                                    </div>
                                                                     
                                                                    </div>
                                                                    </div>
                                                                )
                                                            })}</h5></ol>
                                                        </div>
                                                    )
                                                })}
                                            <hr/></>
                                          )
                                     })}</>
                                )
                             })}</div>
                          )
                      })}
                     
                </Card>
            </div>
    }
    </div>
        )
     
    }
}
 
const mapStateToProps = (state) => {
    return {
       getData:state.getData
     
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchWordData }, dispatch)
}

const compass = withRouter(Details)
export default connect(mapStateToProps, mapDispatchToProps)(compass)
