import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(10),
    '&:hover': {
      boxShadow: '0 0 2px 2px yellow'
    }
  },

  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 3,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
  googleButton: {
    marginBottom: theme.spacing(2),
  },
}));