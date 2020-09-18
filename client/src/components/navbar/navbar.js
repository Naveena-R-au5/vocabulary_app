import React,{useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import style from './navbar.module.css'
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useAutocomplete from '@material-ui/lab/useAutocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '150%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '100%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  label: {
    display: 'block',
  },
  input: {
    width: 200,
    padding:10,
    borderRadius:15,
    marginRight:10
  },
  listbox: {
    width: 200,
    margin: 0,
    padding: 6,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 200,
    border: '1px solid rgba(0,0,0,.25)',
    '& li[data-focus="true"]': {
      backgroundColor: 'white',
      color: 'white',
      cursor: 'pointer',
    },
    '& li:active': {
      backgroundColor: 'white',
      color: 'white',
    },
  },
  link:{
      padding:10,
      textDecoration:'none',
      color:'black'
  }
}));


export default function SearchAppBar() {
  const classes = useStyles();
  const [w,getWord] = useState('')
  const [d,getWords] = useState([])
  const submit=(query)=>{
    getWord(query)
    // code for seraching word in list
  fetch("/search-word",{
    method:"post",
    headers:{
        "content-Type":"application/json",
    },
    body:JSON.stringify({
       query
    })
}).then(res=>res.json())
.then(data=>{ 
    console.log("d",data)
     getWords(data.data)
}).catch(err=>{
    console.log(err)
})
  }
 
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: d,
    getOptionLabel:(option) => option.wordid,
  });


  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{backgroundColor:'rgb(78, 2, 78)',boxShadow:'none'}}>
        <Toolbar className={style.main}>

          <Typography className={classes.title} variant="h6" noWrap>
            <h3 className={style.text}>Vocabulary</h3>
          </Typography>
          <h3 className={style.links}>vocabulary</h3>
          <h3><Link to="/" className={style.link}>Home</Link></h3>
          <div className={style.search}>

      <div {...getRootProps()} className={style.clas}>
       
        <input className={classes.input && style.in} placeholder="search for word" {...getInputProps()}onChange = {(e)=>submit(e.target.value)}   type='text'  />
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}><Link className={classes.link} to={`/word/${option.wordid}`}>{option.wordid}</Link><br/></li>
          ))}
        </ul>
      ) : null}
          </div>

        </Toolbar>
      </AppBar>
    </div>
  );
}
